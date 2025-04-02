import { EmailFooter } from "../email-template";

interface ContactEmailProps {
    Contactemail: string;
    message: string;
    name: string;
}

export const ContactEmailTemplate: React.FC<Readonly<ContactEmailProps>> = ({ Contactemail, message, name }) => (
    <div style={{ fontFamily: "Arial, sans-serif", color: "#333", lineHeight: "1.5", margin: "20px" }}>
        <header style={{ marginBottom: "20px" }}>
            <h2 style={{ fontSize: "24px", color: "#007bff" }}>Cześć Goldskill</h2>
        </header>
        <article style={{ marginBottom: "20px" }}>
            <p style={{ marginBottom: "10px" }}>Dostałeś wiadomość od użytkownika <strong>{name}</strong>.</p>
            <p style={{ marginBottom: "10px" }}>Jego adres email to: <a href={`mailto:${Contactemail}`} style={{ color: "#007bff", textDecoration: "none" }}>{Contactemail}</a></p>
            <p style={{ marginBottom: "10px" }}>Poniżej znajdziesz treść wiadomości:</p>
            <p style={{ marginBottom: "10px", fontStyle: "italic" }}>&quot;{message}&quot;</p>
        </article>
        <EmailFooter />
    </div>
);