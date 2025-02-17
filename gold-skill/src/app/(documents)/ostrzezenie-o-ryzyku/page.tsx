import { Header } from "@/components/header"
import ostrzezenie from "@/lib/statics/ostrzezenie"
const page = async () => {
    return (
        <section className="flex justify-center items-center min-h-[50vh] space-y-10 text-center px-6 sm:px-12 max-w-[1368px] w-full mx-auto lg:flex-nowrap flex-wrap p-20 flex-col mb-10">        
            <Header size="big">{ostrzezenie.header}</Header>
            {ostrzezenie.texts.map(text => {
                return (
                    <p key={text} className="text-gray-700 text-left w-full">{text}</p>
                )
            })}      
        </section>
    )
}

export default page