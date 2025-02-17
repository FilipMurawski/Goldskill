import { Header } from "@/components/header"
import { auth } from "@/lib/auth";
import regulamin_systemu_prowizyjnego from "@/lib/statics/regulamin_systemu_prowizyjnego"
import { User } from "@prisma/client";
import { redirect } from "next/navigation";
const page = async () => {
        const session = await auth()
        if (!session) redirect('/sign-in');
        const user: any = session?.user;
        if (!user || user.isActive != true) redirect('/panel');           
    return (
        <section className="flex justify-center items-center min-h-[50vh] space-y-10 text-center px-6 sm:px-12 max-w-[1368px] w-full mx-auto lg:flex-nowrap flex-wrap p-20 flex-col mb-10">        
            <Header size="big">{regulamin_systemu_prowizyjnego.header}</Header>
            {regulamin_systemu_prowizyjnego.sections.map(section => {
                return (
                    <div key={section.header} className="w-full">
                    <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-800 max-w-3xl leading-relaxed text-left">{section.header}</h3>
                    {section.texts?.map(text =>{
                        return <p className="mt-2 text-sm text-gray-700 text-left" key={text}>{text}</p>
                    } )}
                    </div>
                )
            })}    
        </section>
    )
}

export default page