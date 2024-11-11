import exchangeRateModel from "../model/exchangeRate.model";
import exchange_Default from "../enum/initExchangeRate.enum";

export const initExchange = async () => {
  try {
    const init = [
      {
        name: exchange_Default.USD || "name" /*exchangeRate name*/,
        value: exchange_Default.USD_VALUE || 50.5 /*exchangeRate value*/,
      },
      {
        name: exchange_Default.EUR || "name" /*exchangeRate name*/,
        value: exchange_Default.EUR_VALUE || 50.5 /*exchangeRate value*/,
      },
      {
        name: exchange_Default.DOP || "name" /*exchangeRate name*/,
        value: exchange_Default.DOP_VALUE || 50.5 /*exchangeRate value*/,
      },
    ];

    // Check if records already exist
    const existingRates = await exchangeRateModel.find({});

    if (existingRates.length === 0) {
      const create = await exchangeRateModel.insertMany(init);
      console.log(">>> Initial exchange rates created");
    } else {
      console.log(">>> Exchange rates already initialized.");
    }
  } catch (err) {
    console.error(">>> Error creating initial records:", err);
  }
};
