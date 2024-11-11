import { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'; 

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { authenticate } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
        const response = await authenticate(username, password) as { token: string };
        if (response.token) {
        navigate('/');  // Redirigir a la página principal después del inicio de sesión exitoso
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error al iniciar sesión');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 5 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Iniciar sesión
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Usuario"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Contraseña"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <ErrorMessage message={error} />}
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Iniciar sesión
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
