import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// type Role = "ADMIN" | "USER" | "ACTIVE_USER"


const initialSubscriptions: Prisma.SubscriptionCreateInput[] = [
    {
        id: '123',
        name: 'Pakiet miesięczny',
        currency: 'EUR',
        price: 99,
        description: '🎯 Gotowe analizy i „gotowce” do działania,📚 Spójna i praktyczna edukacja,👑 Udział w ekskluzywnej Strefie VIP',
        period: 30,
        isActive: true
    },
    {
        id: '321',
        name: 'Pakiet półroczny',
        currency: 'EUR',
        price: 499,
        description: '🔥 Zbuduj solidne fundamenty tradingu,🛠 Wsparcie edukatorów i strategii,⚡ Dostęp do najlepszych „gotowców”',
        period: 180,
        isActive: true
    },
    {
        id: '222',
        name: 'Pakiet roczny',
        currency: 'EUR',
        price: 998,
        description: '💰 Pełna transformacja w skutecznego tradera,📊 Kompleksowa wiedza i praktyka,🚀 Elitarne środowisko i unikalne okazje',
        period: 360,
        isActive: true
    },
    {
        id: '999',
        name: 'lifetime',
        currency: 'EUR',
        price: 0,
        description: 'lifetime subscription',
        period: 0,
        isActive: true
    }
];

// const initialUsers = [
//     {
//         id: 'alice',
//         email: 'alice@example.com',
//         name: 'Alice',
//         password: 'qwerty',
//         hasRODOAgreement: true,
//         hasMarketingAgreement: true,
//         isActive: true,
//         role: 'ACTIVE_USER' as Role,
//         referenceId: 'ref_alice',
//         partnerId: 'admin'
//     },
//     {
//         id: 'bob',
//         email: 'bob@example.com',
//         name: 'Bob',
//         password: 'blablabla',
//         hasRODOAgreement: false,
//         hasMarketingAgreement: false,
//         isActive: false,
//         role: 'USER' as Role,
//         referenceId: 'ref_bob',
//         partnerId: 'admin'
//     },
//     {
//         id: "charlie",
//         email: 'charlie@example.com',
//         name: 'Charlie',
//         password: 'cdefghijk',
//         hasRODOAgreement: true,
//         hasMarketingAgreement: false,
//         isActive: true,
//         referenceId: 'ref_charlie',
//         role: 'ACTIVE_USER' as Role,
//         partnerId: 'bob'
//     },
//     {
//         id: 'david',
//         email: 'david@example.com',
//         name: 'David',
//         password: 'mnopqrstuvw',
//         hasRODOAgreement: true,
//         hasMarketingAgreement: true,
//         isActive: true,
//         referenceId: 'ref_david',
//         role: 'ACTIVE_USER' as Role,
//         partnerId: 'admin'
//     }
// ];

async function main() {
    console.log('Starting seeding ...');
    if (process.env.NODE_ENV === 'production') {
        for (const subscription of initialSubscriptions) {
            await prisma.subscription.upsert({
                where: { id: subscription.id },
                update: {},
                create: subscription
            });
        }
        console.log('Inserted subscriptions ✅');
        await prisma.user.upsert({
            where: { id: 'admin' },
            update: {},
            create: {
                id: 'admin',
                email: 'GoldSkill.TradeGroup@gmail.com',
                name: 'Goldskill',
                password: '',
                hasRODOAgreement: true,
                hasMarketingAgreement: true,
                referenceId: 'main',
                role: 'ADMIN',
                isActive: true,
                partnerId: null
            }
        })
        console.log('Inserted admin ✅');

        console.log('Seeding finished ...');
        return;
    } else {
    // Insert subscriptions
    for (const subscription of initialSubscriptions) {
        await prisma.subscription.upsert({
            where: { id: subscription.id },
            update: {},
            create: subscription
        });
    }
    console.log('Inserted subscriptions ✅');
    await prisma.user.upsert({
        where: { id: 'admin' },
        update: {},
        create: {
            id: 'admin',
            email: 'GoldSkill.TradeGroup@gmail.com',
            name: 'Goldskill',
            password: '',
            hasRODOAgreement: true,
            hasMarketingAgreement: true,
            referenceId: 'main',
            role: 'ADMIN',
            isActive: true,
            partnerId: null
        }
    })

    console.log('Inserted admin ✅');

    // // Insert users
    // for (const user of initialUsers) {
    //     await prisma.user.upsert({
    //         where: { id: user.id },
    //         update: {},
    //         create: user
    //     });
    // }

    console.log('Inserted users ✅');

    // // Insert user subscriptions
    // const userSubscriptions = [
    //     { userId: 'admin', subscriptionId: '999' },
    //     { userId: 'alice', subscriptionId: '999' },
    //     { userId: 'charlie', subscriptionId: '222' },
    //     { userId: 'david', subscriptionId: '123' }
    // ];

    // for (const us of userSubscriptions) {
    //     await prisma.userSubscription.create({
    //         data: us
    //     });
    // }

    // console.log('Inserted user subscriptions ✅');

    // // Insert payments (after subscriptions exist)
    // const initialPayments = [
    //     {
    //         id: '12345',
    //         amount: 130,
    //         currency: 'PLN',
    //         userId: 'bob',
    //         subscriptionId: '123' // Ensure subscription exists
    //     },
    //     {
    //         id: '67890',
    //         amount: 80,
    //         currency: 'USD',
    //         userId: 'charlie',
    //         subscriptionId: '222'
    //     },
    //     {
    //         id: '13579',
    //         amount: 130,
    //         currency: 'PLN',
    //         userId: 'david',
    //         subscriptionId: '123'
    //     },
    //     {
    //         id: '36901',
    //         amount: 50,
    //         currency: 'USD',
    //         userId: 'charlie',
    //         subscriptionId: '321'
    //     }
    // ];

    // for (const payment of initialPayments) {
    //     await prisma.payment.create({
    //         data: payment
    //     });
    // }

    // console.log('Inserted payments ✅');

    console.log('Seeding finished ...');
}
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
