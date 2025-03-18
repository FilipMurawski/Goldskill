'use client'

import { SignIn, SignUp } from "@/actions/guest_actions";
import Button from "./button";
import { useForm, SubmitHandler } from "react-hook-form";
import { getReferral } from "@/lib/utility/referrals";


type Inputes = {
    email: string,
    password: string
}

const Signer = ({type}: {type: "sign-in" | "sign-up"}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<Inputes>({
        mode: "onBlur"
    })
    const onSubmitHandler: SubmitHandler<Inputes> = (data) => {
        if (type === "sign-in") {
            SignIn({provider: "credentials",
                redirect: false,
                email: data.email,
                password: data.password
        })} else if (type === "sign-up") {
            SignUp({
                email: data.email,
                password: data.password,
                refId: getReferral() as string | null
            })
        }
    };
    
    const validations = type === "sign-in" ? {
        email: {
            required: "Email jest wymagany",
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Proszę podać prawidłowy email"
            }
        },
        password: {
            required: "Hasło jest wymagane",
            minLength: {
                value: 8,
                message: "Hasło musi mieć przynajmniej 8 znaków"
            }
        }
    } : {
        email: {
            required: "Email jest wymagany",
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Proszę podać prawidłowy email"
            }
        },
        password: {
            required: "Hasło jest wymagane",
            pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                message: "Hasło musi zawierać co najmniej 1 małą literę, 1 wielką literę, 1 cyfrę, 1 znak specjalny i mieć minimum 8 znaków"
            }
        }
    }

    

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)}>            
            <div className="mx-auto max-w-xs text-center">
                <input type="text" {...register("email", validations.email)} placeholder="Email" required autoComplete="email" className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"/>
                <span className="text-red-600">
                    {errors?.email && errors.email.message}
                </span>
                <input type="password" {...register("password", validations.password)} placeholder="Hasło" required autoComplete="current-password" className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 mb-3"/>
                <span className="text-red-600">
                    {errors?.password && errors.password.message}
                </span>
                <Button type="submit" width={"100%"}>{type === "sign-in" ? "Zaloguj się" : "Zarejestruj się"}</Button>
            </div>
        </form>
    )
}

export {Signer}