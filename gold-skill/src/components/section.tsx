const Section = ({id, children, wrap}:{id: string; children: React.ReactNode, wrap: "wrap" | "no-wrap"}): React.ReactNode => {
    if(wrap === "no-wrap"){
        return (
            <section id={id} className="flex justify-center items-center min-h-[50vh] space-y-10 text-center px-6 sm:px-12 max-w-[1368px] w-full mx-auto lg:flex-nowrap flex-wrap p-20 pb-0 md:pb-20">
            {children}
            </section>
        )
    }
    else {
        return (
            <section id={id} className="flex justify-center items-center min-h-[50vh] space-y-10 text-center px-6 sm:px-12 max-w-[1368px] w-full mx-auto flex-col gap-10 p-20 pb-0 md:mb-0 md:pb-20">
            {children}
            </section>
        )
    }
}

export { Section }