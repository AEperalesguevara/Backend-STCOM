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
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prismaClient_1 = __importDefault(require("../prisma/prismaClient")); // Ajusta según tu configuración de Prisma
const SECRET_KEY = "random#secret"; // Usa una variable de entorno en producción
// Registro
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { firstName, lastName, email, password, role, city, identityNo, phone, ruc, } = req.body;
    if (!firstName ||
        !lastName ||
        !email ||
        !password ||
        !role ||
        !city ||
        !identityNo ||
        !phone) {
        res
            .status(400)
            .json({ success: false, message: "Faltan campos obligatorios." });
        return;
    }
    try {
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = yield prismaClient_1.default.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                role,
                city,
                identityNo,
                phone,
                ruc,
            },
        });
        res.status(201).json({
            success: true,
            message: "Usuario registrado con éxito.",
            user: newUser,
        });
    }
    catch (error) {
        // Type assertion para tratar el error como `any`
        console.error("Error al registrar el usuario:", error);
        if (error.code === "P2002") {
            const targetField = (_b = (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target) === null || _b === void 0 ? void 0 : _b[0];
            res.status(400).json({
                success: false,
                message: `${targetField} ya está registrado.`,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: "Error interno del servidor.",
            });
        }
    }
});
exports.registerUser = registerUser;
// Login
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ success: false, message: "Datos incompletos." });
        return;
    }
    try {
        const user = yield prismaClient_1.default.user.findUnique({ where: { email } });
        if (!user) {
            res
                .status(404)
                .json({ success: false, message: "Usuario no encontrado." });
            return;
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res
                .status(401)
                .json({ success: false, message: "Contraseña incorrecta." });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, SECRET_KEY, {
            expiresIn: "1h",
        });
        // Envía el token y el objeto completo del usuario en la respuesta
        res.status(200).json({
            success: true,
            token,
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                city: user.city,
                identityNo: user.identityNo,
                phone: user.phone,
                ruc: user.ruc,
            },
        });
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ success: false, message: "Error interno del servidor." });
    }
});
exports.loginUser = loginUser;
