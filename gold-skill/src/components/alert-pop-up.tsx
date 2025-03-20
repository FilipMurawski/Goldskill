'use client'
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

 

const Alert = () => {
    const searchParams = useSearchParams();
    const [alertMessage, setAlertMessage] = useState("");

    useEffect(() => {
        if (searchParams.get("alert") === "confirm-email" || (searchParams.get("error") === "CredentialsSignin" && searchParams.get("code") === "not_verified_error")) {
            setAlertMessage("Proszę potwierdź swój email przed logowaniem");
        }
    }, [searchParams]);
    return (
        <div className={`bg-yellow-200 text-yellow-800 p-3 mb-4 rounded fixed top-6 m-auto w-full z-50 ${alertMessage === "" ? "hidden" : ""}`}>
            {alertMessage}
        </div>
    )
}

export default Alert;