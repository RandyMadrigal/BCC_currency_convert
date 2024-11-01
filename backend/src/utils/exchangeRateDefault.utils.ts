import exchangeRateModel from "../model/exchangeRate.model";
import "dotenv/config";

export const initExchange = async () => {
  try {
    const init = [
      {
        name: "USD",
        value: process.env.USD_VALUE || 50.5 /*exchangeRate value*/,
      },
      {
        name: "EUR",
        value: process.env.EUR_VALUE || 50.5 /*exchangeRate value*/,
      },
      {
        name: "DOP",
        value: process.env.DOP_VALUE || 50.5 /*exchangeRate value*/,
      },
    ];

    // Check if records already exist
    const existingRates = await exchangeRateModel.find({});

    if (existingRates.length === 0) {
      const create = await exchangeRateModel.insertMany(init);
      console.log(">>> Initial exchange rates created:", create);
    } else {
      console.log(">>> Exchange rates already initialized.");
    }
  } catch (err) {
    console.error(">>> Error creating initial records:", err);
  }
};
