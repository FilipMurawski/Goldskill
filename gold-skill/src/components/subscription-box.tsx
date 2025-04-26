'use client'
import Button from "./button"


const SubscriptionBox = ({name, period, description, id, price, fullcost, type, isSelected, goBack, confirm}: {    name: string;
    period: number;
    description: string;
    id: string;
    price: number;
    isActive: boolean;
    type: "front" | "regular",
    isSelected?: boolean,
    goBack?: () => void,
    confirm?: () => void,
fullcost: string}) => {
    description = description === '💰 Pełna transformacja w skutecznego tradera,📊 Kompleksowa wiedza i praktyka,🚀 Elitarne środowisko i unikalne okazje' ? '💰 Pełna transformacja w tradera,📊 Kompleksowa wiedza i praktyka,🚀 Elitarne środowisko i unikalne okazje' : description;
    return (
        <li className="mt-4 max-w-sm mx-auto px-4" key={id}>
            <div className={`bg-white border rounded text-center px-4 pt-6 pb-8 shadow ${isSelected && "border-green-500 border-2"}`}>
                <h3 className="text-2xl">
                    {name}
                </h3>
                <div className="mt-2">
                    {
                fullcost ?
                 <span className="text-red-500 text-3xl line-through">{fullcost} €</span> :
                <span className="text-gray-600 text-3xl"> cena standard </span>
                }
                    
                </div>
                <div className="mt-2">
                    <span className="font-bold text-3xl">{price} €</span>
                    <span className="text-gray-600">/ {period === 30 ? "miesiąc" : period === 180 ? "6 miesięcy" : "rok"}</span>
                </div>
                {fullcost &&<>      
                <div className="mt-2 text-gray-700">(ok. 83 € / miesiąc)</div>
                <div className="mt-2 text-gray-800">Oszczędź {period === 180 ? 95 : 190} € w porównaniu do miesięcznej subskrypcji.</div>
                </>
                }
                <div className="mt-6 text-left">
                    {description.split(",").map(text => {
                        return <p key={text} className=" mt-2">{text}</p>
                    })}
                </div>
                <div className="mt-8 flex items-center justify-center">
                    {isSelected ? <Button type="button" width={"10rem"} onClick={goBack}>Cofnij</Button> : <Button type="button" width={"10rem"} onClick={type === "regular" ? confirm : undefined}reference={type === "front" ? `/sign-up` : undefined}>{type === "front" ? "Rozpocznij" : "Wybierz"}</Button>}
                </div>
            </div>
        </li>       
    )
}

export {SubscriptionBox}