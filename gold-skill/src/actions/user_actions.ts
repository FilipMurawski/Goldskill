"use server";

import prisma from "@/lib/db";

export async function updateUser(formData: FormData) {
    try {    await prisma.user.update({
        where: {
            id: formData.get('id') as string,
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