const Header = ({size, children}: {size: "small" | "big"; children: string | React.ReactNode}) => {
    if(size === "big")
    return (
    <h2 className="text-xl text-center sm:text-2xl md-text-3xl lg:text-4xl text-gray-800 max-w-2xl font-bold">
    {children}
    </h2>
    ) 
    else {
        return (
        <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl leading-relaxed">
        {children}
        </h3>
        )
    }
}

export { Header }