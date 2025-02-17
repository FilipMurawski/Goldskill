import { Header } from "@/components/header"
import polityka from "@/lib/statics/polityka"
const page = async () => {
    return (
        <section className="flex justify-center items-center min-h-[50vh] space-y-10 text-center px-6 sm:px-12 max-w-[1368px] w-full mx-auto lg:flex-nowrap flex-wrap p-20 flex-col mb-10">        
            <Header size="big">{polityka.header}</Header>
            {polityka.sections.map(section => {
                return (
                    <div key={section.header} className="w-full">
                    <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl leading-relaxed text-left">{section.header}</h3>
                    {section.texts?.map(text =>{
                        return <p className="mt-2 text-sm text-gray-800 text-left" key={text}>{text}</p>
                    } )}
                    </div>
                )
            })}      
        </section>
    )
}

export default page