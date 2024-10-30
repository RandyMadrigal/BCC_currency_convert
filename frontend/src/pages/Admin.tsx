import React from 'react';
import { Container } from '@mui/material';
import { ExchangeRateManager } from '../components/ExchangeRateManager';

export const Admin: React.FC = () => {
  return (
    <Container>
      <ExchangeRateManager />
    </Container>
  );
};