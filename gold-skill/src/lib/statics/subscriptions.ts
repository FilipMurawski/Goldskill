
import prisma from "../db";

const subscriptions = await prisma.subscription.findMany({
  select: {
    name: true,
    description: true,
    price: true,
    isActive: true,
    period: true,
    id: true
  }
})


export default subscriptions;