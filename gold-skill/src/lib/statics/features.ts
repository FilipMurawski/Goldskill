
declare type feature = {
    title: string,
    text?: string,
    array?: string[]    
}
  const features = [
    {
        title: "Zróżnicowane kursy",
        array: [`Zrozumieć Rynki`,
        `Poradnik SMC`,
        `London Breakout`,
        `Podstawy Tradingu`],
        text: "oferujemy kursy od podstaw po zaawansowane strategie, które pomogą Ci zbudować solidne fundamenty i rozwijać umiejętności inwestycyjne. Przykłady kursów:"
    },
    
    {
        title: "Materiały do różnych metod handlu",
        text:"oprócz kursów, udostępniamy zasoby dotyczące różnych systemów tradingowych, takich jak:",
        array: ["Swing Trading", "Price Action", "Smart Money Concept", "London Breakout", "Analiza Techniczna"]
    },
    {
        title: "Sesje na żywo z ekspertami",
        text: "Aż pięć sesji tygodniowo, podczas których zgłębisz strategie rynkowe i otrzymasz odpowiedzi na swoje pytania.",
    },
    {
        title: "Nagrania wideo jako klucz do utrwalania wiedzy",
        text: "masz dostęp do poradników na wyciągnięcie ręki oraz zestawu siedemnastu zapisanych sesji edukacyjnych.",
    },
  ] as feature[]

export default features;