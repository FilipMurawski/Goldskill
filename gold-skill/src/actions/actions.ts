"use server";

import prisma from "@/lib/db";

export async function createUser(formData: FormData) {
    await prisma.user.create({
        data: {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            hashedPassword: formData.get('password') as string,            
        },
    })
}