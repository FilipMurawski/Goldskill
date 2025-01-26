import SignIn from "./sign-in"

declare type header = {
    title: string,
    id: string,
}

export default function navbar(headers: header[]): React.ReactNode  {
   return (
        <nav className="bg-black shadow-md fixed w-full z-50">
            <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center h-16">
            <a href="#home"><img src="/LogoBiel.JPG" alt="Logo" className="h-10 w-auto"/></a>
            <ul className="hidden md:flex space-x-8">                
                {headers.map(header => {
                    return <li key={header.id} className="text-gray-700 hover:text-gray-900 font-medium transition duration-200"><a href={`#${header.id}`}>{header.title}</a></li>
                }) as React.ReactNode} 
            </ul>
            {SignIn()}
            </div>
        </nav>
    )
}