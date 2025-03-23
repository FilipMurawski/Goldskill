'use client'

import Image from "next/image";

const Social_button = ({ path, alt, text, click}: { path: string; alt: string; text: string; name: "facebook" | "google", click?: (e: React.MouseEvent<HTMLButtonElement>) => void }): React.ReactNode => {
    return (
        <button onClick={click} className=" w-full mx-auto max-w-xs text-center py-2 my-3 border flex items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
            <Image src={path} className="w-5 h-5 mr-2" alt={alt} width={20} height={20}/>
            <span className="dark:text-gray-700">{text}</span>
        </button>
    )
}

export { Social_button }