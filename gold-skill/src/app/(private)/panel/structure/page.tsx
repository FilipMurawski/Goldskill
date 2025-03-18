import { getUserHierarchy } from "@/actions/activeUser_actions";
import { Header } from "@/components/header";
import UserTree from "@/components/user-tree";
import { auth } from "@/lib/auth"

import { redirect } from "next/navigation"

export default async function UsersPage() {

    const session = await auth()
    if (!session) redirect('/sign-in');
    if (!session.user) redirect('/sign-in');
    if (!session.user.isActive) redirect('/panel')
    if (session.user.role === "USER") redirect('/panel')
    if (!session.user.id) redirect('/panel')
    const userHierarchy = await getUserHierarchy(session.user.id, session.user.role === "ADMIN" ? Infinity : 3, session.user.role === "ADMIN")
    return (
        <div>
            <Header size="small">Moja struktura</Header>
            <div>{session.user.name}</div>
            <UserTree users={userHierarchy}></UserTree>
        </div>
    )
}