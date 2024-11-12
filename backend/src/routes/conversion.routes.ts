import { Router } from "express";
import {
  convertCurrency,
  getConversions,
} from "../controllers/conversion.controllers";
import { validateJoi } from "../middlewares/validate.Joi.middleware";
import { convertCurrencyBody } from "../utils/joiSchema/conversion.schema";
import requestFrom from "../enum/requestFrom.enum";
import { validateJwt } from "../middlewares/validate.jwt.middleware";
import Roles from "../enum/roles.enum";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Conversion
 *     description: Endpoints para manejar las conversiones de divisas
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ExchangeRate:
 *       type: object
 *       properties:
 *         from:
 *           type: string
 *           description: Divisa de origen
 *           example: "USD"
 *         to:
 *           type: string
 *           description: Divisa de destino
 *           example: "EUR"
 *         amount:
 *           type: number
 *           description: Monto a convertir
 *           example: 125.50
 *         userId:
 *           type: string
 *           description: Identificador del usuario
 *           example: "1"
 *       required:
 *         - from
 *         - to
 *         - amount
 *         - userId
 */

/**
 * @swagger
 * /convert-currency-history/{userId}:
 *   get:
 *     summary: Obtener historial de conversiones por usuario
 *     tags:
 *       - Conversion
 *     description: Obtiene el historial de conversiones para un usuario específico.
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario para obtener el historial de conversiones.
 *     responses:
 *       200:
 *         description: Historial de conversiones obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Historial de conversiones"
 *                 result:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ExchangeRate'
 *       404:
 *         description: No se encontró el historial de conversiones
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "No se encontraron conversiones para este usuario"
 */
router.get(
  "/convert-currency-history/:userId",
  validateJwt(Roles.user),
  getConversions
);

/**
 * @swagger
 * /convert-currency:
 *   post:
 *     summary: Realizar conversión de divisas
 *     tags:
 *       - Conversion
 *     description: Permite realizar la conversión entre dos divisas.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExchangeRate'
 *     responses:
 *       200:
 *         description: Conversión realizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Conversión exitosa"
 *                 from:
 *                   type: string
 *                   example: "USD"
 *                 to:
 *                   type: string
 *                   example: "EUR"
 *                 amount:
 *                   type: number
 *                   example: 100
 *                 result:
 *                   type: number
 *                   example: 85.50
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-11-11T12:34:56Z"
 *       404:
 *         description: Una o ambas divisas no fueron encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Una o ambas divisas no fueron encontradas"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error interno del servidor"
 */
router.post(
  "/convert-currency",
  validateJwt(Roles.user),
  validateJoi(convertCurrencyBody, requestFrom.body),
  convertCurrency
);

export default router;