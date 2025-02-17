"use client"

import { sendContactForm } from "@/actions/guest_actions";
import resetForm from "@/lib/utils/resetForm";
import { redirect } from "next/navigation";
import { useState } from "react"
import Button from "./button";

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    return (
        <div className="mt-12 w-[50%]">
            <form className="flex items-start justify-center flex-col gap-8" onSubmit={async () => {
        console.log(name, email, message)
        const data = new FormData();
        data.append("name", name);
        data.append("email", email);
        data.append("message", message);
        await sendContactForm(data);
        // Reset the form inputs
        await resetForm({fields:[setEmail, setName, setMessage]})
    }}>
                <div className="sm:col-span-2 text-center min-w-[50%]">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 ">Imię</label>
                    <div className="mt-2">
                        <input name="name" value={name} onChange={e => setName(e.target.value)} type="text" id="name" autoComplete={"organization"} required className="border border-gray-300 block w-full rounded-md py-3 px-4 shadow-sm focus:border-sky-500 focus:ring-sky-500" />
                    </div>
                </div>
                <div className="sm:col-span-2 min-w-[50%]">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 ">Email</label>
                    <div className="mt-2">
                        <input name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required type="email" autoComplete="email" className="border border-gray-300 block w-full rounded-md py-3 px-4 shadow-sm focus:border-sky-500 focus:ring-sky-500 " />
                    </div>
                </div>
                <div className="sm:col-span-2 w-[100%]">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 ">Wiadomość</label>
                    <div className="mt-2">
                        <textarea required name="message" value={message} onChange={e => setMessage(e.target.value)} id="message" rows={4} className="border border-gray-300 block w-full rounded-md py-3 px-4 shadow-sm focus:border-sky-500 focus:ring-sky-500 " />
                    </div>
                </div>
                <div className="flex justify-end sm:col-span-2">
                    <Button type="submit" width="12rem">
                        <span>Wyślij wiadomość</span>
                    </Button>
                </div>
            </form>
        </div>
    )
}

export {Contact}