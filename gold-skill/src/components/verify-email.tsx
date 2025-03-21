'use client'
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { verifyEmail } from "@/actions/user_actions";
import { Header } from "./header";
const Verify_Email = ()=> {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [message, setMessage] = useState("Verifying email...");
    useEffect(() => {
        if (!token) {
            setMessage("Invalid verification link.");
            return;
        }
        console.log(token);
        
        const req = verifyEmail(token)
        req.then(() => {
            setMessage("Email verified successfully! You can now log in.");
        }).catch(() => {
            setMessage("Failed to verify email.");
        });

    }, [token]);
    return (
        <>
        <Header size="small">{message}</Header>
        </>
    )
}

export { Verify_Email}