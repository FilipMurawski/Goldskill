"use server";

import { signIn } from "@/lib/auth"
import prisma from "@/lib/db";
import getPartnerIdByReference from "@/lib/getPartnerId";
import {sendMail} from "@/lib/send-email";
import { Prisma } from "@prisma/client";
import { hashPassword } from "@/lib/utility/password";
import crypto from "crypto";

export async function createSelfUser(formData: FormData, refId: string | null) {

    try {
        if(await getPartnerIdByReference(refId) !== undefined) {

        const user = await prisma.user.create({
            data: {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            salt: formData.get('salt') as string,
            partnerId: await getPartnerIdByReference(refId) as string,
            emailVerified: null           
        },
        })
        console.log(`${user.name}account created successfully with refId: ${refId}`);
        return user
    }
     else {
        const user = await prisma.user.create({
            data: {
                name: formData.get('name') as string,
                email: formData.get('email') as string,
                password: formData.get('password') as string,
                salt: formData.get('salt') as string,
                emailVerified: null
            },
        })
        console.log(`${user.name} account created successfully without refId`);
        return user
    }
}
    catch (error) {
        if(error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002"){
                throw new Error(`Error creating user, email already exists: ${error}`);
            } else {
                throw new Error(`Error creating user: ${error.message}`);
            }
        }
        else {
            throw new Error(`Error creating user: ${error}`);
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
        throw new Error(`Error creating payment: ${error}`);
    }
}

export async function resetPassword( formData: FormData ) {
    if (!formData.get('email')){
        throw new Error(`Error reseting password --> email is required`);
    }
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: formData.get('email') as string,
        }})

        if (!user?.email) {
            throw new Error(`Error reseting password --> user not found`);
        }
        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest("hex");
        const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 2); // Token expires in 2 hours

        // Save token in database
        await prisma.passwordResetToken.create({
            data: {
                userId: user.id,
                token: hashedToken,
                expiresAt,
            },
        });

        const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}`;

        await sendMail({
            from: "no-reply@goldskill.pl",
            to: user.email,
            type: "reset-password",
            subject: "Resetowanie hasła Goldskill",
            resetLink: resetUrl,
        });
    }

    catch (error) {
        if(error instanceof Prisma.PrismaClientKnownRequestError) {
                    if (error.code === "P2001"){
                        throw new Error(`Error reseting password: ${error.message}`);
                        }
                    else {
                        throw new Error(`Error reseting password: ${error.message}`);
                        }
                }
        else {
            throw new Error(`Error reseting password: ${error}`);
        }
    }    
}

export async function SignIn({provider,redirect, email, password, refId}: {provider: "credentials" | "facebook" | "google", redirect?: boolean, email?: string, password?: string, refId?: string | null}) {
  if (provider ==  "credentials" && password !== undefined) {
    return await signIn(provider, {redirect, email, password})
  } else {
    return refId ? await signIn(provider, { refId: refId}) : await signIn(provider)
  }
}

export async function SignUp({ email, password, refId}: { email: string, password: string, refId: string | null}) {     


        try {
            const existingUser = await prisma.user.findUnique( {
                where: {
                    email: email
                }
            })
            if(existingUser){
                const response = Response.json({error: "Email already exists"}, {status: 400});
                 return response
            }
            const hashedPassword = await hashPassword(password)
            // Prepare the data
            const form = new FormData();
            form.append('name', "");
            form.append('email', email);
            form.append('password', hashedPassword);
            form.append('refId', refId !== null ? refId : "");

            // Create user in database

            const user = await createSelfUser(form, refId);
            if(!user){
                throw new Error("Error creating user");
            }

            // Send email to confirm the email

            const verificationToken = crypto.randomBytes(32).toString("hex");
            const hashedToken = crypto.createHash("sha256").update(verificationToken).digest("hex");
            const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 hours expiration
    
            await prisma.emailVerificationToken.create(
                {
                    data: {
                        userId: user.id,
                        token: hashedToken,
                        expiresAt: expiresAt,
                    },
                }
            )

            const confirmLink = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${verificationToken}`;

            await sendMail({
                from: "no-reply@goldskill.pl",
                to: email,
                type: "confirm-email",
                subject: "Potwierdź swój email z Goldskill",
                confirmationLink: confirmLink
            });
            
        }
        catch (error) {
            throw new Error(`Error during sign-up: ${error}`);
        }
  }
