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
 }) => {
    const [isActive, setActive] = useState(false);
    const [userState, setUserState] = useState(user);
        const {
            register,
            handleSubmit,
            reset,
            setValue,
            watch,
        } = useForm<Inputs>({
            mode: "onBlur"
        })
        const onSubmit: SubmitHandler<Inputs> = async (data) => {
            const formdata = new FormData();
            formdata.append("name", data.name);
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

            },
            confirmPassword: {

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
        <form onSubmit={handleSubmit(onSubmit)}>
        <p className="text-lg font-semibold">Nazwa: {isActive ?
        <input type="text" id="name" {...register("name", validations.name)}></input> 
        :
         <span className="font-normal">{userState.name}</span>}</p>
        {!isActive && <p className="text-lg font-semibold"> Email: <span className="font-normal">{userState.email}</span></p>}
        {!isActive && <ReferralLink referenceId={user.referenceId} />}
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