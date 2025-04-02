const EmailFooter = () => {
    return (
        <section style={{ fontFamily: "Arial, sans-serif", color: "#333", lineHeight: "1.5", margin: "20px" }}>
            <footer style={{ padding: "10px", borderTop: "1px solid #ccc" }}>
                <p>
                    Ta wiadomość została wysłana z automatycznej skrzynki. Proszę nie odpowiadaj na nią. Jeśli nie chcesz otrzymywać takich wiadomości, skontaktuj się z nami pod adresem:
                    <a
                        href="mailto:biuro@goldskill.pl"
                        style={{ color: "#007bff", textDecoration: "none", paddingLeft: "5px", display: "inline-block" }}
                    >
                        biuro@goldskill.pl
                    </a>
                </p>
                <p>
                    Twoje dane są przetwarzane zgodnie z naszą polityką prywatności dostępną na
                    <a
                        href="https://www.GoldSkill.pl"
                        target="_blank"
                        style={{ color: "#007bff", textDecoration: "none", paddingLeft: "5px", display: "inline-block" }}
                    >
                        <strong>www.GoldSkill.pl</strong>
                    </a>
                    .
                </p>
                <p>W razie potrzeby, skontaktuj się z naszym wsparciem.</p>
                <p>
                    <p>Pozdrawiamy,</p>
                    <p>Zespół Golskill</p>
                </p>
                <p>
                    <p>
                        <a
                            href="mailto:biuro@goldskill.pl"
                            style={{ color: "#007bff", textDecoration: "none", display: "inline-block" }}
                        >
                            biuro@goldskill.pl
                        </a>
                    </p>
                    <p>
                        <a
                            href="https://discord.gg/68JWBSpJKD"
                            style={{ color: "#007bff", textDecoration: "none", display: "inline-block" }}
                        >
                            GoldSkill_TradeAcademy
                        </a>
                    </p>
                    <p>
                        <a
                            href="https://www.GoldSkill.pl"
                            style={{ color: "#007bff", textDecoration: "none", display: "inline-block" }}
                        >
                            Nasza strona
                        </a>
                    </p>
                </p>
            </footer>
        </section>
    );
};

export { EmailFooter };