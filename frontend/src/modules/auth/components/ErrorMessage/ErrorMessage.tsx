import { Typography } from '@mui/material';
import { ErrorMessageProps } from '../../types/errorMessageTypes';

const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <Typography color="error">{message}</Typography>
);

export default ErrorMessage;
