import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

interface ExchangeRates {
  DOP_USD: number;
  USD_DOP: number;
}

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Limpia el error automáticamente después de 3 segundos cuando se establece
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const convertCurrency = async (amount: number, from: string, to: string) => {
    setLoading(true);
    setError(null);
    
    const defaultRates = {
      'DOP-USD': 0.0175,
      'USD-DOP': 59.14,
    };

    try {
      const response = await fetch(`${API_URL}/convert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, from, to }),
      });

      if (!response.ok) {
        const rate = from === 'DOP' ? defaultRates['DOP-USD'] : defaultRates['USD-DOP'];
        const result = amount * rate;
        setLoading(false);
        return result;
      }

      const data = await response.json();
      setLoading(false);
      return data.result;
    } catch (error) {
      console.error('Error in conversion:', error);
      const rate = from === 'DOP' ? defaultRates['DOP-USD'] : defaultRates['USD-DOP'];
      const result = amount * rate;
      setLoading(false);
      return result;
    }
  };

  const getConversionHistory = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/conversions`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setLoading(false);
      return data;
    } catch (err) {
      console.error('Error fetching conversion history:', err);
      setError('Error fetching conversion history');
      setLoading(false);
      return []; // Devuelve un array vacío si hay error
    }
  };
  
  const updateExchangeRate = async (rates: ExchangeRates) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_URL}/exchange-rate`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rates),
      });

      if (!response.ok) {
        throw new Error('Failed to update exchange rates');
      }

      const data = await response.json();
      setLoading(false);
      return data;
    } catch (error) {
      console.error('Error updating exchange rates:', error);
      setError('Failed to update exchange rates');
      setLoading(false);
      throw error;
    }
  };

  return { 
    convertCurrency, 
    getConversionHistory,
    updateExchangeRate,
    loading, 
    error 
  };
};
