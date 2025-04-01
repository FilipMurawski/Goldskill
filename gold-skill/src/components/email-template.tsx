



const EmailFooter = () => {
    return  (
        <section>
            <footer>
                <p>
                Ta wiadomość została wysłana z automatycznej skrzynki. Proszę nie odpowiadaj na nią. Jeśli nie chcesz otrzymywać takich wiadomości, skontaktuj się z nami pod adresem:
                <a href="mailto:biuro@goldskill.pl" className='block no-underline pl-1'> biuro@goldskill.pl</a>
                </p>
                <p>
                Twoje dane są przetwarzane zgodnie z naszą polityką prywatności dostępną na 
                <a href="https://www.GoldSkill.pl" target="_blank" className='block no-underline pl-1'><strong>www.GoldSkill.pl</strong></a>
                .
                </p>
                <p>
                W razie potrzeby, skontaktuj się z naszym wsparciem. 
                </p>
                <p>
                    <p>Pozdrawiamy,</p>
                    <p>Zespół Golskill</p>
                </p>
                <p>
                    <a href="mailto:biuro@GoldSkill.pl" className='block no-underline'>biuro@goldskill.pl</a>
                    <a href="https://discord.gg/68JWBSpJKD" className='block no-underline'>GoldSkill_TradeAcademy</a>
                    <a href="https://www.GoldSkill.pl" className='block no-underline'>Nasza strona</a>
                </p>
            </footer>
        </section>
    )
}

export {EmailFooter}
