import React from 'react';
import { Container } from '@mui/material';
import { ConverterForm } from '../components/ConverterForm';
import { ConversionHistory } from '../components/ConversionHistory';

export const Home: React.FC = () => {
  return (
    <Container>
      <ConverterForm />
      <ConversionHistory />
    </Container>
  );
};