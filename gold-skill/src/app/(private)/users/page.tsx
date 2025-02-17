import { auth } from "@/lib/auth"
import prisma from "@/lib/db"
import { redirect } from "next/navigation"

export default async function UsersPage() {

    const session = await auth()
    if (!session) redirect('/sign-in');
    const users = await prisma.user.findMany()
    return (
        <div>
            <h1>Users Page</h1>
            <p>Welcome, {session?.user?.name}!</p>
            <ul>{
                users.map(user =>{
                    return <li key={user.id}>{user.name} and your role is {user.role}</li>
                })
                }
            </ul>
        </div>
    )
}