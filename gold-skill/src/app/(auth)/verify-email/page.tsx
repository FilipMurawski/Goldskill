import Alert from "@/components/alert-pop-up"
import { Verify_Email } from "@/components/verify-email";
import Image from "next/image";
import Link from "next/link"


const Page = () => {
    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <Alert />
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1 relative">
        <Link href="/sign-in" className="absolute top-5 left-5 hover:text-blue-500 transition duration-150" ><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 inline" viewBox="0 0 448 512"><path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg> Wróć na stronę logowania</Link>

        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
        <Link href="/"><Image src="/Logo Full.jpg" className="w-48 h-48 mx-auto mb-6 rounded-full object-cover" width={192} height={192} alt="Logo Goldskill"/></Link>
        <h1 className="text-2xl font-bold text-center mb-6"> Potwierdzenie maila </h1>
            <div className="flex items-center justify-center gap-4">
                <Verify_Email />
            </div>
        </div>
        </div>
    </div>
    )
}

export default Page;