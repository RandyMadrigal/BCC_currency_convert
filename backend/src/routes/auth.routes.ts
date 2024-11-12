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
 *     description: Endpoints para manejar los ususarios de la aplicacion y sus permisos
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
 *           description: Nombre Completo del Usuario
 *           example: "Miguel Jose Mata Ramos"
 *         username:
 *           type: string
 *           description: Nombre de usuario de acceso para la aplicacion
 *           example: "mmata"
 *         email:
 *           type: string
 *           description: Correo Electronico del usuario
 *           example: "mmata@talenti.com.do"
 *         password:
 *           type: string
 *           description: Clave/Contraseña del usuario
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
 *           description: Nombre de usuario de acceso para la aplicacion
 *           example: "mmata"
 *         password:
 *           type: string
 *           description: Clave/Contraseña del usuario
 *           example: "P@$$w0rD"
 *       required:
 *         - username
 *         - password
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
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
 *                items:
 *                  $ref: '#/components/schemas/Register' 
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
 * /login:
 *   post:
 *     summary: Inicia sesión de un usuario
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
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
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *               items:
 *                $ref: '#/components/schemas/Login'
 *       401:
 *         description: Credenciales inválidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 */
router.post("/login", validateJoi(loginSchema, requestFrom.body), login);

/**
 * @swagger
 * /logout:
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
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 */
router.post("/logout", validateJwt(Roles.user), logout);

export default router;
