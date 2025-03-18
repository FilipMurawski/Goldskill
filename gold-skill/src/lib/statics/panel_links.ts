declare type link = {
    title: string,
    id: string,    
}
  const panel_links = [
    {
        title: "Start",
        id: "/panel",
    },
    {
        title: "Moja struktura",
        id: "/panel/structure",
    },
    {
        title: "Moje zarobki",
        id: "/panel/raports",
    },
    {
        title: "Mój profil",
        id: "/panel/profil"
    },
    {
        title: "Moja subskrybcja",
        id: "/panel/subscription"
    },
    {
        title: "Moje płatności",
        id: "/panel/payments"
    }
  ] as link[]

export default panel_links;