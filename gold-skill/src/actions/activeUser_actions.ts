"use server";

import prisma from "@/lib/db";
import { subDays } from "date-fns";

export async function updateSelfUserSubscription(formData: FormData, userId: string) {
    try {    await prisma.userSubscription.create({
        data: {
            userId: userId as string,
            subscriptionId: formData.get('subscriptionId') as string,
        }
    })}
    catch (error) {
        console.error(error);
    }

}

export async function deleteSelfUserSubscription(userId: string, userSubscriptionId: string) {
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
    });

    const userCountAtCurrentLevel = users.filter((user) => user.isActive).length;
    let result: Record<number, number> = { [level]: userCountAtCurrentLevel };

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

    let result: Record<number, { id: string; payments: { amount: number; currency: string; createdAt: Date; status: "confirmed" | "unconfirmed" }[] | null }[] | null> = {
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
