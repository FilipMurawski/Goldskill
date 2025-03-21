'use server';
import { ConfirmEmailEmailTemplate } from "@/components/email-templates/confirm-email-email-template";
import { ContactEmailTemplate } from "@/components/email-templates/contact-email-template";
import { ResetPasswordEmailTemplate } from "@/components/email-templates/reset-password-email-template";
import { WelcomeEmailTemplate } from "@/components/email-templates/welcome-email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendMail({from = "Acme <onboarding@resend.dev>", to = "delivered@resend.dev", subject, confirmationLink, type, text, name, Contactemail, message, resetLink}:{
  from?: string,
  to?: string,
  subject: string,
  template?: React.ReactElement<Record<string, string>> | null,
  confirmationLink?: string,
  type?: "confirm-email" | "reset-password" |"welcome" | "contact",
  text?: string,
  name?: string,
  Contactemail?: string,
  message?: string,
  resetLink?: string
}) {
  try {
    if(type === "confirm-email" && confirmationLink) {
      const email = await resend.emails.send({
        from,
        to,
        subject,
        react: ConfirmEmailEmailTemplate({confirmationLink}),
      })
      return email
    }
    if(type === "contact" && name && Contactemail && message) {
      const email = await resend.emails.send({
        from,
        to,
        subject,
        react: ContactEmailTemplate({name, Contactemail, message}),
      })
      return email
    }
    if(type === "reset-password" && resetLink) {
      const email = await resend.emails.send({
        from,
        to,
        subject,
        react: ResetPasswordEmailTemplate({resetLink}),
      })
      return email
    }
    if(type === "welcome") {
      const email = await resend.emails.send({
        from,
        to,
        subject,
        react: WelcomeEmailTemplate({}),
      })
      return email
    }

    if(!type && text) {
      const email = await resend.emails.send({
        from,
        to,
        subject,
        text 
      })
      return email
    }
  }
   catch (error) {
    console.error("Error sending email:", error);
    return error
  }
}
