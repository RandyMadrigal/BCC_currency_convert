import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  CircularProgress,
  Alert
} from '@mui/material';
import { useApi } from '../hooks/useApi';

export const ExchangeRateManager = () => {
  const [dopToUsdRate, setDopToUsdRate] = useState<string>('');
  const [usdToDopRate, setUsdToDopRate] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { updateExchangeRate, loading } = useApi();

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const handleUpdateRates = async () => {
    setError(null);
    setSuccess(null);

    if (!dopToUsdRate || !usdToDopRate) {
      setError('Por favor complete ambas tasas de cambio');
      return;
    }

    const dopRate = parseFloat(dopToUsdRate);
    const usdRate = parseFloat(usdToDopRate);

    if (isNaN(dopRate) || isNaN(usdRate)) {
      setError('Las tasas deben ser números válidos');
      return;
    }

    if (dopRate <= 0 || usdRate <= 0) {
      setError('Las tasas deben ser mayores que 0');
      return;
    }

    try {
      await updateExchangeRate({
        DOP_USD: dopRate,
        USD_DOP: usdRate
      });
      setSuccess('Tasas de cambio actualizadas correctamente');
      setDopToUsdRate('');
      setUsdToDopRate('');
    } catch (error) {
      setError('Error al actualizar las tasas de cambio');
      console.error('Error updating rates:', error);
    }
  };

  return (
    <Box sx={{ 
      maxWidth: 500, 
      mx: 'auto', 
      p: 3, 
      borderRadius: 2,
      boxShadow: 3,
      bgcolor: 'background.paper'
    }}>
      <Typography variant="h5" gutterBottom align="center">
        Administrar Tasas de Cambio
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Tasa DOP a USD"
        value={dopToUsdRate}
        onChange={(e) => setDopToUsdRate(e.target.value)}
        type="number"
        margin="normal"
        helperText="1 DOP = X USD"
        InputProps={{
          inputProps: { min: 0, step: "0.0001" }
        }}
      />

      <TextField
        fullWidth
        label="Tasa USD a DOP"
        value={usdToDopRate}
        onChange={(e) => setUsdToDopRate(e.target.value)}
        type="number"
        margin="normal"
        helperText="1 USD = X DOP"
        InputProps={{
          inputProps: { min: 0, step: "0.01" }
        }}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleUpdateRates}
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          'Actualizar Tasas'
        )}
      </Button>
    </Box>
  );
};
