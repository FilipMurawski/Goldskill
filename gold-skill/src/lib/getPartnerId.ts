"use server";

import prisma from "@/lib/db";

export default async function getPartnerIdByReference(refId: string | undefined){
    try {
    const partner = await prisma.user.findFirstOrThrow({
        where: {
            referenceId: refId
        },
        select: {
            id: true,
        }
    })
    return partner.id;
}
    catch (err) {
    console.error(err)
}   
}

export async function getPartnerIdById(id: string | undefined) {
    try {
        const partner = await prisma.user.findFirstOrThrow({
            where: {
                id: id
            },
            select: {
                partnerId: true,
            }
        })
        return partner.partnerId as string | undefined;
    }
    catch (err) {
        console.error(err)
    }
}
