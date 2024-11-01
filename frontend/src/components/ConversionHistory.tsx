import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { useApi } from '../hooks/useApi';
import { Conversion } from '../types';

export const ConversionHistory: React.FC = () => {
  const [history, setHistory] = useState<Conversion[]>([
    // Datos de prueba (elimina esto si los datos de la API funcionan)
    {
      _id: '1',
      date: new Date().toISOString(),
      originalAmount: 100,
      fromCurrency: 'USD',
      convertedAmount: 5700,
      toCurrency: 'DOP'
    },
    {
      _id: '2',
      date: new Date().toISOString(),
      originalAmount: 200,
      fromCurrency: 'DOP',
      convertedAmount: 3.5,
      toCurrency: 'USD'
    }
  ]);

  const { getConversionHistory } = useApi();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getConversionHistory();
        if (data && Array.isArray(data)) {
          setHistory(data);
        } else {
          console.error('Los datos recibidos no tienen el formato esperado');
        }
      } catch (error) {
        console.error('Error al recuperar el historial:', error);
      }
    };
    fetchHistory();
  }, [getConversionHistory]); //ojo aqui, no se si esta bien implementado

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
