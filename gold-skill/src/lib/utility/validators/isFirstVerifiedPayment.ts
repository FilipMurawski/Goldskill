import prisma from "@/lib/db";

export async function isFirstVerifiedPayment(userId: string | undefined, paymentId: string | undefined): Promise<boolean> {
    if (userId === undefined || paymentId === undefined ) return false;

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            payments: {
                where: {
                    status: "VERIFIED"
                },
                select: {
                    id: true,
                    createdAt: true,
                },
                orderBy: {
                    createdAt: "asc",
                },
                take: 1
            }
            },
        },
    );

    if (!user || !user.payments) return false;

    // Check if the user has any payments
    return user.payments[0].id === paymentId;
}