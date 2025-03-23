import Image from "next/image"

const Review = ({name, job, text, src}: {name: string, job: string, text: string, src: string}) => {
    return (
        <li className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white  shadow-2xl shadow-gray-600/10 ">
            <div className="flex gap-4 items-center">
                    <Image
                        src={src}
                        alt="Profile"
                        className="w-12 h-12 rounded-full"
                    />  
                <div>
                    <h6 className="text-lg text-gray-800 text-start font-bold">{name}</h6>
                    <p className="text-sm text-gray-500 text-start font-bold">{job}</p>
                </div>
            </div>
            <p className="mt-8 text-start text-gray-600">
                {text}
            </p>
        </li>
    )
}

export { Review }