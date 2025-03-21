import { getSelfSubscription } from "@/actions/user_actions";
import { Header } from "@/components/header";
import { Subscription } from "@/components/subscription";
import { auth } from "@/lib/auth"
import subscriptions from "@/lib/statics/subscriptions";
import getDaysLeft from "@/lib/utility/getDaysLeft";
import { getUser } from "@/lib/utility/getUser";
import { redirect } from "next/navigation"

export default async function UsersPage() {

    const session = await auth()
    if (!session) redirect('/sign-in');
    if (!session.user) redirect('/sign-in');
    
    const user = await getUser();
    if (!user) redirect('/sign-in');
    const subscription = await getSelfSubscription(user.email)
    const activeSubscription = subscription?.userSubscription.filter((sub)=> sub.isActive && sub.subscription.isActive)
    const activeSubscriptionCreatedAt = (activeSubscription && activeSubscription.length > 0) ? activeSubscription[0].createdAt : undefined
    const activeSubscriptionSubId = (activeSubscription && activeSubscription.length > 0) ? activeSubscription[0].subscription.period : undefined
    const leftdays = getDaysLeft(activeSubscriptionCreatedAt, activeSubscriptionSubId)
    return (
        <div className="flex flex-col gap-5">
            <Header size="small">Subskrybcja</Header>
            <Subscription leftdays={leftdays} subscription={(activeSubscription && activeSubscription.length > 0) ? activeSubscription : undefined} subscriptions={subscriptions}/>
        </div>
    )
}