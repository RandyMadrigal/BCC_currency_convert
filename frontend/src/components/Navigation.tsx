import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const Navigation = () => {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Conversor de Moneda
        </Typography>
        <Box>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/"
          >
            Inicio
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/admin"
          >
            Admin
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/history"
          >
            Historial
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};