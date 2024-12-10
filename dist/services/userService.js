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
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = exports.createUser = void 0;
// src/services/userService.ts
const prismaClient_1 = __importDefault(require("../prisma/prismaClient")); // Asumiendo que tienes tu cliente Prisma configurado
// Crear usuario
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    return prismaClient_1.default.user.create({
        data: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            password: userData.password,
            role: userData.role,
            city: userData.city,
            identityNo: userData.identityNo,
            phone: userData.phone,
            ruc: userData.ruc, // Este es opcional
        },
    });
});
exports.createUser = createUser;
// Obtener todos los usuarios
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaClient_1.default.user.findMany();
});
exports.getUsers = getUsers;
// Obtener un usuario por ID
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaClient_1.default.user.findUnique({
        where: { id },
    });
});
exports.getUserById = getUserById;
// Actualizar usuario
const updateUser = (id, userData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaClient_1.default.user.update({
        where: { id },
        data: userData,
    });
});
exports.updateUser = updateUser;
// Eliminar usuario
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaClient_1.default.user.delete({
        where: { id },
    });
});
exports.deleteUser = deleteUser;
