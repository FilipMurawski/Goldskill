import { EmailFooter } from "../email-template"

interface ConfirmEmailProps {
    confirmationLink: string
}


export const ConfirmEmailEmailTemplate: React.FC<Readonly<ConfirmEmailProps>> = ({confirmationLink}) => (
    <>
    <header>
        <h2>Cześć</h2>
    </header>
    <article>
    <p>Dziękujemy za rejestrację w GoldSkill! Jesteś na końcu formalności.</p>
    <p>Dokończ proces zakładania konta, klikając w poniższy przycisk, aby potwierdzić swój adres e-mail:</p>
    <a href={confirmationLink} className='inline-block bg-[#28a745] text-white no-underline rounded-sm mx-2'>Potwierdź adres e-mail</a>
    <p>Jeśli nie rejestrowałaś/eś się na naszej platformie, zignoruj tego maila.</p>
    </article>
    <EmailFooter />
    </>
)
