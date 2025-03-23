import { Header } from "@/components/header";
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function UsersPage() {

    const session = await auth()
    if (!session) redirect('/sign-in');
    if (!session.user) redirect('/sign-in');
    if (session.user.role !== "ADMIN") redirect('/panel');
    return (
        <div>
            <Header size="big"> Praca w toku ...</Header>
        </div>
    )
}