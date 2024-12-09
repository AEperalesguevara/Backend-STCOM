"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendConfirmationEmail = void 0;
// utils/mailer.ts
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
const sendConfirmationEmail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, name, date, time, desc, }) {
    try {
        yield transporter.sendMail({
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
    }
    catch (error) {
        console.error("Error al enviar el correo:", error);
    }
});
exports.sendConfirmationEmail = sendConfirmationEmail;
