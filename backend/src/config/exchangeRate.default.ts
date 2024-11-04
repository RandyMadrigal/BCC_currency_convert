import exchangeRateModel from "../model/exchangeRate.model";
import exchange_Default from "../enum/initExchangeRate.enum";

export const initExchange = async () => {
  try {
    const init = [
      {
        name: exchange_Default.USD,
        value: exchange_Default.USD_VALUE || 50.5 /*exchangeRate value*/,
      },
      {
        name: exchange_Default.EUR,
        value: exchange_Default.EUR_VALUE || 50.5 /*exchangeRate value*/,
      },
      {
        name: exchange_Default.DOP,
        value: exchange_Default.DOP_VALUE || 50.5 /*exchangeRate value*/,
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
