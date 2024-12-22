"use server";

import prisma from "@/lib/db";
import getPartnerIdByReference from "@/lib/getPartnerId";


export async function createSelfUser(formData: FormData, refId: string | undefined) {

    try {

    await prisma.user.create({
        data: {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            hashedPassword: formData.get('password') as string,
            partnerId: await getPartnerIdByReference(refId) as string
        },
    })}
    catch (error) {
        console.error(error);
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

