export interface Conversion {
  _id: string;
  date: string;
  originalAmount: number;
  fromCurrency: string;
  convertedAmount: number;
  toCurrency: string;
}

export interface ExchangeRate {
  _id: string;
  rate: number;
  lastUpdated: string;
}