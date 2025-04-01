import { EmailFooter } from "../email-template";

interface ContactEmailProps {
    Contactemail: string,
    message: string,
    name: string,
}

export const ContactEmailTemplate:React.FC<Readonly<ContactEmailProps>> = ({Contactemail,message, name}) => (
    <>
    <header>
        <h2>Cześć Goldskill</h2>
    </header>
    <article>
    <p>Dostałeś wiadomość od użytkownika {name}.</p>
    <p>Jego adres email to: {Contactemail}</p>
    <p>Poniżej znajdziesz treść wiadomości: </p>
    <p>&quot;{message}&quot;</p>
    </article>
    <EmailFooter/>
    </>
)
