import { Request, Response } from "express";
import * as exchangeService from "../services/exchangeRate.services";
import IEXCHANGERATE from "../interfaces/exchangeRate.interface";

//TODO: mover logica a sus respectivos servicios y repositorios.

// create new exchangeRate
export const createExchangeRate = async (req: Request, res: Response) => {
  const { name, value } = req.body;

  try {
    const create = await exchangeService.createExchange({
      name,
      value,
    } as IEXCHANGERATE);

    if (create) {
      res.status(201).json({
        msg: "Exchange rate created successfully",
        exchangeRate: create,
      });
      return;
    }

    res.status(400).json({ msg: "exchange not created" });
  } catch (err) {
    if (err instanceof Error) {
      res.status(409).json({ msg: err.message });
      return;
    }
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// get all exchangeRate
export const getExchangeRates = async (req: Request, res: Response) => {
  try {
    const exchangeRates = await exchangeService.getRates();

    if (!exchangeRates) {
      res.status(404).json({ msg: "exchange rates not found" });
      return;
    }

    res.status(200).json({ msg: exchangeRates });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "server error" });
  }
};

// get by id
export const getExchangeRateById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const exchangeRate = await exchangeService.getRateById(id);

    if (!exchangeRate) {
      res.status(404).json({ msg: "exchange rates not found" });
      return;
    }

    res.status(200).json({ msg: exchangeRate });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "server error" });
  }
};

// update exchange rate
export const updateExchangeRate = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, value } = req.body;

  try {
    const update = await exchangeService.updateRate(
      { name, value } as IEXCHANGERATE,
      id
    );

    if (!update) {
      res.status(404).json({ msg: "can't update exchange rate" });
      return;
    }
    res.status(200).json({ msg: "updated", update: update });
    return;
  } catch (err) {
    res.status(500).json({ msg: "server error" });
  }
};

// delete exchange rate
export const deleteExchangeRate = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleteExchange = await exchangeService.deleteRate(id);

    if (!deleteExchange) {
      res.status(404).json({ msg: "can't delete exchange rate" });
      return;
    }
    res.status(200).json({ msg: "deleted", delete: deleteExchange });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "server error" });
  }
};
