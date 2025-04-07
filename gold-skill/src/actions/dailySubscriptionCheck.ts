import prisma from "@/lib/db";
import { cardPaymentProcess, paymentRegistration } from "./background_actions";
import { sendMail } from "@/lib/send-email";

export async function dailySubscriptionCheck() {
    console.log("Starting daily subscription check...");

    try {
        // Fetch all active subscriptions where `shouldEndAt` is today or overdue
        const subscriptionsToRenew = await prisma.userSubscription.findMany({
            where: {
                isActive: true,
                shouldEndAt: {
                    lte: new Date(), // Check if `shouldEndAt` is today or overdue
                },
            },
            include: {
                User: true, // Include user details
                subscription: true, // Include subscription details
            },
        });

        console.log(`Found ${subscriptionsToRenew.length} subscriptions to renew.`);

        for (const subscription of subscriptionsToRenew) {
            try {
                console.log(`Processing subscription for user: ${subscription.userId}`);

                const payment = await prisma.payment.create({
                    data: {
                        userId: subscription.userId,
                        subscriptionId: subscription.subscriptionId,
                        amount: subscription.subscription.price,
                        status: "UNCONFIRMED",
                        currency: subscription.subscription.currency,
                        createdAt: new Date(),
                    },
                })

                const registrationResponse = await paymentRegistration(payment.userId, subscription.subscription, payment.amount, payment.currency, subscription.User.email, payment.id, true);


                if (!registrationResponse) {
                    console.error(`Payment registration failed for subscription: ${subscription.id}`);
                    continue; // Skip to the next subscription
                }
                const paymentResponse = await cardPaymentProcess(registrationResponse);

                if (paymentResponse.responseCode === 0) {
                    console.log(`Payment successful for subscription: ${subscription.id}`);

                    // Update the subscription's `shouldEndAt` date
                    const newEndDate = new Date();
                    newEndDate.setDate(newEndDate.getDate() + subscription.subscription.period);

                    await prisma.userSubscription.update({
                        where: { id: subscription.id },
                        data: {
                            shouldEndAt: newEndDate,
                        },
                    });

                    console.log(`Updated subscription end date for subscription: ${subscription.id}`);
                } else {
                    console.error(`Payment failed for subscription: ${subscription.id}`);
                    await prisma.userSubscription.update({
                        where: { id: subscription.id },
                        data: { isActive: false },
                    })
                    console.log(`Deactivated subscription: ${subscription.id}`);
                    sendMail({
                        from: "no-reply@goldskill.pl",
                        to: subscription.User.email,
                        subject: "Subscription Deactivated",
                        text: `Your subscription has been deactivated due to payment failure. Please contact support for assistance.`,
                    })
                }
            } catch (error) {
                console.error(`Error processing subscription: ${subscription.id}`, error);
            }
        }

        console.log("Daily subscription check completed.");
    } catch (error) {
        console.error("Error during daily subscription check:", error);
    }
}