import { Router } from "express";
import {
  getExchangeRates,
  getExchangeRateById,
  updateExchangeRate,
  deleteExchangeRate,
  createExchangeRate,
} from "../controllers/exchangeRate.controllers";
import requestFrom from "../enum/requestFrom.enum";
import { exchangeBodySchema } from "../utils/joiSchema/exchangeRate.schema";
import { validateJoi } from "../middlewares/validate.Joi.middleware";
import { validateJwt } from "../middlewares/validate.jwt.middleware";
import Roles from "../enum/roles.enum";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Exchange Rates
 *     description: Endpoints para manejar los tipos de cambio
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ExchangeRate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del tipo de cambio
 *           example: "USD/EUR"
 *         value:
 *           type: number
 *           description: Valor del tipo de cambio
 *           example: 1.10
 *       required:
 *         - name
 *         - value
 */

/**
 * @swagger
 * /exchange-rate:
 *   get:
 *     summary: Obtiene todos los tipos de cambio
 *     tags: [Exchange Rates]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tipos de cambio
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ExchangeRate'
 *       404:
 *         description: Tipos de cambio no encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "exchange rates not found"
 */
router.get("/exchange-rate", validateJwt(Roles.admin), getExchangeRates);

/**
 * @swagger
 * /exchange-rate/{id}:
 *   get:
 *     summary: Obtiene un tipo de cambio por ID
 *     tags: [Exchange Rates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del tipo de cambio
 *     responses:
 *       200:
 *         description: Tipo de cambio encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExchangeRate'
 *       404:
 *         description: Tipo de cambio no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "exchange rates not found"
 */
router.get("/exchange-rate/:id", validateJwt(Roles.admin), getExchangeRateById);

/**
 * @swagger
 * /exchange-rate:
 *   post:
 *     summary: Crea un nuevo tipo de cambio
 *     tags: [Exchange Rates]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExchangeRate'
 *     responses:
 *       201:
 *         description: Tipo de cambio creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Exchange rate created successfully"
 *                 exchangeRate:
 *                   $ref: '#/components/schemas/ExchangeRate'
 *       400:
 *         description: No se pudo crear el tipo de cambio
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "exchange not created"
 */
router.post(
  "/exchange-rate",
  validateJwt(Roles.admin),
  validateJoi(exchangeBodySchema, requestFrom.body),
  createExchangeRate
);

/**
 * @swagger
 * /exchange-rate/{id}:
 *   put:
 *     summary: Actualiza un tipo de cambio por ID
 *     tags: [Exchange Rates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del tipo de cambio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExchangeRate'
 *     responses:
 *       200:
 *         description: Tipo de cambio actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "updated"
 *                 update:
 *                   $ref: '#/components/schemas/ExchangeRate'
 *       404:
 *         description: No se pudo actualizar el tipo de cambio
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "can't update exchange rate"
 */
router.put(
  "/exchange-rate/:id",
  validateJwt(Roles.admin),
  validateJoi(exchangeBodySchema, requestFrom.body),
  updateExchangeRate
);

/**
 * @swagger
 * /exchange-rate/{id}:
 *   delete:
 *     summary: Elimina un tipo de cambio por ID
 *     tags: [Exchange Rates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del tipo de cambio
 *     responses:
 *       200:
 *         description: Tipo de cambio eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "deleted"
 *                 delete:
 *                   $ref: '#/components/schemas/ExchangeRate'
 *       404:
 *         description: No se pudo eliminar el tipo de cambio
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "can't delete exchange rate"
 */
router.delete(
  "/exchange-rate/:id",
  validateJwt(Roles.admin),
  deleteExchangeRate
);

export default router;
