"use server";

import prisma from "@/lib/db";
import { cookies } from "next/headers";

export async function updateSelfUser(formData: FormData, email: string | undefined) {
    try {
        if(!email) {
            throw new Error("Email is required");
        }
        const user = await prisma.user.update({
        where: {
            email: email as string,
        },
        data: {
            password: formData.get('password') as string,
            name: formData.get('name') as string,
            hasMarketingAgreement: formData.get("hasMarketingAgreement") === "true" ? true : false as boolean,
        },
    })
    const myuser = {
        id: user.id,
        name: user.name,
        email: user.email,
        hasMarketingAgreement: user.hasMarketingAgreement,
        referenceId: user.referenceId
    }
    const myCookies = await cookies()
    myCookies.set("userData", JSON.stringify(myuser), {
        httpOnly: true, // Prevents client-side JS access
        secure: process.env.NODE_ENV === "production", // Only use secure cookies in production
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day expiration
    }); 
}
    catch (error) {
        console.error(error);
    }

}

export async function getSelfUser(email: string | null) {
    if (email === null) {
        return null;
    }
    try {   const user =  await prisma.user.findFirst({
        where: {
            email: email as string,
        },
        select: {
            name: true,
            email: true,
            hasMarketingAgreement: true,
            referenceId: true,
            userSubscription: {
                where:{
                    isActive: true,
                    subscription: {
                            isActive: true                      
                    }
                },
                select: {
                    isActive: true,
                    createdAt: true,                    
                    subscription: {
                        select:{
                            name: true,
                            period: true,
                            price: true,
                            description: true,
                            isActive: true
                        }
                    }
                }
            }
        },
    })
    const myCookies = await cookies()
    myCookies.set("userData", JSON.stringify(user), {
        httpOnly: true, // Prevents client-side JS access
        secure: process.env.NODE_ENV === "production", // Only use secure cookies in production
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day expiration
    }); 
return user}
    catch (error) {
        console.error(error);
        return null
    }

}

export async function getSelfPayments(email: string | null) {
    if (email === null) {
        return null;
    }
    try {   const payments =  await prisma.user.findFirst({
        where: {
            email: email as string,
        },
        select: {
            payments: {
                select: {
                    amount: true,
                    createdAt: true,
                    currency: true
                }
            }
        },
    })
    return payments
}
catch (error) {
    console.error(error);
    return null
}
}

export async function getSelfSubscription(email: string | null) {
    if (email === null) {
        return null;
    }
    try {   const subscription =  await prisma.user.findFirst({
        where: {
            email: email as string,
        },
        select: {
            userSubscription: {
                select: {
                    createdAt: true,
                    payments: true,
                    isActive: true,
                    subscription: {
                        select: {
                            name: true,
                            isActive: true,
                            description: true,
                            period: true,
                            id: true                           
                        }
                    }
                }
            },
        },
    })
    return subscription
}
catch (error) {
    console.error(error);
    return null
}
}

export async function getAllSubscriptions() {

    try {   const subscriptions =  await prisma.subscription.findMany({
        where: {
            isActive: true,
        },
        select: {
                    name: true,
                    createdAt: true,
                    id: true,
                    description: true,
                    period: true,
                    price: true,
                    isActive: true,               
                }
            
        },
    )
    return subscriptions
}
catch (error) {
    console.error(error);
    return null
}
}


    