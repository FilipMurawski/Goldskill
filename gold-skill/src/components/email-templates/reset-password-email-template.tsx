import { EmailFooter } from "../email-template";

interface ResetPasswordEmailProps {
    resetLink: string;
}

export const ResetPasswordEmailTemplate: React.FC<Readonly<ResetPasswordEmailProps>> = ({ resetLink }) => (
    <div style={{ fontFamily: "Arial, sans-serif", color: "#333", lineHeight: "1.5", margin: "20px" }}>
        <header style={{ marginBottom: "20px" }}>
            <h2 style={{ fontSize: "24px", color: "#007bff" }}>Cześć</h2>
        </header>
        <article style={{ marginBottom: "20px" }}>
            <p style={{ marginBottom: "10px" }}>
                Otrzymaliśmy prośbę o zresetowanie hasła do Twojego konta w GoldSkill.
            </p>
            <p style={{ marginBottom: "10px" }}>
                Ustaw nowe hasło, kliknij w poniższy przycisk:
            </p>
            <a
                href={resetLink}
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
                Resetuj hasło
            </a>
            <p style={{ marginTop: "20px" }}>
                Jeśli to nie Ty, zignoruj tego maila — Twoje dane są bezpieczne.
            </p>
        </article>
        <EmailFooter />
    </div>
);