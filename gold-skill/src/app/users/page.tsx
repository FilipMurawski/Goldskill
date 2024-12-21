import prisma from "@/lib/db"

export default async function UsersPage() {
    const users = await prisma.user.findMany()
    return (
        <div>
            <h1>Users Page</h1>
            <ul>{
                users.map(user =>{
                    return <li key={user.id}>{user.name}</li>
                })
                }
            </ul>
        </div>
    )
}