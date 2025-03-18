import { Header } from "@/components/header";


export default async function PanelPage() {

    
    return (
        <section className="flex flex-col gap-10">
            <Header size="big">Witaj w panelu GoldSkill!
            </Header>
            <Header size="small">Cieszymy się, że się zalogowałeś!</Header>
            <Header size="small">Jesteśmy tu, by wspierać Cię na każdym etapie Twojej edukacji i rozwoju w świecie tradingu.</Header>
            <Header size="small"> Na swoim panelu możesz łatwo sprawdzić szczegóły dotyczące swojej subskrypcji, czas pozostały do końca pakietu, a także zobaczyć liczbę osób w Twoim zespole.</Header>
            <Header size="small">Zaczynajmy i życzymy Ci dalszych sukcesów!</Header>
        </section>
    )
}