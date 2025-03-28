"use server";

import prisma from "@/lib/db";
import { getPartnerIdById } from "@/lib/getPartnerId";
import { User } from "@prisma/client";

export async function updateUser(formData: FormData) {
    try { const user = await prisma.user.update({
        where: {
            id: formData.get('id') as string,
        },
        data: {
            name: formData.get('name') as string,
            hasMarketingAgreement: formData.get('marketingAgreement') === "true" ? true : false as boolean,
            hasRODOAgreement: formData.get('RODOAgreement') === "true" ? true : false as boolean,
            role: formData.get('role') as 'USER' | 'ACTIVE_USER' | 'ADMIN',
            isActive: formData.get('isActive') === "true" ? true : false as boolean,
            partnerId: (await getPartnerIdById(formData.get('id') as string)) == 'goldskill' ? formData.get('partnerId') as string : (await getPartnerIdById(formData.get('id') as string))
        },
    }) as User
    const sub = await prisma.userSubscription.findFirst({
        where: {
            userId: user.id,
            isActive: true          
        },
        include: {
            subscription: {
                select: {
                    name: true
                }
            }
        }
    })

    if (formData.get('subscriptionName')?.toString() != sub?.subscription.name) {
        const subType = await prisma.subscription.findFirst({
            where: {
                name: formData.get('subscriptionName')?.toString()
            }
        })
        
        if (!subType){
            return
        }
        const newSub = await prisma.userSubscription.create({
            data: {
                userId: user.id,
                subscriptionId: subType.id
            },           
        })
        return newSub

    }

}
    catch (error) {
        throw new Error(`Error updating user: ${error}`);
    }

}

export async function deleteUser(formData: FormData) {
    try {
        await prisma.user.update({
            where: {
                id: formData.get('id') as string,
            },
            data: {
                isActive: false,
                role: 'USER',
                name: "",
                hasRODOAgreement: false,
                hasMarketingAgreement: false,
            },
        });
        return true
    }
    catch (error) {
        throw new Error(`Error deleting user: ${error}`);
    }
    
}

// export async function createUser(formData: FormData) {

//     try {

//     const user = await prisma.user.create({
//         data: {
//             name: formData.get('name') as string,
//             email: formData.get('email') as string,
//             password: formData.get('password') as string,
//             partnerId: formData.get('referenceId') as string,
//             isActive: formData.get('isActive') as any,
//             role: formData.get('role') as 'USER' | 'ACTIVE_USER',
//             subscriptionId: formData.get('subscriptionId') as string,
//             hasRODOAgreement: true,
//             hasMarketingAgreement: formData.get('marketingAgreement') as any,
//         },
//     })
//     sendMail({email: 'GoldSkill goldskill.tradegroup@gmail.com', sendTo: user.email, subject: 'Witamy na Goldskill', text: 'test', html: "blablabla"})}
//     catch (error) {
//         if(error instanceof Prisma.PrismaClientKnownRequestError) {
//                     if (error.code === "P2002"){
//                         console.log("Email already exists");
//                     }
//                     else {
//                         console.error(error.message);
//                     }
//                 }
//         console.error(error);
//     }

// }

export async function getAllUsers() {
    try {
        const users = await prisma.user.findMany({
            include: {
              userSubscription: {
                where: {
                    isActive: true,
                },
                select: {
                    isActive: true,
                  createdAt: true,
                  id: true,
                  subscription: {
                    select:{
                        name: true,
                        period: true,
                        price: true,
                        description: true,
                        isActive: true
                    }
                },
                },
              },
              payments: {
                select: {
                  createdAt: true,
                  amount: true,
                  currency: true,
                },
              },
              partner: {
                select: {
                    email: true
                }
              },
            },
          });
          return users
    }
    catch (error) {
        throw new Error(`Error getting users: ${error}`);
    }
}
