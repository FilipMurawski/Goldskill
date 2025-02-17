
declare type review = {
    name: string,
    job: string,
    text: string,
    src: string    
}
  const reviews = [
    {
        name: "Bartek, 26 lat",
        job: "Trader",
        text: "Do GoldSkill trafiłem cztery miesiące temu i jestem bardzo zadowolony. Kursy dają solidną wiedzę, ale to gotowe pomysły handlowe oszczędzają mi czas. Sesje na żywo świetnie wyjaśniają wątpliwości, a analizy i strategie są naprawdę mocną stroną tej akademii.",
        src: "/Face1.png"
    },
    {
        name: "Monika, 21 lat",
        job: "Początkujący trader",
        text: "GoldSkill to perełka w edukacji forexowej! Kursy są rozbudowane, a 'Wasza strefa' to świetna przestrzeń do wymiany doświadczeń. Sesje na żywo dają poczucie wsparcia, a można się sporo nauczyć od innych.",
        src: "/Face2.png"
    },
    {
        name: "Anna, 25 lat",
        job: "Inwestor",
        text: "Zaczęłam od zera, a dzięki kursom w GoldSkill widzę szybkie postępy. Sesje na żywo pomagają korygować błędy, a 'Wasza strefa' to świetna przestrzeń do dzielenia się doświadczeniami i budowania pewności w inwestowaniu.",
        src: "/Face3.png"
    },
    {
        name: "Filip, 35 lat",
        job: "Trader",
        text: "GoldSkill to kompleksowa edukacja. Cztery kursy dały mi solidne podstawy, a gotowe pomysły handlowe oszczędzają czas. Sesje na żywo pomagają rozwiać wątpliwości i wspierają rozwój.",
        src: "/Face4.png"
    },
  ] as review[]

export default reviews;