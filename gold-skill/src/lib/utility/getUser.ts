import { cookies } from "next/headers";

export async function getUser(){
    const cookieStore = await cookies();
    const userData = cookieStore.get("userData");
    const user:(null | {name: string, email: string, hasMarketingAgreement: boolean, referenceId: string}) = userData ? JSON.parse(userData.value) : null;
    return user
}