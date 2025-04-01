'use client'

import { useEffect, useState } from "react";
import Button from "./button";
import { useForm, SubmitHandler } from "react-hook-form";
import { changePassword } from "@/actions/user_actions";
import { redirect, useSearchParams } from "next/navigation";

type Inputs = {
    password: string,
    confirmPassword: string,
}
const Reset_Password_Form = () => {
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const searchParams = useSearchParams();
    const resetToken = searchParams.get("token")
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues
    } = useForm<Inputs>({
        mode: "onBlur"
    });

    useEffect(() => {
        if (!resetToken) redirect("/sign-in");
    }, [resetToken]);


    const onSubmitHandler: SubmitHandler<Inputs> = async (data) => {
        if (!resetToken) {
            setErrorMessage("Nie znaleziono tokena resetowania hasła.");
            return;
        }

        const form = new FormData();
        form.append("password", data.password);
        form.append("token", resetToken); // Include token for authentication

        try {
            await changePassword(form);
            setSuccessMessage("Twoje hasło zostało pomyślnie zmienione. Za chwilę zostaniesz przekierowany na stronę logowania");
            setErrorMessage("");
            
            // Redirect to login page after a delay
            setTimeout(() => redirect("/sign-in"), 3000);
        } catch {
            setErrorMessage("Wystąpił błąd podczas resetowania hasła. Spróbuj ponownie.");
        }
    };
    
    const validations = {
        password: {
            required: "Hasło jest wymagane",
            minLength: {
                value: 8,
                message: "Hasło musi mieć przynajmniej 8 znaków"
            },
            pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: "Hasło musi składać się z conajmniej 8 znaków, w tym dużych i małych liter, cyfr i znaków specjalnych ($@!%*?&)."
            }
        },
        confirmPassword: {
            required: "Potwierdzenie hasła jest wymagane",
            validate: (value: string) => value === getValues().password || "Hasła nie pasują do siebie"
        }
    }
    return (
        <div>
            {errorMessage && <p className="text-red-600 text-center mb-4">{errorMessage}</p>}
        {successMessage && (
            <p className="text-green-600 text-center mb-4">{successMessage}</p>
        )}
        <form onSubmit={handleSubmit(onSubmitHandler)}>            
            <div className="mx-auto max-w-xs text-center flex flex-col gap-2">
                <label id="password">Wprowadź nowe hasło</label>
                <input type="password" {...register("password", validations.password) } placeholder="Hasło" required autoComplete="password" className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"/>
                <span className="text-red-600">
                    {errors?.password && errors.password.message}
                </span>
                <label id="confirmPassword">Potwierdź hasło</label>
                <input type="password" {...register("confirmPassword", validations.confirmPassword)} placeholder="Potwierdź hasło" required className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"/>
                <span className="text-red-600">
                    {errors?.confirmPassword && errors.confirmPassword.message}
                </span>

                <Button type="submit" width={"100%"}>Wyślij</Button>
            </div>
        </form>
    </div>
    )
}

export { Reset_Password_Form}