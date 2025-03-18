export function calculateProvisions(
    users: Record<
        number,
        {
            id: string;
            payments: {
                amount: number;
                currency: string;
                createdAt: Date;
                status: "confirmed" | "unconfirmed"; // Track payment status
            }[] | null;
        }[] | null
    >,
    depth = 3
) {
    let provisions = {
        level1: { confirmed: 0, unconfirmed: 0 },
        level2: { confirmed: 0, unconfirmed: 0 },
        level3: { confirmed: 0, unconfirmed: 0 },
    };

    if (!users) return provisions;

    for (const [level, userList] of Object.entries(users)) {
        const levelDepth = parseInt(level);

        userList?.forEach(user => {
            user.payments?.forEach(payment => {
                const isFirstPayment = user?.payments?.length === 1;
                const commission = isFirstPayment ? 0.5 : 0.2;

                if (levelDepth === 1) {
                    if (payment.status === "confirmed") {
                        provisions.level1.confirmed += payment.amount * commission;
                    } else {
                        provisions.level1.unconfirmed += payment.amount * commission;
                    }
                } else if (levelDepth === 2) {
                    if (payment.status === "confirmed") {
                        provisions.level2.confirmed += payment.amount * 0.1;
                    } else {
                        provisions.level2.unconfirmed += payment.amount * 0.1;
                    }
                } else if (levelDepth === 3) {
                    if (payment.status === "confirmed") {
                        provisions.level3.confirmed += payment.amount * 0.05;
                    } else {
                        provisions.level3.unconfirmed += payment.amount * 0.05;
                    }
                }
            });
        });
    }

    return provisions;
}
