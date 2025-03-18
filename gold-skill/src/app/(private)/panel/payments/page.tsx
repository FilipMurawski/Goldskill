import { getSelfPayments } from "@/actions/user_actions";
import { Header } from "@/components/header";
import { auth } from "@/lib/auth"
import { getUser } from "@/lib/utility/getUser";
import { redirect } from "next/navigation"

export default async function UsersPage() {

    const session = await auth()
    if (!session) redirect('/sign-in');
    if (!session.user) redirect('/sign-in');

    const user = await getUser();
    if (!user) redirect('/sign-in');

    const payments = await getSelfPayments(user.email)
    return (
        <>
            <Header size="small">Moje płatności</Header>
            <h2>Historia płatności</h2>
            <ul>{
                payments?.payments.map((user, index) =>{
                    return <li key={user.amount}>{index + 1}. Płatność na kwotę {user.amount} {user.currency} opłacona dnia {user.createdAt.toDateString()}</li>
                })
                }
            </ul>
        </>
    )
}