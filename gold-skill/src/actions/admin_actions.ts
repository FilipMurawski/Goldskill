"use server";

import prisma from "@/lib/db";
import { getPartnerIdById } from "@/lib/getPartnerId";

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

    await prisma.user.create({
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
    })}
    catch (error) {
        console.error(error);
    }

}
