import Button from "../button";
import { EmailFooter } from "../email-template";


interface ResetPasswordEmailProps {
    resetLink: string,

}

export const ResetPasswordEmailTemplate:React.FC<Readonly<ResetPasswordEmailProps>> = ({resetLink}) => (
    <>
    <header>
        <h2>Cześć</h2>
    </header>
    <article>
    <p>Otrzymaliśmy prośbę o zresetowanie hasła do Twojego konta w GoldSkill.</p>
    <p>Ustaw nowe hasło, kliknij w poniższy przycisk:</p>
    <a href={resetLink}>Resetuj hasło</a>
    <p>Jeśli to nie Ty, zignoruj tego maila — Twoje dane są bezpieczne.</p>
    </article>
    <EmailFooter/>
    </>
)
