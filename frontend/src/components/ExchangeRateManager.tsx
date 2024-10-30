import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useApi } from '../hooks/useApi';

export const ExchangeRateManager: React.FC = () => {
  const [rate, setRate] = useState<string>('');
  const { getExchangeRate, updateExchangeRate } = useApi();

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const currentRate = await getExchangeRate();
        setRate(currentRate.toString());
      } catch (error) {
        console.error('Error al obtener tipo de cambio:', error);
      }
    };
    fetchRate();
  }, [getExchangeRate]);

  const handleUpdateRate = async () => {
    try {
      await updateExchangeRate(parseFloat(rate));
      alert('Tasa de cambio actualizada con éxito');
    } catch (error) {
      console.error('Error actualizando tasa de cambio:', error);
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
      <Button variant="contained" color="primary" fullWidth onClick={handleUpdateRate}>
        Actualizar Tasa
      </Button>
    </Box>
  );
};