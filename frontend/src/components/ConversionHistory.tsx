import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { useApi } from '../hooks/useApi';
import { Conversion } from '../types';

export const ConversionHistory: React.FC = () => {
  const [history, setHistory] = useState<Conversion[]>([]);
  const { getConversionHistory } = useApi();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getConversionHistory();
        setHistory(data);
      } catch (error) {
        console.error('Error al recuperar el historial:', error);
      }
    };
    fetchHistory();
  }, [getConversionHistory]);

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ p: 2 }}>
        Historial de Conversiones
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Monto Original</TableCell>
            <TableCell>Moneda Origen</TableCell>
            <TableCell>Monto Convertido</TableCell>
            <TableCell>Moneda Destino</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.map((conversion) => (
            <TableRow key={conversion._id}>
              <TableCell>{new Date(conversion.date).toLocaleString()}</TableCell>
              <TableCell>{conversion.originalAmount}</TableCell>
              <TableCell>{conversion.fromCurrency}</TableCell>
              <TableCell>{conversion.convertedAmount}</TableCell>
              <TableCell>{conversion.toCurrency}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};