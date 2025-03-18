import nodemailer from 'nodemailer';

const SMTP_SERVER_USERNAME = process.env.SMTP_SERVER_USERNAME;
const SMTP_SERVER_PASSWORD = process.env.SMTP_SERVER_PASSWORD;

const transport = () => {
    return nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: SMTP_SERVER_USERNAME,
    pass: SMTP_SERVER_PASSWORD,
  },
});
}

declare const globalThis: {
    transportGlobal: ReturnType<typeof transport>;
} & typeof global

const transporter = globalThis.transportGlobal ?? transport();

export default transporter;

if (process.env.NODE_ENV !== 'production') globalThis.transportGlobal = transporter