import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleResponse = async (response: Response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  const convertCurrency = async (amount: number, from: string, to: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/convert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, from, to }),
      });
      const data = await handleResponse(response);
      setLoading(false);
      return data.result;
    } catch (err) {
      setLoading(false);
      setError('Error converting currency');
      throw err;
    }
  };

  const getConversionHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/conversions`);
      const data = await handleResponse(response);
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      setError('Error fetching conversion history');
      throw err;
    }
  };

  const getExchangeRate = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/exchange-rate`);
      const data = await handleResponse(response);
      setLoading(false);
      return data.rate;
    } catch (err) {
      setLoading(false);
      setError('Error fetching exchange rate');
      throw err;
    }
  };

  const updateExchangeRate = async (newRate: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/exchange-rate`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rate: newRate }),
      });
      const data = await handleResponse(response);
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      setError('Error updating exchange rate');
      throw err;
    }
  };

  return { convertCurrency, getConversionHistory, getExchangeRate, updateExchangeRate, loading, error };
};