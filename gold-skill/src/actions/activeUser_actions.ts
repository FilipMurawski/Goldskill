"use server";

import prisma from "@/lib/db";

export async function updateUserSubscription(formData: FormData) {
    try {    await prisma.user.update({
        where: {
            id: formData.get('id') as string,
        },
        data: {
            subscriptionId: formData.get('subscriptionId') as string,
        },
    })}
    catch (error) {
        console.error(error);
    }

}

export async function deleteUserSubscription(formData: FormData) {
    try {    await prisma.user.update({
        where: {
            id: formData.get('id') as string,
        },
        data: {
            subscriptionId: undefined,
        },
    })}
    catch (error) {
        console.error(error);
    }

}

