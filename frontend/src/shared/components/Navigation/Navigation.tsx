import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useAuthContext } from "../../../modules/auth/context/AuthContext";
import Logout from "../../../modules/auth/components/Logout/Logout";

export const Navigation = () => {
  const { token } = useAuthContext(); // Obtener el token del contexto para verificar autenticación

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Conversor de Moneda
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/">
            Home
          </Button>
          {!!token ? ( // Si el usuario está autenticado (token presente)
            <>
              <Button color="inherit" component={RouterLink} to="/admin">
                Admin
              </Button>
              <Logout /> {/* Mostrar el componente Logout */}
            </>
          ) : (
            <Button color="inherit" component={RouterLink} to="/login">
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
