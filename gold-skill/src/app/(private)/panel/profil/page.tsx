import { Header } from "@/components/header";
import { Profile } from "@/components/profile";
import { getUser } from "@/lib/utility/getUser";
export default async function UsersPage() {
    const user = await getUser();
    if(!user) return
    return (
        <div className="flex flex-col gap-10">
            <Header size="small">Profil</Header>
            <Profile {...user}></Profile>
        </div>
    )
}