
import Button from "@/components/button";
import { Header } from "@/components/header";
import { Navbar } from "@/components/navbar";
import { Section } from "@/components/section";
import { auth } from "@/lib/auth";
import headers from "@/lib/statics/headers";
import features from "@/lib/statics/features";
import { Feature } from "@/components/feature";
import reviews from "@/lib/statics/reviews";
import { Review } from "@/components/review";
import subscriptions from "@/lib/statics/subscriptions";
import { SubscriptionBox } from "@/components/subscription-box";
import { Contact } from "@/components/contact";
import Slider from "@/components/slider";
import educators from "@/lib/statics/educators";
import { Footer } from "@/components/footer";
import Image from "next/image";


const Home = async () => {
  const session = await auth()
  
  return(
  <>
    <Navbar headers={headers} user={session?.user}/>
    <section className="flex justify-center items-center h-screen flex-col space-y-12 text-center px-6 sm:px-12 pt-32 sm:pt-0" id="start">
      <Image src="/LogoFull.JPG" alt="Logo GoldSkill" className="w-36 sm:w-44 md:w-52 lg:w-60 rounded-full" width={192} height={192}/>
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-800 max-w-2xl font-bold">Rozwiń swój potencjał inwestycyjny z GoldSkill</h1>
      <Header size="small">GoldSkill to wyjątkowe miejsce, gdzie doświadczenie łączy się z pasją do nauki. Oferujemy najwyższy poziom edukacji inwestycyjnej, która pozwala zrozumieć rynki finansowe i podejmować świadome decyzje. Nasze metody to sprawdzone strategie, wiedza ekspertów i zasoby, które robią różnicę.</Header>
      <Button type="button" width={"240px"} reference="/sign-up">
      Rozpocznij swoją edukacyjną podróż 🚀
      </Button>
    </section>
    <Section id="dlaczego" wrap="no-wrap">
      <Image src="/Young man.png" alt="young man" className="w-[90%] sm:w-[50%] min-w-[16rem]" width={600} height={1200}/>
      <div className="w-[50%] min-w-52 flex justify-center items-center space-y-10 flex-col">
        <Header size="big">Dlaczego GoldSkill ?</Header>
        <Header size="small">GoldSkill to więcej niż platforma edukacyjna – to wsparcie na każdym etapie Twojej inwestycyjnej drogi. Działamy od września 2022 roku, tworząc społeczność, która dzieli się wiedzą i doświadczeniem. Nasi czterej specjaliści pomagają rozwijać umiejętności inwestycyjne, oferując unikalne materiały edukacyjne. </Header>
        <div className="flex justify-center items-start space-x-[10%] space-y-[10%] w-[100%] text-gray-600 flex-col sm:flex-row sm:space-y-0 ">
          <div className="flex justify-center flex-col items-center min-w-[calc(84%/3)] gap-4"><Image alt="A book" src="/Book.png" className="w-16 h-16 grayscale-0" width={64} height={64}/> <p>Skupiamy się na dostarczaniu solidnych fundamentów i umiejętności, które pozwolą Ci zrozumieć rynki finansowe oraz podejmować świadome decyzje inwestycyjne.</p></div>
          <div className="flex justify-center flex-col items-center min-w-[calc(84%/3)] gap-4"><Image alt="A chart" src="/Chart.png" className="h-16 w-16 grayscale-0 scale-110 translate-y-1" width={64} height={64}/> <p>GoldSkill to społeczność, która pomaga na każdym poziomie zaawansowania. Nasi eksperci są dostępni, by odpowiadać na pytania i rozwiązywać problemy.</p></div>
          <div className="flex justify-center flex-col items-center min-w-[calc(84%/3)] gap-4"><Image alt="magnifying glass" src="/Magnifying Glass.png" className="w-16 h-16 grayscale-0" width={64} height={64}/> <p> Dzięki dostępowi do zamkniętej grupy zawsze otrzymasz niezbędną pomoc. Dodatkowo oferujemy kompleksowe kursy, codzienne analizy i wsparcie w realnym czasie.</p></div>
        </div>
      </div>
    </Section>
    <Section id="edukatorzy" wrap="wrap">
      <Header size="big" >Poznaj naszych ekspertów: </Header>
      <Slider educators={educators}/>
    </Section>
    <Section id="oferta" wrap="wrap">
      <Header size="big" >GoldSkill oferuje wszechstronną edukację, która obejmuje wszystkie kluczowe aspekty tradingu: </Header>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => {return (
            <Feature header={feature.title} text={feature.text} key={feature.title} array={feature.array}/>
          )})}
      </ul>
    </Section>
    <Section id="opinie" wrap="no-wrap">      
      <div className="md:w-[50%] w-[90%] min-w-52 flex justify-center items-center space-y-10 flex-col">
      <Header size="big">Zaufanie zbudowane na sukcesach</Header>
      <ul className=" grid lg:grid-cols-2 gap-8 grid-cols-1 ">
            {
            reviews.map((review) => {return (
              <Review name={review.name} job={review.job} text={review.text} key={review.name} src={review.src}/>
            )})
          }
      </ul>
      </div>
      <Image src="/Man.png" alt="happy man" className="w-[50%] min-w-52 order-first md:order-2 pb-6 md:pb-0" width={600} height={1200}/>
    </Section>
    <Section id="cennik" wrap="wrap">
      <Header size="big">Przejrzystość cen i pełen dostęp do wiedzy</Header>
      <ul className="grid lg:grid-cols-3 gap-8 grid-cols-1">
        {
        subscriptions.filter((s)=>s.isActive && s.price !== 0).map((subscription) => {return (
          <SubscriptionBox type="front"{...subscription} key={subscription.id} fullcost={subscription.price === 99 ? "" : subscription.price === 499 ? "595" : "1188"}/>
        )})
        }
      </ul>
    </Section>
    <Section id="partnerstwo" wrap="no-wrap">
      <Image src="/Teamwork.jpg" alt="Group of people crossing their hands in sun formation" width={600} height={300} className="w-[90%] sm:w-[50%] min-w-52 scale-90 sm:mr-10 sm:pt-14"/>
      <div className="w-[90%] sm:w-[50%] min-w-52 flex justify-center items-center space-y-10 flex-col">
        <Header size="big" classt="text-left">Zarabiaj, wspierając edukację na najwyższym poziomie</Header>
        <Header size="small" classt="text-left">GoldSkill oferuje wyjątkowy program partnerski, który pozwala promować nasze usługi i zarabiać na ich sukcesie. Współpracując z nami, otrzymujesz: </Header>
        <div className="flex justify-center items-start w-[100%] text-gray-600 flex-col gap-3">
          <div className="flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                stroke="currentColor" aria-hidden="true" className="mr-[8px] h-[28px] w-[28px] text-green-600 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z">
                </path>
            </svg>
            <div className="flex justify-start flex-col items-start gap-0.5">
              <p className="font-bold">Atrakcyjne prowizje: </p> 
              <p className="text-left">Otrzymaj 50% prowizji za wprowadzenie nowej osoby.</p>
            </div>
          </div>              
          <div className="flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                stroke="currentColor" aria-hidden="true" className="mr-2 h-[28px] w-[28px] text-green-600 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z">
                </path>
            </svg>
            <div className="flex justify-center flex-col items-start gap-0.5">
              <p className="font-bold">Dedykowany panel partnerski: </p> 
              <p className="text-left">Prosty sposób na monitorowanie wyników, prowizji i sprzedaży.</p>
            </div>
          </div>              
          <div className="flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                stroke="currentColor" aria-hidden="true" className="mr-2 h-[28px] w-[28px] text-green-600 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z">
                </path>
            </svg>
            <div className="flex justify-center flex-col items-start gap-0.5">
              <p className="font-bold">Wsparcie wielopoziomowe: </p> 
              <p className="text-left">Zarabiaj na bezpośrednich poleceniach i osobach z drugiego i trzeciego poziomu.</p>
            </div>
          </div>              
        </div>
      </div>
    </Section>

    <Section id="kontakt" wrap="wrap">
      <Header size="big">Masz pytania? Skontaktuj się z nami!</Header>
      <Header size="small">Proszę użyj poniższego formularza, aby się z nami skontaktować. Dziękujemy!</Header>
      <Contact />
    </Section>
    <Footer type="front"></Footer>
  </>
  )
}

export default Home;