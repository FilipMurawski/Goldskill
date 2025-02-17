import Button from "./button"

const Subscription = ({name, cost, length, fullcost, refcode}: {name: string, cost: number, fullcost?: number, length: string, refcode: string}) => {
    return (
        <li className="mt-4 max-w-sm mx-auto px-4" key={name}>
            <div className="bg-white border rounded text-center px-4 pt-6 pb-8 shadow">
                <h3 className="text-2xl">
                    {name}
                </h3>
                <div className="mt-2">
                    {
                fullcost ?
                 <span className="text-red-500 text-3xl line-through">{fullcost} €</span> :
                <span className="text-gray-600 text-3xl"> bez zniżki </span>
                }
                    
                </div>
                <div className="mt-2">
                    <span className="font-bold text-3xl">{cost} €</span>
                    <span className="text-gray-600">/ {length}</span>
                </div>
                <div className="mt-6">
                    <div className="mt-3">Pełny dostęp do sesji edukacyjnych na żywo.</div>
                    <div className="mt-3">Komplet materiałów edukacyjnych.</div>
                    <div className="mt-3">Udział w Strefie VIP.</div>
                </div>
                <div className="mt-8 flex items-center justify-center">
                    <Button type="button" width={"10rem"}>
                        <a href="/sign-up/">Rozpocznij</a>
                    </Button>
                </div>
            </div>
        </li>
    )
}

export {Subscription}