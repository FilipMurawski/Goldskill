'use client'
import { SignIn } from "@/actions/guest_actions";
import { getReferral } from "@/lib/utility/referrals";

const Social_button = ({ path, alt, text, name }: { path: string; alt: string; text: string; name: "facebook" | "google" }): React.ReactNode => {
    const refId = getReferral()
    return (
        <form 
        onSubmit={() => 
             SignIn({provider: name, refId})
              }>
        <button className="w-full mx-auto max-w-xs text-center py-2 my-3 border flex items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
            <img src={path} className="w-5 h-5 mr-2" alt={alt} />
            <span className="dark:text-gray-700">{text}</span>
        </button>
        </form>
    )
}

export { Social_button }