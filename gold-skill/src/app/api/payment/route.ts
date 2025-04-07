import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/db";
import { isFirstVerifiedPayment } from "@/lib/utility/validators/isFirstVerifiedPayment";
import { sendWelcomeEmail } from "@/actions/background_actions";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Extract necessary fields from the callback
        const { sessionId, amount, currency, orderId, sign } = body;
        const params = {
            sessionId: sessionId,
            orderId: orderId,
            amount: amount,
            currency: currency,
            crc: process.env.PRZELEWY24_CRC_KEY
        }

        // Verify the signature from Przelewy24
        const signConcat = JSON.stringify(params);
        const expectedSign = crypto.createHash("sha384").update(signConcat).digest("hex");

        if (sign !== expectedSign) {
            return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
        }

        // Determine the verification URL based on the environment
        const url =
            process.env.NODE_ENV === "development"
                ? "https://sandbox.przelewy24.pl/api/v1/transaction/verify"
                : "https://secure.przelewy24.pl/api/v1/transaction/verify";

        // Prepare the verification request body
        const verificationBody = {
            merchantId: process.env.PRZELEWY24_MERCHANT_ID,
            posId: process.env.PRZELEWY24_POS_ID,
            sessionId: sessionId,
            amount: amount,
            currency: currency,
            orderId: orderId,
            sign: expectedSign,
        };

        // Perform the PUT request to verify the payment
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${Buffer.from(
                    `${process.env.PRZELEWY24_POS_ID}:${process.env.PRZELEWY24_API_KEY}`
                ).toString("base64")}`,
            },
            body: JSON.stringify(verificationBody),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Payment verification failed:", errorData);
            return NextResponse.json({ error: "Payment verification failed", details: errorData }, { status: 400 });
        }

        const verificationResponse = await response.json();
        console.log("Payment verified successfully:", verificationResponse);

        const paymentId = verificationResponse.sessionId.split("-")[1]
        const userId = verificationResponse.sessionId.split("-")[0]

        // Update the payment status in your database
        await prisma.payment.update({
            where: { id: paymentId, userId: userId },
            data: { status: "VERIFIED" },
        });
        if(await isFirstVerifiedPayment(userId, paymentId)) {
            sendWelcomeEmail(userId)
        }
        return NextResponse.json({ message: "Payment verified successfully", data: verificationResponse });
    } catch (error) {
        console.error("Error handling payment status:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}