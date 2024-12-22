import { Prisma, PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

const initialSubscriptions: Prisma.SubscriptionCreateInput[] =[
    {
        id: '123',
        name: 'sub1',
        currency: 'PLN',
        price: 130,
        description: 'test description',
        period: 1,
        isActive: true
    },
    {
        id: '321',
        name: 'sub2',
        currency: 'USD',
        price: 50,
        description: 'test description123',
        period: 3,
        isActive: true
    },
    {
        id: '222',
        name: 'sub3',
        currency: 'USD',
        price: 80,
        description: 'test description123123',
        period: 6,
        isActive: false
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

const initialUsers: Prisma.UserCreateInput[] = [
    {
        id: 'admin',
        email: 'admin@example.com',
        name: 'Admin',
        hashedPassword: 'asdasdasdasd',
        hasRODOAgreement: true,
        hasMarketingAgreement: true,
        referenceId: 'main',
        role: 'ADMIN',
        isActive: true,
        subscription: {
            connect: {
                id: '999',
            },
        },       
    },
    {
        id: 'alice',
        email: 'alice@example.com',
        name: 'Alice',
        hashedPassword: 'qwerty',
        hasRODOAgreement: true,
        hasMarketingAgreement: true,
        isActive: true,
        role: 'ACTIVE_USER',
        referenceId: 'ref_alice',
        partner: {
            connect: {
                id: 'admin',
            },
        },
        subscription: {
            connect: {
                id: '999',
            },
        }
    },
    {
        id: 'bob',
        email: 'bob@example.com',
        name: 'Bob',
        hashedPassword: 'blablabla',
        hasRODOAgreement: false,
        hasMarketingAgreement: false,
        isActive: false,
        role: 'USER',
        referenceId: 'ref_bob',
        partner: {
            connect: {
                id: 'admin',
            },
        },
    },
    {
        id: "charlie",
        email: 'charlie@example.com',
        name: 'Charlie',
        hashedPassword: 'cdefghijk',
        hasRODOAgreement: true,
        hasMarketingAgreement: false,
        isActive: true,
        referenceId: 'ref_charlie',
        role: 'ACTIVE_USER',
        partner: {
            connect: {
                id: 'bob',
            },
        },
        subscription: {
            connect: {
                id: '222',
            },
        } 
    },{
        id: 'david',
        email: 'david@example.com',
        name: 'David',
        hashedPassword: 'mnopqrstuvw',
        hasRODOAgreement: true,
        hasMarketingAgreement: true,
        isActive: true,
        referenceId: 'ref_david',
        role: 'ACTIVE_USER',
        partner: {
            connect: {
                id: 'admin',
            },
        },
        subscription: {
            connect: {
                id: '123',
            },
        } 
    }
];

const initialPayments: Prisma.PaymentCreateManyInput[] = [
    {
        id: '12345',
        amount: 130,
        currency: 'PLN',
        userId: 'bob',
        subscriptionId: '123',
    },
    {
        id: '67890',
        amount: 80,
        currency: 'USD',
        userId: 'charlie',
        subscriptionId: '222',
    },
    {
        id: '13579',
        amount: 130,
        currency: 'PLN',
        userId: 'david',
        subscriptionId: '123',
    },
    {
        id: '36901',
        amount: 50,
        currency: 'USD',
        userId: 'charlie',
        subscriptionId: '321',
    }
];

async function main() {
    console.log('Starting seeding ...');
    
    for (const subscription of initialSubscriptions) {
        const newSubscription = await prisma.subscription.create({
            data: subscription,
        })
        console.log(`Created subscription with ID: ${newSubscription.id}`)
    }

    for (const user of initialUsers) {
        const newUser = await prisma.user.create({
            data: user,
        })
        console.log(`Created user with ID: ${newUser.id}`)
    }

    const payments = await prisma.payment.createMany({
            data: initialPayments,
        })
    console.log(`Created:  ${payments.count} payments`)

    console.log('Seeding finished ...');
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })