import { EmailFooter } from "../email-template";

export const WelcomeEmailTemplate: React.FC = () => (
    <div style={{ fontFamily: "Arial, sans-serif", color: "#333", lineHeight: "1.5", margin: "20px" }}>
        <header style={{ marginBottom: "20px" }}>
            <h2 style={{ fontSize: "24px", color: "#007bff" }}>Cześć</h2>
        </header>
        <article style={{ marginBottom: "20px" }}>
            <p style={{ marginBottom: "10px" }}>
                Dziękujemy za dołączenie do elitarnego grona GoldSkill! Cieszymy się z Twojego zaufania i tego, że zdecydowałaś/eś się rozpocząć swoją przygodę z tradingiem razem z nami.
            </p>
            <p style={{ marginBottom: "10px" }}>Sprawdź nasze kursy:</p>
            <ul style={{ marginBottom: "10px", paddingLeft: "20px" }}>
                <li style={{ marginBottom: "5px" }}>„Zrozumieć Rynki”</li>
                <li style={{ marginBottom: "5px" }}>„Poradnik SMC”</li>
                <li style={{ marginBottom: "5px" }}>„Podstawy Tradingu”</li>
                <li style={{ marginBottom: "5px" }}>„Zrozumieć Rynki”</li>
            </ul>
            <p style={{ marginBottom: "10px" }}>
                Dla ułatwienia Twojego startu, przygotowaliśmy krótki przewodnik, który znajdziesz na Discordzie w zakładce „EDUKACJA, ROZWÓJ” — „start_edukacja”.
            </p>
            <p style={{ marginBottom: "10px" }}>Życzymy Ci udanych inwestycji i owocnej nauki!</p>
        </article>
        <EmailFooter />
    </div>
);