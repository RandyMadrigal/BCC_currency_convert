import React, { useState, useEffect, useCallback } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useApi } from '../hooks/useApi';

export const ExchangeRateManager: React.FC = () => {
  const [rate, setRate] = useState<string>('');
  const { getExchangeRate, updateExchangeRate, loading, error } = useApi();

  const fetchRate = useCallback(async () => {
    try {
      const currentRate = await getExchangeRate();
      setRate(currentRate.toString());
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
    }
  }, [getExchangeRate]);

  useEffect(() => {
    fetchRate();
  }, [fetchRate]);

  const handleUpdateRate = async () => {
    try {
      const newRate = parseFloat(rate);
      if (isNaN(newRate)) {
        alert('Por favor, ingrese un número válido');
        return;
      }
      await updateExchangeRate(newRate);
      alert('Tasa de cambio actualizada con éxito');
    } catch (error) {
      console.error('Error updating exchange rate:', error);
      alert('Error al actualizar la tasa de cambio');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Administrar Tasa de Cambio
      </Typography>
      <TextField
        fullWidth
        label="Tasa de Cambio (DOP a USD)"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
        type="number"
        margin="normal"
      />
      <Button 
        variant="contained" 
        color="primary" 
        fullWidth 
        onClick={handleUpdateRate}
        disabled={loading}
      >
        {loading ? 'Actualizando...' : 'Actualizar Tasa'}
      </Button>
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};