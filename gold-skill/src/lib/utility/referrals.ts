"use server"
import { cookies } from "next/headers";


const getReferral = async () => {
    if(typeof window !== "undefined" ) {
    const refId = (await cookies()).get("referralId")?.value;
    return refId;  // returns null if referralId not found in cookies
    }
}

export {getReferral};

