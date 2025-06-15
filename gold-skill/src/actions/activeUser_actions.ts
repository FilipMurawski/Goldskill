"use server";

import prisma from "@/lib/db";
import { User } from "@prisma/client";
import { subDays } from "date-fns";
import { paymentRegistration } from "./background_actions";


export async function deleteUserSubscription(userSubscriptionId: string) {
    try {
        await prisma.userSubscription.update({
            where: { id: userSubscriptionId },
            data: { isActive: false },
        });
        return null;
    } catch (error) {
        const response = Response.json({error: "Error deleting subscription"}, {status: 400});
        return response
    }
}

export async function CreateUserSubscription(userId: string, subscriptionId: string, currency?: string) {
    if (!userId || !subscriptionId) {
        throw new Error("User ID and Subscription ID are required.");
    };
    try {
        const user = await prisma.user.findUnique({where: { id: userId }});
        if (!user) {
            const response = Response.json({error: "User not found."}, {status: 400});
            return response
        }

        const userSubscription = await prisma.userSubscription.findFirst({
            where: { userId },
            include: {
                subscription: true,
            },
        });
        if (userSubscription?.subscriptionId === subscriptionId) {
            const response = Response.json({error: "User already subscribed to this subscription."}, {status: 400});
            return response
        }
        if (userSubscription?.subscriptionId === "999" && userSubscription?.subscription?.isActive) {
            const response = Response.json({error: "Lifetime users can't create subscriptions"}, {status: 400});
            return response
        }
        const wantedSub =  await prisma.subscription.findUnique({
            where: { id: subscriptionId },})
        if (!wantedSub) {
            const response = Response.json({error: "Subscription not found."}, {status: 400});
            return response
        }
        const whichCurrency = currency ? currency : wantedSub.currency
        const price = whichCurrency === "EUR" ? wantedSub.price : wantedSub.price * 4.39; // Example conversion rate
        const payment = await prisma.payment.create({
            data: {
                userId,
                subscriptionId,
                amount: price,
                currency: whichCurrency,
                createdAt: new Date(),
                status: "UNCONFIRMED",
            },
        })
        if (!payment) {
            const response = Response.json({error: "Payment not created."}, {status: 400});
            return response
        }
        if (!user.email) {
            throw new Error("User email not found or does not exist");
        }
        const paymentToken = await paymentRegistration(userId, wantedSub, price, whichCurrency, user.email, payment.id);
        const isDevelopment = true;
        const paymentUrl = !isDevelopment ? `https://secure.przelewy24.pl/trnRequest/${paymentToken}` : `https://sandbox.przelewy24.pl/trnRequest/${paymentToken}`
        const response = Response.redirect(paymentUrl, 302);
        return response
    } catch (error) {
        const response = Response.json({error: error}, {status: 400});
        return response
    }
}


export async function getUserHierarchy(userId: string, depth = 3, isAdmin = false) {
    if (depth === 0 && !isAdmin) return [];

    const users = await prisma.user.findMany({
        where: { partnerId: userId },
        include: {
            children: depth > 1 || isAdmin
                ? { include: { children: depth > 2 || isAdmin ? { include: { children: isAdmin ? {} : undefined } } : undefined } }
                : undefined,
        },
    });

    return users;
}

export async function countUsersAtEachDepth(userId: string | undefined, depth = 3, isAdmin = false, level = 1): Promise<Record<number, number>> {
    if (userId === undefined) return {};
    if (depth === 0 && !isAdmin) return {};

    const users = await prisma.user.findMany({
        where: { partnerId: userId,
        },
        select: { id: true,
            isActive: true,
         },
    }) as User[];

    const userCountAtCurrentLevel = users.filter((user) => user.isActive).length;
    const result: Record<number, number> = { [level]: userCountAtCurrentLevel };

    if ((depth > 1 || isAdmin) && userCountAtCurrentLevel > 0) {
        for (const user of users) {
            const subCounts = await countUsersAtEachDepth(user.id, depth - 1, isAdmin, level + 1);
            for (const [key, value] of Object.entries(subCounts)) {
                result[+key] = (result[+key] || 0) + value;
            }
        }
    }

    return result;
}

export async function getUserProvisions(userId: string | undefined, depth = 3, isAdmin = false, level = 1):Promise<Record<number, 
{id: string, 
    payments: {
        amount: number,
        currency: string,
        createdAt: Date,
        status: "confirmed" | "unconfirmed",
    }[] | null
}[] | null
>> {
    if (userId === undefined) return [];
    if (depth === 0 && !isAdmin) return [];

    const twoWeeksAgo = subDays(new Date(), 14);

    const users = await prisma.user.findMany({
        where: { partnerId: userId },
        select: {
            payments: {
                select: {
                    amount: true,
                    currency: true,
                    createdAt: true,
                },
            },
            id: true
        },
    });

    const result: Record<number, { id: string; payments: { amount: number; currency: string; createdAt: Date; status: "confirmed" | "unconfirmed" }[] | null }[] | null> = {
        [level]: users.map(user => ({
            id: user.id,
            payments: user.payments.map(payment => ({
                ...payment,
                status: payment.createdAt < twoWeeksAgo ? "confirmed" : "unconfirmed", // Check if 14 days have passed
            })),
        })),
    };

if ((depth > 1 || isAdmin) && users) {
    for (const user of users) {
        const subCounts = await getUserProvisions(user.id, depth - 1, isAdmin, level + 1);
        for (const [key, value] of Object.entries(subCounts)) {
            result[+key] = [...(result[+key] || []), ...(value ?? [])];
        }
    }
}
    return result;
}


