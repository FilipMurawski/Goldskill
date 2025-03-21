"use server";

import prisma from "@/lib/db";
import { hashPassword } from "@/lib/utility/password";
import { Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import crypto from "crypto";

export async function updateSelfUser(formData: FormData, email: string | undefined) {
    try {
        if (!email) {
            throw new Error("Email is required");
        }

        const updateData: any = {
            name: formData.get('name') as string,
            hasMarketingAgreement: formData.get("hasMarketingAgreement") === "true",
        };

        if (formData.get('password')) {
            updateData.password = await hashPassword(formData.get('password') as string);
        }

        const user = await prisma.user.update({
            where: { email },
            data: updateData,
        });

        const myuser = {
            id: user.id,
            name: user.name,
            email: user.email,
            hasMarketingAgreement: user.hasMarketingAgreement,
            referenceId: user.referenceId,
        };

        const myCookies = await cookies();
        myCookies.set("userData", JSON.stringify(myuser), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24, // 1 day expiration
        });

        return { success: true, user: myuser };
    } catch (error) {
        console.error("Error updating user:", error);
        return { success: false, message: "Failed to update user." };
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

export async function changePassword(formData: FormData) {
    const password = formData.get("password") as string;
    const token = formData.get("token") as string;

    if (!password || !token) {
        throw new Error("Invalid request: Missing password or token.");
    }

    try {
        // Hash the received token
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        // Find the password reset token in the database
        const resetToken = await prisma.passwordResetToken.findFirstOrThrow({
            where: { token: hashedToken },
            include: { user: true }, // Get the associated user
        });

        if (!resetToken || !resetToken.user) {
            throw new Error("Invalid or expired token.");
        }

        // Check if token is expired 
        if (new Date(resetToken.expiresAt) < new Date()) {
            throw new Error("Token expired. Request a new password reset.");
        }

        // Hash the new password
        const hashedPassword = await hashPassword(password);

        // Update user's password
        await prisma.user.update({
            where: { id: resetToken.user.id },
            data: { password: hashedPassword },
        });

        // Delete the used reset token
        await prisma.passwordResetToken.delete({
            where: { id: hashedToken },
        });

        return { success: true, message: "Password changed successfully." };
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return { success: false, message: "Database error: " + error.message };
        }
        return { success: false, message: error || "Something went wrong." };
    }
}

export async function verifyEmail(token: string) {
    if (!token) {
        throw new Error("Invalid request: Missing token.");
    }
    try {
        // Hash the received token
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
        console.log(hashedToken);
        
        // Find the email verification token in the database
        const verificationToken = await prisma.emailVerificationToken.findFirstOrThrow({
            where: { 
                token: hashedToken,                
            },
            include: { user: true}, // Get the associated user
        });

        if (!verificationToken || !verificationToken.user) {
            throw new Error("Invalid token.");
        }
        // Check if token is expired
        if (new Date(verificationToken.expiresAt) < new Date()) {
            throw new Error("Token expired. Request a new email verification.");
        }

        // Update user's email verification status
        await prisma.user.update({
            where: { id: verificationToken.user.id },
            data: { emailVerified: new Date(Date.now()) },
        });
        // Delete the used verification token
        await prisma.emailVerificationToken.delete({
            where: { id: verificationToken.id },
        });
        return { success: true, message: "Email verified successfully." };
    } catch (error) {
        return { success: false, message: "Database error: " + error };
    }
}

    