"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = exports.createUser = void 0;
const userService = __importStar(require("../services/userService"));
// Crear usuario
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password, role, city, identityNo, phone, ruc, } = req.body;
    if (!firstName ||
        !lastName ||
        !email ||
        !password ||
        !role ||
        !city ||
        !identityNo ||
        !phone) {
        res.status(400).json({ message: "Faltan campos obligatorios" });
        return;
    }
    try {
        const newUser = yield userService.createUser({
            firstName,
            lastName,
            email,
            password,
            role,
            city,
            identityNo,
            phone,
            ruc,
        });
        res.status(201).json(newUser);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Error desconocido";
        res.status(500).json({ message: errorMessage });
    }
});
exports.createUser = createUser;
// Obtener todos los usuarios
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userService.getUsers();
        res.status(200).json(users);
    }
    catch (error) {
        const errorMessage = error instanceof Error
            ? error.message
            : "Error desconocido al crear el usuario";
        res.status(500).json({ message: errorMessage });
    }
});
exports.getUsers = getUsers;
// Obtener usuario por ID
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield userService.getUserById(parseInt(id));
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        const errorMessage = error instanceof Error
            ? error.message
            : "Error desconocido al crear el usuario";
        res.status(500).json({ message: errorMessage });
    }
});
exports.getUserById = getUserById;
// Actualizar usuario
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { firstName, lastName, email, password, role } = req.body;
    try {
        const updatedUser = yield userService.updateUser(parseInt(id), {
            firstName,
            lastName,
            email,
            password,
            role,
        });
        if (!updatedUser) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }
        res.status(200).json(updatedUser);
    }
    catch (error) {
        const errorMessage = error instanceof Error
            ? error.message
            : "Error desconocido al crear el usuario";
        res.status(500).json({ message: errorMessage });
    }
});
exports.updateUser = updateUser;
// Eliminar usuario
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedUser = yield userService.deleteUser(parseInt(id));
        if (!deletedUser) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }
        res.status(200).json({ message: "Usuario eliminado" });
    }
    catch (error) {
        const errorMessage = error instanceof Error
            ? error.message
            : "Error desconocido al crear el usuario";
        res.status(500).json({ message: errorMessage });
    }
});
exports.deleteUser = deleteUser;
