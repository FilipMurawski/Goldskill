const Header = ({size, children, classt}: {size: "small" | "big"; children: string | React.ReactNode, classt?: string }) => {
    if(size === "big")
    return (
    <h2 className={` text-xl sm:text-2xl md-text-3xl lg:text-4xl text-gray-800 max-w-2xl font-bold ${classt}`}>
    {children}
    </h2>
    ) 
    else {
        return (
        <h3 className={`${classt} text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl leading-relaxed`}>
        {children}
        </h3>
        )
    }
}

export { Header }