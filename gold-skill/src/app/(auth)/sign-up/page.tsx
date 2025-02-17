import { signIn } from "@/lib/auth"
import Link from "next/link"
import { Social_button } from "@/components/socialButton"
import Button from "@/components/button"


const  Page = async () => {
    return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
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
        
        <form action={async () => {
            "use server"
        }}>            
        <div className="mx-auto max-w-xs text-center">
            <input type="text" name="email" placeholder="Email" required autoComplete="email" className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"/>
            <input type="password" name="password" placeholder="Hasło" required autoComplete="current-password" className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"/>
            <Button type="submit" width={"100%"}>Zarejestruj się</Button>
            <Link href="/sign-in" className="w-full block mb-3">Masz już konto? <p className="text-blue-500 inline">Zaloguj się</p></Link> 
        </div>
        </form>
        </div>
        </div>
    </div>
    )
}

export default Page;