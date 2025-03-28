
import Alert from "@/components/alert-pop-up";
import { BacktoStart } from "@/components/back-to-start";
import { Signer} from "@/components/sign-in";
import { getReferral } from "@/lib/utility/referrals";
import Image from "next/image";
import Link from "next/link";


const  Page = async () => {
    const refId = await getReferral()
    return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">        
        <Alert />
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1 relative">
            <BacktoStart />
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
        <Link href="/"><Image src="/LogoFull.jpg" className="w-48 h-48 mx-auto mb-6 rounded-full object-cover" alt="Logo Goldskill" width={192} height={192}/></Link>
        <h1 className="text-2xl font-bold text-center mb-6"> Logowanie </h1>
        <Signer type="sign-in"  refId={refId}/>
        <Link href="/sign-up" className="block mb-3 text-center">Nie masz konta? <p className="text-blue-500 inline">Załóż konto</p></Link> 
        <Link href="/forgot-password"className="block text-blue-500 text-center">Zapomniałeś hasła?</Link>
        </div>
        </div>
    </div>
    )
}

export default Page;