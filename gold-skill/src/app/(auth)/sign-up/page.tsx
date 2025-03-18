
import Link from "next/link"
import { Social_button } from "@/components/social-button"
import { Signer } from "@/components/sign-in";
import { BacktoStart } from "@/components/back-to-start";

const  Page = () => {

    return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1 relative">
            <BacktoStart />
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
        <a href="/"><img src="/LogoFull.jpg" className="w-48 h-48 mx-auto mb-6 rounded-full object-cover" alt="Logo Goldskill"/></a>
        <h1 className="text-2xl font-bold text-center mb-6"> Rejestracja </h1>

        <Social_button alt="Google logo" name="google" path="/google.svg" text="Zarejestruj się z Google"/>
        <Social_button alt="Facebook logo" name="facebook" path="/facebook.svg" text="Zarejestruj się z Facebook"/>

        <div className="my-12 border-b text-center mx-auto max-w-xs">
                        <div
                            className="leading-none px-2 inline-block text-sm text-gray-400 tracking-wide font-medium bg-white transform translate-y-1/2">
                            lub zarejestruj się poprzez email
                        </div>
        </div>
        <Signer type="sign-up"/>
        <Link href="/sign-in" className="w-full block mb-3 text-center">Masz już konto? <p className="text-blue-500 inline">Zaloguj się</p></Link> 
        </div>
        </div>
    </div>
    )
}

export default Page;