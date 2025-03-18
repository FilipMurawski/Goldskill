
import { getAllUsers } from "@/actions/admin_actions";
import { Header } from "@/components/header";
import { UsersTable } from "@/components/users-table";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SubscriptionType, UserType } from "../../../../../types/UserType";
import { getAllSubscriptions } from "@/actions/user_actions";

export default async function UsersPage() {
    const session = await auth()
    if (!session) redirect('/sign-in');
    if (!session.user) redirect('/sign-in');
    if (session.user.role !== "ADMIN") redirect('/panel');
    const users:UserType[]|undefined = await getAllUsers();
    const subscriptions:SubscriptionType[]|null = await getAllSubscriptions();
    if (!subscriptions) redirect('/panel');
    return (
        <div className="p-6 flex flex-col gap-6">
          <Header size="small">Lista użytkowników</Header>
            {users && <UsersTable users={users} subscriptions={subscriptions}></UsersTable>}
        </div>
      );
}