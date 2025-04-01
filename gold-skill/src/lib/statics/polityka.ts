
const polityka = {
    header: "Polityka Prywatności Akademii Edukacyjnej GoldSkill",
    sections: [{
        header: "§1. Postanowienia ogólne",
        texts: ["1.1. Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych użytkowników oraz partnerów Akademii Edukacyjnej GoldSkill („Akademia”), zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. (RODO), ustawą o ochronie danych osobowych oraz innymi obowiązującymi przepisami prawa polskiego.","1.2. Administratorem danych osobowych jest Akademia Edukacyjna GoldSkill z siedzibą w Polsce, ul. M. Rataja 46, 87-200 Wąbrzeźno.","1.3. Kontakt z Administratorem w sprawach dotyczących ochrony danych osobowych możliwy jest pod adresem e-mail: biuro@GoldSkill.pl."]
    },
    {
       header: "§2. Cele i podstawy prawne przetwarzania danych osobowych",
       texts: ["2.1. Dane osobowe przetwarzane są w następujących celach:","• realizacji umowy o świadczenie usług edukacyjnych, w tym dostępu do kursów, szkoleń, webinarów i materiałów edukacyjnych (art. 6 ust. 1 lit. b RODO),","• obsługi zgłoszeń reklamacyjnych i roszczeń (art. 6 ust. 1 lit. b i c RODO),","• prowadzenia działań marketingowych i promocyjnych, w tym przesyłania informacji handlowych (art. 6 ust. 1 lit. a i f RODO),","• realizacji programu partnerskiego, w tym monitorowania wyników sprzedaży i wypłaty prowizji (art. 6 ust. 1 lit. b RODO),","• zapewnienia zgodności z przepisami prawa, w tym regulacjami Komisji Nadzoru Finansowego (art. 6 ust. 1 lit. c RODO).","2.2. W przypadku programu partnerskiego, dane osobowe klientów, takie jak imię, nazwisko oraz informacje o zakupach, mogą być udostępniane partnerom w celu monitorowania struktury sprzedaży i wyników."] 
    },
    {
        header: "§3. Rodzaje przetwarzanych danych osobowych",
        texts: ["3.1. W ramach korzystania z usług Akademii mogą być przetwarzane następujące dane:","• dane identyfikacyjne: imię, nazwisko, adres e-mail, numer telefonu,","• dane związane z transakcjami: informacje o zakupionych usługach, data i kwota transakcji,","• dane niezbędne do realizacji programu partnerskiego: dane partnera, struktura klientów i sprzedaży, wyniki prowizyjne,","• dane techniczne: adres IP, dane o urządzeniu, historia logowania.",]
    },
    {
        header: "§4. Odbiorcy danych osobowych",
        texts: ["4.1. Dane osobowe mogą być udostępniane:","• podmiotom przetwarzającym dane w imieniu Administratora, np. dostawcom usług IT,","• partnerom w ramach programu partnerskiego, którzy mają wgląd w dane swoich klientów w celu monitorowania wyników sprzedaży,","• organom publicznym, gdy wymagają tego obowiązujące przepisy prawa.",]
    },
    {
        header: "§5. Przekazywanie danych do państw trzecich",
        texts: ["5.1. Dane osobowe nie będą przekazywane poza Europejski Obszar Gospodarczy (EOG), chyba że będzie to niezbędne do realizacji usług, a odpowiedni poziom ochrony danych zostanie zagwarantowany.",]
    },
    {
        header: "§6. Okres przechowywania danych",
        texts: ["6.1. Dane osobowe będą przechowywane przez okres:","• trwania umowy o świadczenie usług edukacyjnych oraz przez czas niezbędny do dochodzenia lub obrony przed roszczeniami,","• wymagany przepisami prawa, np. w celach księgowych, podatkowych czy zgodności z regulacjami KNF,","• w przypadku działań marketingowych, do momentu wycofania zgody przez użytkownika.",]
    },
    {
        header: "§7. Prawa osób, których dane dotyczą",
        texts: ["7.1. Użytkownikom przysługuje prawo do:","• dostępu do swoich danych,","• sprostowania, usunięcia lub ograniczenia przetwarzania danych,","• przenoszenia danych do innego administratora,","• cofnięcia zgody na przetwarzanie danych w dowolnym momencie,","• wniesienia sprzeciwu wobec przetwarzania danych na podstawie prawnie uzasadnionego interesu Administratora,","• wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych.",]
    },
    {
        header: "§8. Zasady przetwarzania danych w systemie prowizyjnym",
        texts: ["8.1. Partnerzy w programie prowizyjnym wyrażają zgodę na udostępnienie ich danych osobowych osobom polecającym, celem monitorowania struktury sprzedaży i wyników.", "8.2. Dane klientów przetwarzane w ramach programu partnerskiego obejmują wyłącznie informacje niezbędne do rozliczeń prowizyjnych, takie jak imię, nazwisko, oraz dane o transakcjach.", "8.3. Partnerzy zobowiązani są do zachowania poufności przetwarzanych danych oraz ich wykorzystania wyłącznie w celach zgodnych z regulaminem programu partnerskiego."]
    },
    {
        header: "§9. Zabezpieczenie danych osobowych",
        texts: ["9.1. Akademia stosuje odpowiednie środki techniczne i organizacyjne, aby zapewnić bezpieczeństwo przetwarzanych danych, w tym szyfrowanie, dostęp na poziomie uprawnień oraz regularne audyty.",]
    },
    {
        header: "§10. Pliki cookies",
        texts: ["10.1. Akademia wykorzystuje pliki cookies w celu zapewnienia poprawnego funkcjonowania strony internetowej, analizy ruchu oraz działań marketingowych. Szczegóły dotyczące polityki cookies dostępne są w odrębnej sekcji na stronie internetowej Akademii.",]
    },
    {
        header: "§11. Postanowienia końcowe",
        texts: ["11.1. Polityka Prywatności wchodzi w życie z dniem [data] i może być aktualizowana w celu zapewnienia zgodności z obowiązującymi przepisami prawa.","11.2. Wszelkie zmiany Polityki Prywatności będą komunikowane użytkownikom za pośrednictwem strony internetowej Akademii."]
    }
]
} as {
    header: string,
  sections: {header: string, texts: string[]}[]
}

export default polityka;