// utils/mailer.ts
import nodemailer from "nodemailer";

interface ConfirmationEmailParams {
  email: string;
  name: string;
  date: string;
  time: string;
  desc: string;
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendConfirmationEmail = async ({
  email,
  name,
  date,
  time,
  desc,
}: ConfirmationEmailParams) => {
  try {
    await transporter.sendMail({
      from: '"STCOM" <tu.email@gmail.com>',
      to: email,
      subject: "Confirmación de tu solicitud",
      text: `Hola ${name}, hemos recibido tu solicitud de servicio.

Fecha: ${date}
Hora: ${time}
Descripción: ${desc}

Nos pondremos en contacto contigo pronto.`,

      html: `<p><strong>Hola ${name}</strong>, hemos recibido tu solicitud de servicio.</p>
              <p><strong>Fecha:</strong> ${date}</p>
              <p><strong>Hora:</strong> ${time}</p>
              <p><strong>Descripción:</strong> ${desc}</p>
              <p>Nos pondremos en contacto contigo pronto.</p>`,
    });
    console.log("Correo enviado exitosamente.");
  } catch (error) {
    console.error("Error al enviar el correo:", error);
  }
};
