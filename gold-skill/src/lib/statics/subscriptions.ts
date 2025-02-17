
declare type subscription = {
    name: string,
    cost: number,
    length: string,
    fullcost?: number,
    refcode: string    
}
  const subscriptions = [
    {
        name: "Pakiet miesięczny",
        cost: 99,
        length: "miesiąc",
        fullcost: "",
        refcode: "/sign-up/?sub=1"
    },
    {
        name: "Pakiet półroczny",
        cost: 499,
        length: "6 miesięcy",
        fullcost: 595,
        refcode: "/sign-up/?sub=2"
    },
    {
        name: "Pakiet roczny",
        cost: 998,
        length: "rok",
        fullcost: 1188,
        refcode: "/sign-up/?sub=3"
    },
  ] as subscription[]

export default subscriptions;