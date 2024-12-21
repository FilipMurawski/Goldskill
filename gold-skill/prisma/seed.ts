import { Prisma, PrismaClient, User } from '@prisma/client'
const prisma = new PrismaClient()

const initialSubscriptions: Prisma.SubscriptionCreateInput[] =[
    {
        id: '123',
        name: 'sub1',
        currency: 'PLN',
        price: 130,
        description: 'test description',
        period: 5,
        isActive: true
    },
    {
        id: '321',
        name: 'sub2',
        currency: 'USD',
        price: 50,
        description: 'test description123',
        period: 10,
        isActive: true
    },
    {
        id: '222',
        name: 'sub3',
        currency: 'USD',
        price: 500,
        description: 'test description123123',
        period: 50,
        isActive: false
    },
]
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
        children: {
            connect: [{
                id: 'bob',
            },{
                id: 'david'
            }],
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
        referenceId: 'ref_1',
        partner: {
            connect: {
                id: 'admin',
            },
        },
        children: {
            connect: {
                id: 'charlie',
            }
        }
    },
    {
        id: "charlie",
        email: 'charlie@example.com',
        name: 'Charlie',
        hashedPassword: 'cdefghijk',
        hasRODOAgreement: true,
        hasMarketingAgreement: false,
        isActive: true,
        referenceId: 'ref_2',
        role: 'ACTIVE_USER',
        partner: {
            connect: {
                id: 'bob',
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
        referenceId: 'ref_3',
        role: 'ACTIVE_USER',
        partner: {
            connect: {
                id: 'admin',
            },
        }
    }
]

async function main() {

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