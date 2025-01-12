"use server";

import prisma from "@/lib/db";
import getPartnerIdByReference from "@/lib/getPartnerId";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";


export async function createSelfUser(formData: FormData, refId: string | undefined) {

    try {
        if(await getPartnerIdByReference(refId) !== undefined) {

        const user = await prisma.user.create({
            data: {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            hashedPassword: formData.get('password') as string,
            partnerId: await getPartnerIdByReference(refId) as string
            
        },
        })
        console.log(`${user.name}account created successfully with refId: ${refId}`);   
    }
     else {
        const user = await prisma.user.create({
            data: {
                name: formData.get('name') as string,
                email: formData.get('email') as string,
                hashedPassword: formData.get('password') as string,
            },
        })
        console.log(`${user.name} account created successfully without refId`); 
    }
}
    catch (error) {
        if(error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002"){
                console.log("Email already exists");
            } else {
                console.error(error.message);
            }
        }
        else {
            console.error(error);
        }
        
    }

}

export async function createSelfPayment(formData: FormData) {
    try {    await prisma.payment.create({
        data: {
            userId: formData.get('userId') as string,
            amount: Number(formData.get('amount')),
            currency: formData.get('currency') as string,
            subscriptionId: formData.get('subscription') as string
        },
    })
}
    catch (error) {
        console.error(error);
    }
}

