
import Alert from "@/components/alert-pop-up";
import { BacktoStart } from "@/components/back-to-start";
import { Signer} from "@/components/sign-in";
import { Social_button } from "@/components/social-button";
import Link from "next/link";


const  Page = () => {

    return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">        
        <Alert />
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1 relative">
            <BacktoStart />
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
        <a href="/"><img src="/LogoFull.jpg" className="w-48 h-48 mx-auto mb-6 rounded-full object-cover" alt="Logo Goldskill"/></a>
        <h1 className="text-2xl font-bold text-center mb-6"> Logowanie </h1>

        <Social_button alt="Logo Google" name="google" path="/google.svg" text="Zaloguj się z Google"/>
        <Social_button alt="Logo Facebook" name="facebook" path="/facebook.svg" text="Zaloguj się z Facebook"/>

        <div className="my-12 border-b text-center mx-auto max-w-xs">
                        <div
                            className="leading-none px-2 inline-block text-sm text-gray-400 tracking-wide font-medium bg-white transform translate-y-1/2">
                            lub zaloguj się poprzez email
                        </div>
        </div>
        <Signer type="sign-in"/>
        <Link href="/sign-up" className="block mb-3 text-center">Nie masz konta? <p className="text-blue-500 inline">Załóż konto</p></Link> 
        <Link href="/forgot-password"className="block text-blue-500 text-center">Zapomniałeś hasła?</Link>
        </div>
        </div>
    </div>
    )
}

export default Page;