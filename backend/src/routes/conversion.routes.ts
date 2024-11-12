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
 *     description: Endpoints para manejar las Conversiones
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
 *           description: Moneda Origen
 *           example: "USD/EUR"
 *         to:
 *           type: string
 *           description: Moneda Destino
 *           example: "USD/EUR"
 *         amount:
 *           type: decimal
 *           description: Monto a Convertir
 *           example: "125.50"
 *         userId:
 *           type: number
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
*  get:
*   summary: "Obtener historial de conversiones por usuario"
*   tags:
*     - Conversion     
*   description: "Este endpoint permite obtener el historial de conversiones de un usuario específico."
*   parameters:
*     - name: "userId"
*       in: "path"
*       required: true
*       type: "string"
*       description: "ID del usuario para el que se desea obtener el historial de conversiones."
*   responses:
*     200:
*       description: "Historial de conversiones obtenido exitosamente."
*       schema:
*         type: "object"
*         properties:
*           msg:
*             type: "string"
*             example: "History"
*           result:
*             type: "array"
*             items:
*               type: "object"
*               properties:
*                 amount:
*                   type: "number"
*                 from:
*                   type: "string"
*                 to:
*                   type: "string"
*                 result:
*                   type: "number"
*                 userId:
*                   type: "string"
*                 created_at:
*                   type: "string"
*                   format: "date-time"
*     404:
*       description: "No se encontró el historial de conversiones."
*       schema:
*         type: "object"
*         properties:
*           msg:
*             type: "string"
*             example: "No conversions found for this user."
*/
router.get(
  "/convert-currency-history/:userId",
  validateJwt(Roles.user),
  getConversions
); //obtener historial de conversiones por usuario

/** 
* @swagger
* /convert-currency:
*   post:
*     summary: "Realizar conversión de divisas"
*     tags:
*       - Conversion     
*     description: "Este endpoint permite realizar la conversión entre dos divisas."
*     parameters:
*       - name: "body"
*         in: "body"
*         required: true
*         schema:
*           type: "object"
*           properties:
*             from:
*               type: "string"
*               description: "Divisa de origen."
*               example: "USD"
*             to:
*               type: "string"
*               description: "Divisa de destino."
*               example: "EUR"
*             amount:
*               type: "number"
*               description: "Monto a convertir."
*               example: 100
*             userId:
*               type: "string"
*               description: "ID del usuario que realiza la conversión."
*               example: "12345"
*     responses:
*       200:
*         description: "Conversión realizada exitosamente."
*         schema:
*           type: "object"
*           properties:
*             msg:
*               type: "string"
*               example: "Conversion successful"
*             from:
*               type: "string"
*             to:
*               type: "string"
*             amount:
*               type: "number"
*             result:
*               type: "string"
*             created_at:
*               type: "string"
*               format: "date-time"
*       404:
*         description: "Una o ambas divisas no fueron encontradas."
*         schema:
*           type: "object"
*           properties:
*             msg:
*               type: "string"
*               example: "One or both currencies not found"
*       500:
*         description: "Error interno del servidor."
*         schema:
*           type: "object"
*           properties:
*             msg:
*               type: "string"
*               example: "Internal server error"
*/
router.post(
  "/convert-currency",
  validateJwt(Roles.user),
  validateJoi(convertCurrencyBody, requestFrom.body),
  convertCurrency
); //realizar conversion

export default router;