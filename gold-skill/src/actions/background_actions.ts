import prisma from "@/lib/db";
import { sendMail } from "@/lib/send-email";
import { Subscription } from "@prisma/client";
import crypto from "crypto";

export async function paymentRegistration(userId: string, wantedSub: Subscription, price: number, currency: string, userEmail: string,paymentId: string, recurring?: boolean) {
    
    // Check if all required environment variables are set
    if (!process.env.PRZELEWY24_POS_ID || !process.env.PRZELEWY24_API_KEY || !process.env.PRZELEWY24_MERCHANT_ID || !process.env.PRZELEWY24_CRC_KEY || !process.env.NEXT_PUBLIC_BASE_URL) {
        throw new Error("Missing Przelewy24 credentials in environment variables.");
    }
    if (!userId || !wantedSub || !price || !currency || !userEmail || !paymentId) {
        throw new Error("Missing required parameters for payment processing.");
    } 
    // Replace with your actual environment variable check in production
    const isDevelopment = true;
    // const isDevelopment = process.env.NODE_ENV === "development"; // Check environment

    const url = isDevelopment
        ? "https://sandbox.przelewy24.pl/api/v1/transaction/register"
        : "https://secure.przelewy24.pl/api/v1/transaction/register";
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Basic ${Buffer.from(`${process.env.PRZELEWY24_POS_ID}:${process.env.PRZELEWY24_API_KEY}`).toString("base64")}`, // Replace with your actual authorization header
    };

    const params = {
        sessionId: `${userId}-${paymentId}-${Date.now()}`,
        merchantId: process.env.PRZELEWY24_MERCHANT_ID,
        amount: Math.round(price * 100),
        currency: currency,
        crc: process.env.PRZELEWY24_CRC_KEY,
    }
    
    const combinedSign = JSON.stringify(params)
    const sign = crypto.createHash("sha384").update(combinedSign).digest("hex")


    const body = {
        merchantId: process.env.PRZELEWY24_MERCHANT_ID,
        posId: process.env.PRZELEWY24_POS_ID,
        sessionId: `${userId}-${paymentId}-${Date.now()}`,
        amount: Math.round(price * 100),
        currency: currency,
        description: `Płatność za ${wantedSub.name}`,
        email: userEmail,
        country: "PL",
        language: "pl", 
        urlReturn: `${process.env.NEXT_PUBLIC_BASE_URL}/panel/payments`,
        urlStatus: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment`,
        sign: sign,
        methodRefId: recurring ? await getCardRefId(userId, wantedSub) : undefined
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorData:{error: string, code: number} = await response.json();
            console.error("Payment processing failed:", errorData.error);
            if (errorData.code === 400) {
                throw new Error("Bad request. Please check your input.");
            }
            if (errorData.code === 401) {
                throw new Error("Unauthorized. Please check your credentials.");
            }
        }

        const responseData:{data: {token: string}, responseCode: number} = await response.json();
        console.log("Payment processed successfully:", responseData);
        return responseData.data.token;
    } catch (error) {
        console.error("Error during payment processing:", error);
        throw new Error("Payment processing failed.");
    }
};


