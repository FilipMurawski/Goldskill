'use client'

import { SignIn, SignUp } from "@/actions/guest_actions";
import Button from "./button";
import { useForm, SubmitHandler } from "react-hook-form";
import { getReferral } from "@/lib/utility/referrals";
import { Social_button } from "./social-button";
import { redirect } from "next/navigation";



type Inputes = {
    email: string,
    password: string,
    confirmPassword?: string,
    hasRODOAgreement?: boolean
}

const Signer = ({type}: {type: "sign-in" | "sign-up"}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        getValues
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
            }).then(()=> redirect("sign-in?alert=confirm-email"))
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
        },
        confirmPassword: {
            required: "Potwierdź hasło jest wymagane",
            validate: (value: string | undefined) => value === getValues().password || "Hasła nie są identyczne"
        },
        hasRODOAgreement: {
            validate: (value: boolean | undefined ) => value === true || "Akceptacja polityki prywatności oraz ryzyzka jest wymagana"
        }
    }

    

    return (
        <>
            <Social_button alt="Logo Google" name="google" path="/google.svg" text={`${type === "sign-in" ? "Zaloguj" : "Zarejestruj"} się z Google`}/>
            <Social_button alt="Logo Facebook" name="facebook" path="/facebook.svg" text={`${type === "sign-in" ? "Zaloguj" : "Zarejestruj"} się z Facebook`}/>

        <div className="mb-8 mt-4 border-b text-center mx-auto max-w-xs">
                        <div
                            className="leading-none px-2 inline-block text-sm text-gray-400 tracking-wide font-medium bg-white transform translate-y-1/2">
                            {type === "sign-in" ? "lub zaloguj się poprzez email" : "lub zarejestruj się poprzez email"}
                        </div>
        </div>
        <form onSubmit={handleSubmit(onSubmitHandler)}>            
            <div className="mx-auto max-w-xs text-center">
                <input type="text" {...register("email", validations.email)} placeholder="Email" required autoComplete="email" className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"/>
                <span className="text-red-600">
                    {errors?.email && errors.email.message}
                </span>
                <input type="password" {...register("password", validations.password)} placeholder="Hasło" required autoComplete="current-password" className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4 mb-3"/>
                <span className="text-red-600">
                    {errors?.password && errors.password.message}
                </span>
                {type === "sign-up" && <>
                                <input type="password" {...register("confirmPassword", validations.confirmPassword)} placeholder="Potwierdź hasło" required autoComplete="current-password" className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2 mb-3"/>
                                <span className="text-red-600">
                                    {errors?.password && errors.password.message}
                                </span>
                                <div className="flex items-center">
                                <input id="hasRODOAgreement" type="checkbox" {...register("hasRODOAgreement", validations.hasRODOAgreement)} className="mr-2 border-black rounded-sm hover:cursor-pointer"/>
                                <label className="text-sm text-gray-600" id="hasRODOAgreement">
                                    Akceptuję   <a href="/polityka-prywatnosci" target="_blank" className="font-medium text-blue-500 hover:text-blue-600"> politykę prywatności</a> oraz jestem świadomy ryzyka inwestycyjnego <a href="/ostrzezenie-o-ryzyku" target="_blank" className="font-medium text-blue-500 hover:text-blue-600"> Ostrzeżenie o ryzyku </a>
                                </label>
                                </div>
                                <span className="text-red-600">
                    {errors?.hasRODOAgreement && errors.hasRODOAgreement.message}
                </span>
                                </>}


                <Button type="submit" width={"100%"}>{type === "sign-in" ? "Zaloguj się" : "Zarejestruj się"}</Button>
            </div>
        </form>
        </>
    )
}

export {Signer}