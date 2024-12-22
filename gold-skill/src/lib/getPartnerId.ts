"use server";

import prisma from "@/lib/db";

export default async function getPartnerId(refId: string | undefined){
    try {
    const partner = await prisma.user.findFirstOrThrow({
        where: {
            referenceId: refId
        }
    })
    return partner.id;
}
catch (err) {
    console.error(err)
}
}
