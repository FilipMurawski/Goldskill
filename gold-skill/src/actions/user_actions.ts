"use server";

import prisma from "@/lib/db";

export async function updateSelfUser(formData: FormData, userId: string) {
    try {    await prisma.user.update({
        where: {
            id: userId as string,
        },
        data: {
            hashedPassword: formData.get('hashedPassword') as string,
            name: formData.get('name') as string,
            //marketing agreement
        },
    })}
    catch (error) {
        console.error(error);
    }

}