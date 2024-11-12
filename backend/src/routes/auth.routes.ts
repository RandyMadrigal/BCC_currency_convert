import { Router } from "express";
import { createUser, login, logout } from "../controllers/auth.controllers";
import { validateJoi } from "../middlewares/validate.Joi.middleware";
import { loginSchema, registerSchema } from "../utils/joiSchema/auth.schema";
import requestFrom from "../enum/requestFrom.enum";
import { validateJwt } from "../middlewares/validate.jwt.middleware";
import Roles from "../enum/roles.enum";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Autenticación
 *     description: Endpoints para manejar los usuarios de la aplicación y sus permisos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Register:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre completo del usuario
 *           example: "Miguel Jose Mata Ramos"
 *         username:
 *           type: string
 *           description: Nombre de usuario para acceder a la aplicación
 *           example: "mmata"
 *         email:
 *           type: string
 *           description: Correo electrónico del usuario
 *           example: "mmata@talenti.com.do"
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *           example: "P@$$w0rD"
 *       required:
 *         - name
 *         - username
 *         - email
 *         - password
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: Nombre de usuario para acceder a la aplicación
 *           example: "mmata"
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *           example: "P@$$w0rD"
 *       required:
 *         - username
 *         - password
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Register'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/Register'
 *       400:
 *         description: Error al crear el usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 */
router.post(
  "/register",
  validateJoi(registerSchema, requestFrom.body),
  createUser
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Inicia sesión de un usuario
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Inicio de sesión exitoso"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       example: "mmata"
 *                     email:
 *                       type: string
 *                       example: "mmata@talenti.com.do"
 *       401:
 *         description: Credenciales inválidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Credenciales inválidas"
 */
router.post("/login", validateJoi(loginSchema, requestFrom.body), login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Cierra la sesión de un usuario
 *     tags:
 *       - Autenticación
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cierre de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Sesión cerrada correctamente"
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No autorizado"
 */
router.post("/logout", validateJwt(Roles.user), logout);

export default router;
