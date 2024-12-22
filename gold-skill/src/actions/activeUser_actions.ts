"use server";

import prisma from "@/lib/db";

export async function updateSelfUserSubscription(formData: FormData, userId: string) {
    try {    await prisma.user.update({
        where: {
            id: userId as string,
        },
        data: {
            subscriptionId: formData.get('subscriptionId') as string,
        },
    })}
    catch (error) {
        console.error(error);
    }

}

export async function deleteSelfUserSubscription(userId: string) {
    try {    await prisma.user.update({
        where: {
            id: userId as string,
        },
        data: {
            subscriptionId: undefined,
        },
    })}
    catch (error) {
        console.error(error);
    }

}

