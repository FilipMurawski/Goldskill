"use server";

import { signIn } from "@/lib/auth"
import prisma from "@/lib/db";
import getPartnerIdByReference from "@/lib/getPartnerId";
import {sendMail} from "@/lib/send-email";
import { Prisma } from "@prisma/client";
import { redirect, RedirectType } from "next/navigation";
import { hashPassword } from "@/lib/utility/password";

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
        // sendMail({email: 'GoldSkill goldskill.tradegroup@gmail.com', sendTo: user.email, subject: 'Witamy na Goldskill', text: 'test', html: "blablabla"})   
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
        // sendMail({email: 'GoldSkill goldskill.tradegroup@gmail.com', sendTo: user.email, subject: 'Witamy na Goldskill', text: 'test', html: "blablabla"})
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

export async function resetPassword( formData: FormData ) {

    try {
        await prisma.user.findFirst({
            where: {
                email: formData.get('email') as string,
        }})
    }

    catch (error) {
        if(error instanceof Prisma.PrismaClientKnownRequestError) {
                    if (error.code === "P2001"){
                            console.log("Email does not exists");
                        }
                    else {
                            console.error(error.message);
                        }
                }
        else {
            console.error(error);
        }
    }

    
}

export async function SignIn({provider,redirect, email, password, refId}: {provider: "credentials" | "facebook" | "google", redirect?: boolean, email?: string, password?: string, refId?: string | null}) {
  if (provider ==  "credentials" && password !== undefined) {
    return await signIn(provider, {redirect, email, password})
  } else {
     refId ? await signIn(provider, {callbackUrl: `/panel`, refId: refId}) : await signIn(provider)
  }
}

export async function SignUp({ email, password, refId}: { email: string, password: string, refId: string | null}) {     


        try {
            const user = await prisma.user.findUnique( {
                where: {
                    email: email
                }
            })
            if(user){
                console.log("Email already exists");
                throw new Error("Email already exists");
            }
            const hashedPassword = await hashPassword(password)
            // Prepare the data
            const form = new FormData();
            form.append('name', "");
            form.append('email', email);
            form.append('password', hashedPassword);
            form.append('refId', refId !== null ? refId : "");

            // Create user in database

            await createSelfUser(form, refId);

            // Send email to confirm the email

            // sendMail({email: 'GoldSkill goldskill.tradegroup@gmail.com', sendTo: email, subject: 'Goldskill - potwierdzenie hasła', text: 'Proszę potwierdź swój email', html: "blablabla"})

            // redirect to sign-in page

            return redirect("/sign-in?alert=confirm-email")
        }
        catch (error) {
                console.error("Error during signup", error);
        }
  }