async function getCardRefId(userId: string, wantedSub: Subscription) {

    // Check if all required environment variables are set
    if (!process.env.PRZELEWY24_POS_ID || !process.env.PRZELEWY24_API_KEY || !process.env.PRZELEWY24_MERCHANT_ID || !process.env.PRZELEWY24_CRC_KEY || !process.env.NEXT_PUBLIC_BASE_URL) {
        throw new Error("Missing Przelewy24 credentials in environment variables.");
    }
    if (!userId || !wantedSub) {
        throw new Error("Missing required parameters for payment processing.");
    }

    const orderId = getOrderId(userId, wantedSub);
    // Replace with your actual environment variable check in production
    const isDevelopment = true;
    // const isDevelopment = process.env.NODE_ENV === "development"; // Check environment

    const url = isDevelopment
        ? `https://sandbox.przelewy24.pl/api/v1/card/info/${orderId}`
        : `https://secure.przelewy24.pl/api/v1/card/info/${orderId}`;
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Basic ${Buffer.from(`${process.env.PRZELEWY24_POS_ID}:${process.env.PRZELEWY24_API_KEY}`).toString("base64")}`, // Replace with your actual authorization header
    };

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        });

        if (!response.ok) {
            const errorData:{error: string, code: number} = await response.json();
            console.error("Payment processing failed:", errorData.error);
            if (errorData.code === 400) {
                throw new Error("Bad request. Please check your input.");
            }
            if (errorData.code === 403) {
                throw new Error("Incorrect authentication");
            }
            if (errorData.code === 404) {
                throw new Error("Card reference not found. Please check your input.");
            }
        }

        const responseData:{data: {
            refId: string,
            bin: number,
            mask: string,
            cardType: string,
            cardDate: string,
            hash: string,
        }, responseCode: number} = await response.json();
        console.log("Received card reference correctly", responseData);
        return responseData.data.refId;
    } catch (error) {
        console.error("Error during receiving card reference:", error);
        throw new Error("Receiving card reference failed.");
    }



}

async function getOrderId(userId: string, wantedSub: Subscription) {
    
    if (!userId || !wantedSub) {
        throw new Error("Missing required parameters for order ID generation.");
    }

    const paymentForActiveSubscription = await prisma.payment.findFirst({
        where: {
            userId: userId,
            subscriptionId: wantedSub.id,
            orderId: {
                not: null,
            }
        },
        orderBy: {
            createdAt: "desc",
        },
        select:{
            orderId: true,
        },
    })

    if (!paymentForActiveSubscription) {
        throw new Error("Order ID not found for the given user and subscription.");
    }

    return paymentForActiveSubscription.orderId;
}

export async function cardPaymentProcess(token: string) {
    if (!process.env.PRZELEWY24_POS_ID || !process.env.PRZELEWY24_API_KEY || !process.env.PRZELEWY24_MERCHANT_ID || !process.env.PRZELEWY24_CRC_KEY || !process.env.NEXT_PUBLIC_BASE_URL) {
        throw new Error("Missing Przelewy24 credentials in environment variables.");
    }
    if (!token) {
        throw new Error("Missing required parameters for payment processing.");
    }
    const isDevelopment = true;
    // const isDevelopment = process.env.NODE_ENV === "development"; // Check environment

    const url = isDevelopment
        ? `https://sandbox.przelewy24.pl/api/v1/card/charge`
        : `https://secure.przelewy24.pl/api/v1/card/info/charge`;
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Basic ${Buffer.from(`${process.env.PRZELEWY24_POS_ID}:${process.env.PRZELEWY24_API_KEY}`).toString("base64")}`, // Replace with your actual authorization header
    };
    const body = {
        token: token
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorData:{error: string, code: number} = await response.json();
            console.error("Payment processing failed:", errorData.error);
            if (errorData.code === 400) {
                throw new Error("Bad request. Please check your input.");
            }
            if (errorData.code === 401) {
                throw new Error("Unauthorized. Please check your credentials.");
            }
        }

        const responseData:{data: {orderId: string}, responseCode: number} = await response.json();
        console.log("Payment processed successfully:", responseData);
        return responseData;
    } catch (error) {
        console.error("Error during payment processing:", error);
        throw new Error("Payment processing failed.");
    }
}

export async function sendWelcomeEmail(userId: string) {
    if (!userId) {
        throw new Error("User ID is required.");
    }
    try {
        const user = await prisma.user.findUnique({where: { id: userId }});
        if (!user) {
            const response = Response.json({error: "User not found."}, {status: 400});
            return response
        }

        if (!user.email) {
            throw new Error("User email not found or does not exist");
        }
        
        sendMail({
            from: "no-reply@goldskill.pl",
            to: user.email,
            subject: "Witamy w GoldSkill!",
            type: "welcome",
    })

        console.log(`Sending welcome email to ${user.email}`);
        return null;
    } catch (error) {
        const response = Response.json({error: "Error sending welcome email"}, {status: 400});
        return response
    }
}
