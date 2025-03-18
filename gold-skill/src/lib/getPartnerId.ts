"use server";

import prisma from "@/lib/db";

export default async function getPartnerIdByReference(refId: string | null){
    try {
    if (refId === null || refId === ""){
        return null;
    }
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

export async function getPartnerIdById(id: string | null) {
    try {
        if (id === null){
            return null;
        }
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


