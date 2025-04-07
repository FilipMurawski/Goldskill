import Link from "next/link"
import { Header } from "./header"
import Image from "next/image"

const Footer = ({type}: {type: "front" | "panel"}): React.ReactNode => {
    return (
        <div className={` pt-16 ${type === "front" ? "mx-auto px-4 md:px-24 lg:px-8" : ""} sm:max-w-xl md:max-w-full lg:max-w-screen-xl `}>
  <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
    <div className="sm:col-span-2">
      <a href="#start" aria-label="Go home" title="Company" className="inline-flex items-center">
        <Image className="w-12 h-12 mr-4" src="/Logo Biel.jpg" alt="Logo Goldskill" width={48} height={48}/>
        <Header size="big">GoldSkill</Header>
      </a>
      <div className="mt-6 lg:max-w-sm">
        <p className="text-sm text-gray-800">
         Miejsce, które łączy wiedzę, pasję i doświadczenie, by wspierać Cię w Twojej inwestycyjnej podróży.
        </p>
        <p className="mt-4 text-sm text-gray-800">
        Społeczność traderów i edukatorów na najwyższym poziomie.
        </p>
      </div>
    </div>
    <div className="space-y-2 text-sm">
      <p className="text-base font-bold tracking-wide text-gray-900">Kontakt</p>
      <div className="flex">
        <p className="mr-1 text-gray-800">Email:</p>
        <a href="mailto:biuro@goldskill.pl" aria-label="Our email" title="Our email" className="transition-colors duration-300 text-blue-400 hover:text-purple-700">biuro@goldskill.pl</a>
      </div>
      <div className="flex">
        <p className="mr-1 text-gray-800">NIP:</p>
        <p aria-label="Nasz NIP" className="transition-colors duration-300 text-blue-400">
          878-181-09-78
        </p>
      </div>
      <div className="flex">
        <p className="mr-1 text-gray-800">REGON:</p>
        <p aria-label="Nasz NIP" className="transition-colors duration-300 text-blue-400">
        540760796
        </p>
      </div>
      <div className="flex">
        <p className="mr-1 text-gray-800">Discord:</p>
        <a aria-label="Discord" className="transition-colors duration-300 text-blue-400" href="https://discord.gg/68JWBSpJKD" target="blank">
          GoldSkill_TradeAcademy
        </a>
      </div>
    </div>
    <div>
      <span className="text-base font-bold tracking-wide text-gray-900">Media społecznościowe</span>
      <div className="flex items-center mt-1 space-x-3">
        <Link href="https://discord.gg/68JWBSpJKD" target="_blank" className="text-gray-500 transition-colors duration-300 hover:text-yellow-500">
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 scale-125">
          <path d="M9.593 10.971c-.542 0-.969.475-.969 1.055 0 .578.437 1.055.969 1.055.541 0 .968-.477.968-1.055.011-.581-.427-1.055-.968-1.055zm3.468 0c-.542 0-.969.475-.969 1.055 0 .578.437 1.055.969 1.055.541 0 .968-.477.968-1.055-.001-.581-.427-1.055-.968-1.055z"/><path d="M17.678 3H4.947A1.952 1.952 0 0 0 3 4.957v12.844c0 1.083.874 1.957 1.947 1.957H15.72l-.505-1.759 1.217 1.131 1.149 1.064L19.625 22V4.957A1.952 1.952 0 0 0 17.678 3zM14.01 15.407s-.342-.408-.626-.771c1.244-.352 1.719-1.13 1.719-1.13-.39.256-.76.438-1.093.562a6.679 6.679 0 0 1-3.838.398 7.944 7.944 0 0 1-1.396-.41 5.402 5.402 0 0 1-.693-.321c-.029-.021-.057-.029-.085-.048a.117.117 0 0 1-.039-.03c-.171-.094-.266-.16-.266-.16s.456.76 1.663 1.121c-.285.36-.637.789-.637.789-2.099-.067-2.896-1.444-2.896-1.444 0-3.059 1.368-5.538 1.368-5.538 1.368-1.027 2.669-.998 2.669-.998l.095.114c-1.71.495-2.499 1.245-2.499 1.245s.21-.114.561-.275c1.016-.446 1.823-.57 2.156-.599.057-.009.105-.019.162-.019a7.756 7.756 0 0 1 4.778.893s-.751-.712-2.366-1.206l.133-.152s1.302-.029 2.669.998c0 0 1.368 2.479 1.368 5.538 0-.001-.807 1.376-2.907 1.443z"/>
          </svg>
        </Link>
        <Link target="_blank" href="https://www.instagram.com/goldskill_tradegroup?igsh=MWpyOGZ6eGtobHNhcw%3D%3D&utm_source=qr" className="text-gray-500 transition-colors duration-300 hover:text-yellow-500">
          <svg viewBox="0 0 30 30" fill="currentColor" className="h-6">
            <circle cx="15" cy="15" r="4"></circle>
            <path
              d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10   C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1   c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z"
            ></path>
          </svg>
        </Link>
        {/* <a href="/" className="text-gray-500 transition-colors duration-300 hover:text-yellow-500">
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
            <path
              d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z"
            ></path>
          </svg>
        </a> */}
      </div>
      <p className="mt-4 text-sm text-gray-500">
        Społeczność traderów i edukatorów na najwyższym poziomie.
      </p>
    </div>
  </div>
  <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row">
    <p className="text-sm text-gray-600">
      © Copyright 2025 GoldSkill. Wszystkie prawa zastrzeżone.
    </p>
    <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
      <li>
        <Link href="/ostrzezenie-o-ryzyku" className="text-sm text-gray-600 transition-colors duration-300 hover:text-yellow-500">Ostrzeżenie o ryzyku inwestycyjnym</Link>
      </li>
      <li>
        <Link href="/polityka-prywatnosci" className="text-sm text-gray-600 transition-colors duration-300 hover:text-yellow-500">Polityka Prywatności</Link>
      </li>
      <li>
        <Link href="/regulamin" className="text-sm text-gray-600 transition-colors duration-300 hover:text-yellow-500">Regulamin</Link>
      </li>
      {type === "panel" &&       <li>
        <Link href="/regulamin-systemu-prowizyjnego" className="text-sm text-gray-600 transition-colors duration-300 hover:text-yellow-500">Regulamin systemu prowizyjnego</Link>
      </li>}
    </ul>
  </div>
</div>
    )
}

export { Footer }