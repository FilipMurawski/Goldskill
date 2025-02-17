const Feature = ({ header, text, array}: {header: string, text?: string, array?: string[]}) => {
    return (
        <li className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{header}</h2>
                {text ? <p className="text-gray-600 mb-2">{text}</p> : null}
                {array !== undefined? array.map((text) => {
                    return (
                        <p key={text} className=" text-gray-600">{text}</p>
                    )
                }): null}
        </li>
    )
}

export {Feature}