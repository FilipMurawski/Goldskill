import { EmailFooter } from "../email-template";

interface ConfirmEmailProps {
    confirmationLink: string;
}

export const ConfirmEmailEmailTemplate: React.FC<Readonly<ConfirmEmailProps>> = ({ confirmationLink }) => (
    <div style={{ fontFamily: "Arial, sans-serif", color: "#333", lineHeight: "1.5", margin: "20px" }}>
        <header style={{ marginBottom: "20px" }}>
            <h2 style={{ fontSize: "24px", color: "#007bff" }}>Cześć</h2>
        </header>
        <article style={{ marginBottom: "20px" }}>
            <p style={{ marginBottom: "10px" }}>
                Dziękujemy za rejestrację w GoldSkill! Jesteś na końcu formalności.
            </p>
            <p style={{ marginBottom: "10px" }}>
                Dokończ proces zakładania konta, klikając w poniższy przycisk, aby potwierdzić swój adres e-mail:
            </p>
            <a
                href={confirmationLink}
                style={{
                    display: "inline-block",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    textDecoration: "none",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    fontWeight: "bold",
                    marginBottom: "20px",
                }}
            >
                Potwierdź adres e-mail
            </a>
            <p style={{ marginTop: "20px" }}>
                Jeśli nie rejestrowałaś/eś się na naszej platformie, zignoruj tego maila.
            </p>
        </article>
        <EmailFooter />
    </div>
);