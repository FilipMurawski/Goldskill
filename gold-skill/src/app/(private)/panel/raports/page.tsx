import { countUsersAtEachDepth, getUserProvisions } from "@/actions/activeUser_actions";
import { auth } from "@/lib/auth"
import { calculateProvisions } from "@/lib/provisions/calculateProvosions";
import { redirect } from "next/navigation"

export default async function UsersPage() {

    const session = await auth()
    if (!session) redirect('/sign-in');
    if (!session.user) redirect('/sign-in');
    if (!session.user.isActive) redirect('/panel')
    const partners = await countUsersAtEachDepth(session.user.id, 3, session.user.role === "ADMIN");
    const users = await getUserProvisions(session.user.id, 3, session.user.role === "ADMIN");
    const provisions = calculateProvisions(users);
    return (
        <div>
            {partners["1"].valueOf() > 0 ? <>
                <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Moi partnerzy</h1>
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Poziom</th>
                        <th className="border p-2">Ilość aktywnych partnerów</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(partners).map(([depth, count]) => (
                        <tr key={depth} className="border">
                            <td className="border p-2 text-center">{depth}</td>
                            <td className="border p-2 text-center">{count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div>
            <h1 className="text-2xl font-bold mb-4">Prowizje</h1>
            <table>
                <thead>
                    <tr>
                        <th>Poziom</th>
                        <th>Zarobki niepotwierdzone</th>
                        <th>Zarobki potwierdzone</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Level 1</td>
                        <td className="text-yellow-500">{provisions.level1.unconfirmed.toFixed(2)} EUR</td>
                        <td className="text-green-500">{provisions.level1.confirmed.toFixed(2)} EUR</td>
                    </tr>
                    <tr>
                        <td>Level 2</td>
                        <td className="text-yellow-500">{provisions.level2.unconfirmed.toFixed(2)} EUR</td>
                        <td className="text-green-500">{provisions.level2.confirmed.toFixed(2)} EUR</td>
                    </tr>
                    <tr>
                        <td>Level 3</td>
                        <td className="text-yellow-500">{provisions.level3.unconfirmed.toFixed(2)} EUR</td>
                        <td className="text-green-500">{provisions.level3.confirmed.toFixed(2)} EUR</td>
                    </tr>
                </tbody>
            </table>
        </div>
            </> : <>
            <div className="p-6 text-center">Nie posiadasz jeszcze partnerów w naszym systemie.</div> 
            </>}
        </div>
    )
}