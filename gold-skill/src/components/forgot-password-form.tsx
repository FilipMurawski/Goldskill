'use client'

import { useState } from "react";
import Button from "./button";
import { useForm, SubmitHandler } from "react-hook-form";
import { resetPassword } from "@/actions/guest_actions";

type Inputs = {
    email: string,
}

const Forgot_password_Form = () => {
    const [successMessage, setSuccessMessage] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        mode: "onBlur"
    });

    const onSubmitHandler: SubmitHandler<Inputs> = async (data) => {
        const form = new FormData();
        form.append("email", data.email);
        await resetPassword(form);
        setSuccessMessage("Na podany adres email została wysłana wiadomość. Jeśli podałeś prawidłowy adres email sprawdź swoją skrzynkę odbiorczą oraz folder Spam.");
    };

    const emailValidation = {
        required: "Email jest wymagany",
        pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Proszę podać prawidłowy email"
        }
    };
    
    return (
        <div>
            {successMessage && (
                <p className="text-green-600 text-center mb-4">{successMessage}</p>
            )}
            <form onSubmit={handleSubmit(onSubmitHandler)}>            
                <div className="mx-auto max-w-xs text-center">
                    <input type="email" {...register("email", emailValidation)} placeholder="Email" required autoComplete="email" className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"/>
                    <span className="text-red-600">
                        {errors?.email && errors.email.message}
                    </span>
                    <Button type="submit" width={"100%"}>Wyślij</Button>
                </div>
            </form>
        </div>
    );
}

export { Forgot_password_Form };
