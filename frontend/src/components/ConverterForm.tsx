import React, { useState } from 'react';
import { TextField, Select, MenuItem, Button, Box, Typography } from '@mui/material';
import { useApi } from '../hooks/useApi';

export const ConverterForm: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [fromCurrency, setFromCurrency] = useState<string>('DOP');
  const [toCurrency, setToCurrency] = useState<string>('USD');
  const [result, setResult] = useState<number | null>(null);

  const { convertCurrency } = useApi();

  const handleConvert = async () => {
    try {
      const conversionResult = await convertCurrency(parseFloat(amount), fromCurrency, toCurrency);
      setResult(conversionResult);
    } catch (error) {
      console.error('Fallo durante la conversión:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Convertidor de Moneda
      </Typography>
      <TextField
        fullWidth
        label="Monto"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        type="number"
        margin="normal"
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
        <Select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value as string)}
          sx={{ width: '48%' }}
        >
          <MenuItem value="DOP">DOP</MenuItem>
          <MenuItem value="USD">USD</MenuItem>
        </Select>
        <Select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value as string)}
          sx={{ width: '48%' }}
        >
          <MenuItem value="USD">USD</MenuItem>
          <MenuItem value="DOP">DOP</MenuItem>
        </Select>
      </Box>
      <Button variant="contained" color="primary" fullWidth onClick={handleConvert}>
        Hacer Cambio
      </Button>
      {result !== null && (
        <Typography variant="h6" sx={{ mt: 2 }}>
          Resultado: {result.toFixed(2)} {toCurrency}
        </Typography>
      )}
    </Box>
  );
};