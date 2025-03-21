
import { EmailFooter } from "../email-template";

export const WelcomeEmailTemplate:React.FC = () => (
    <>
    <header>
        <h2>Cześć</h2>
    </header>
    <article>
    <p>Dziękujemy za dołączenie do elitarnego grona GoldSkill! Cieszymy się z Twojego zaufania i tego, że zdecydowałaś/eś się rozpocząć swoją przygodę z tradingiem razem z nami.</p>
    <p>Sprawdź nasze kursy:</p>
    <ul>
        <li>„Zrozumieć Rynki”</li>
        <li>„Poradnik SMC”</li>
        <li>„Podstawy Tradingu”</li>
        <li>„Zrozumieć Rynki”</li>
    </ul>
    <p>Dla ułatwienia Twojego startu, przygotowaliśmy krótki przewodnik, który znajdziesz na Discordzie w zakładce „EDUKACJA, ROZWÓJ” — „start_edukacja”.</p>
    <p>Życzymy Ci udanych inwestycji i owocnej nauki!</p>
    </article>
    <EmailFooter/>
    </>
)
