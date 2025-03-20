
import Link from "next/link"
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
        <Signer type="sign-up"/>
        <Link href="/sign-in" className="w-full block mb-3 text-center">Masz już konto? <p className="text-blue-500 inline">Zaloguj się</p></Link> 
        </div>
        </div>
    </div>
    )
}

export default Page;