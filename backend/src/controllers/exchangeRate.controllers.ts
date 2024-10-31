import { Request, Response } from "express";
import exchangeRateSchema from "../model/exchangeRate.model";

//TODO: mover logica a sus respectivos servicios y repositorios.

// create new exchangeRate
export const createExchangeRate = async (req: Request, res: Response) => {
  const { name, value } = req.body;

  try {
    //exchangeRate name exist?
    const ExchangeRate = await exchangeRateSchema.findOne({
      name,
    });

    if (ExchangeRate) {
      res.status(409).json({ msg: "exchangeRate name is already in use" });
      return;
    }
    //TODO, manejar errores
    const newExchangeRate = { name, value };
    const create = await exchangeRateSchema.create(newExchangeRate);

    res.status(201).json({
      msg: "Exchange rate created successfully",
      exchangeRate: create,
    });
  } catch (err) {
    console.log(err);
  }
};

// get all exchangeRate
export const getExchangeRates = async (req: Request, res: Response) => {
  try {
    const exchangeRates = await exchangeRateSchema.find({});

    if (!exchangeRates) {
      res.status(404).json({ msg: "exchange rates not found" });
      return;
    }

    res.status(200).json({ msg: exchangeRates });
  } catch (err) {
    console.log(err);
  }
};

// get by id
export const getExchangeRateById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const exchangeRate = await exchangeRateSchema.findById(id);

    if (!exchangeRate) {
      res.status(404).json({ msg: "exchange rates not found" });
      return;
    }

    res.status(200).json({ msg: exchangeRate });
  } catch (err) {
    console.log(err);
  }
};

// update exchange rate
export const updateExchangeRate = async (req: Request, res: Response) => {
  const { name, value } = req.body;
  const { id } = req.params;

  try {
    const update = await exchangeRateSchema.findByIdAndUpdate(
      id,
      { name: name, value: value },
      { new: true, runValidators: true }
    );

    if (!update) {
      res.status(404).json({ msg: "can't update exchange rate" });
      return;
    }
    res.status(200).json({ msg: "updated", update: update });
  } catch (err) {
    console.log(err);
  }
};

// delete exchange rate
export const deleteExchangeRate = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleteExchange = await exchangeRateSchema.findByIdAndDelete(id);

    if (!deleteExchange) {
      res.status(404).json({ msg: "can't update exchange rate" });
      return;
    }
    res.status(200).json({ msg: "deleted", delete: deleteExchange });
  } catch (err) {
    console.log(err);
  }
};
