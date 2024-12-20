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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReservations = exports.createReservation = void 0;
const client_1 = require("@prisma/client");
const mailer_1 = require("../services/mailer");
const prisma = new client_1.PrismaClient();
const createReservation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone, date, time, desc } = req.body;
    try {
        // Validaciones básicas
        if (!name || !email || !phone || !date || !time || !desc) {
            res.status(400).json({
                success: false,
                message: "Todos los campos son obligatorios.",
            });
            return;
        }
        // Crear la reserva en la base de datos
        const reservation = yield prisma.service.create({
            data: {
                name,
                email,
                phone,
                date: new Date(date),
                time,
                desc,
            },
        });
        yield (0, mailer_1.sendConfirmationEmail)({ email, name, date, time, desc });
        // Respuesta exitosa
        res.status(201).json({
            success: true,
            message: "Reserva creada con éxito.",
            reservation,
        });
    }
    catch (error) {
        console.error("Error al crear la reserva o enviar el correo:", error);
        next(error);
    }
});
exports.createReservation = createReservation;
// Obtener todas las reservas
const getReservations = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reservations = yield prisma.service.findMany();
        res.status(200).json({ success: true, reservations });
    }
    catch (error) {
        console.error("Error al obtener reservas:", error);
        next(error);
    }
});
exports.getReservations = getReservations;
