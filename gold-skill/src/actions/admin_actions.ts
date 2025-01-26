"use server";

import prisma from "@/lib/db";
import { getPartnerIdById } from "@/lib/getPartnerId";
import sendMail from "@/lib/send-email";
import { Prisma } from "@prisma/client";

export async function updateUser(formData: FormData) {
    try {    await prisma.user.update({
        where: {
            id: formData.get('id') as string,
        },
        data: {
            hashedPassword: formData.get('hashedPassword') as string,
            name: formData.get('name') as string,
            hasMarketingAgreement: formData.get('marketingAgreement') as any,
            hasRODOAgreement: formData.get('RODOAgreement') as any,
            role: formData.get('role') as 'USER' | 'ACTIVE_USER',
            isActive: formData.get('isActive') as any,
            subscriptionId: formData.get('subscriptionId') as string,
            partnerId: (await getPartnerIdById(formData.get('id') as string)) == 'admin' ? formData.get('partnerId') as string : (await getPartnerIdById(formData.get('id') as string))
        },
    })}
    catch (error) {
        console.error(error);
    }

}

export async function deleteUser(formData: FormData) {
    try {
        await prisma.user.update({
            where: {
                id: formData.get('id') as string,
            },
            data: {
                isActive: false,
                subscriptionId: undefined,
                role: 'USER',
                name: null,
                hasRODOAgreement: false,
                hasMarketingAgreement: false
            },
        });
    }
    catch (error) {
        console.error(error);
    }
    
}

export async function createUser(formData: FormData) {

    try {

    const user = await prisma.user.create({
        data: {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            hashedPassword: formData.get('password') as string,
            partnerId: formData.get('referenceId') as string,
            isActive: formData.get('isActive') as any,
            role: formData.get('role') as 'USER' | 'ACTIVE_USER',
            subscriptionId: formData.get('subscriptionId') as string,
            hasRODOAgreement: true,
            hasMarketingAgreement: formData.get('marketingAgreement') as any,
        },
    })
    sendMail({email: 'GoldSkill goldskill.tradegroup@gmail.com', sendTo: user.email, subject: 'Witamy na Goldskill', text: 'test', html: "blablabla"})}
    catch (error) {
        if(error instanceof Prisma.PrismaClientKnownRequestError) {
                    if (error.code === "P2002"){
                        console.log("Email already exists");
                    }
                    else {
                        console.error(error.message);
                    }
                }
        console.error(error);
    }

}
