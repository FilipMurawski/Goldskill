"use client"
import { useEffect, useState } from "react";
import Button from "./button";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateSelfUser } from "@/actions/user_actions";
import { ReferralLink } from "./referral-link";

type Inputs = {
    name: string,
    hasMarketingAgreement: boolean,
    password: string,
    confirmPassword: string
}
const Profile = (user:{
    name: string;
    email: string;
    hasMarketingAgreement: boolean;
    referenceId: string;
    password?: string;
    confirmPassword?: string;
 }) => {
    const [isActive, setActive] = useState(false);
    const [userState, setUserState] = useState(user);
        const {
            register,
            handleSubmit,
            reset,
            setValue,
            watch,
            getValues,
            formState: { errors }
        } = useForm<Inputs>({
            mode: "onBlur"
        })
        const onSubmit: SubmitHandler<Inputs> = async (data) => {
            const formdata = new FormData();
            formdata.append("name", data.name);
            if (data.password && data.password === data.confirmPassword) {
                formdata.append("password", data.password)
            }
            formdata.append("hasMarketingAgreement", data.hasMarketingAgreement.toString());

            await updateSelfUser(formdata, user?.email)

            setUserState({
                name: data.name,
                hasMarketingAgreement: data.hasMarketingAgreement,
                email: user.email,
                referenceId: user.referenceId
            });
            setActive(false);
        };
        ;
        const validations = {
            name: {
                minLength: {
                    value: 3,
                    message: "Nazwa musi mieć minimum 3 znaki"
                },
                maxLength: {
                    value: 40,
                    message: "Nazwa nie może mieć więcej niż 40 znaków"
                }
            },
            
                password: {
                    minLength: {
                        value: 8,
                        message: "Nowe hasło musi mieć przynajmniej 8 znaków"
                    },
                    pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message: "Nowe hasło musi składać się z conajmniej 8 znaków, w tym dużych i małych liter, cyfr i znaków specjalnych ($@!%*?&)."
                    }
                },
                confirmPassword: {
                    validate: (value: string | undefined) => value === getValues().password || "Hasła nie pasują do siebie"
                }
            
            }
        useEffect(() => {
                // Ensure form values update when user data changes
                reset({
                    name: user.name,
                    hasMarketingAgreement: user.hasMarketingAgreement
                });
            }, [user]);

    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <p className="text-lg font-semibold">Nazwa: {isActive ?<>
            <input type="text" id="name" {...register("name", validations.name)} className="block px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2"></input>
        </>
         
        :
         <span className="font-normal">{userState.name}</span>}</p>
        {!isActive && <p className="text-lg font-semibold"> Email: <span className="font-normal">{userState.email}</span></p>}
        {!isActive && <ReferralLink referenceId={user.referenceId} />}
        {isActive && <>
            <label id="password" className="text-lg font-semibold">Wprowadź nowe hasło</label>
                <input type="password" {...register("password", validations.password) } placeholder="Hasło" required autoComplete="password" className="w-60 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"/>
                <span className="text-red-600">
                    {errors?.password && errors.password.message}
                </span>
                <label id="confirmPassword" className="text-lg font-semibold">Potwierdź hasło</label>
                <input type="password" {...register("confirmPassword", validations.confirmPassword)} placeholder="Potwierdź hasło" required className="w-60 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"/>
                <span className="text-red-600">
                    {errors?.confirmPassword && errors.confirmPassword.message}
                </span>
        </>}
        <p className="text-lg font-semibold">
                Zgoda marketingowa: 
                {isActive ? 
                <input type="checkbox" {...register("hasMarketingAgreement")} checked={watch("hasMarketingAgreement")} onChange={(e) => setValue("hasMarketingAgreement", e.target.checked)}></input>
                : 
            <span className={`font-normal ml-2 ${userState.hasMarketingAgreement ? 'text-green-600' : 'text-red-600'}`}>
            {userState.hasMarketingAgreement ? "Tak" : "Nie"}
            </span>}
        </p>


        {isActive ?
         <>
         <Button type="submit" width={"100px"}>Zapisz</Button>
         <Button type="button" width={"100px"} onClick={ () => setActive(false)}>Anuluj</Button>
         </> :
          <Button type="button" width={"100px"} onClick={ () => setActive(true)}>Edytuj</Button>}
        </form>
        </>      
    )
}

export {Profile}