import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useAuthContext } from '../../context/AuthContext';
import axios from 'axios';

const Logout = () => {
  const { logout } = useAuthContext(); // Para eliminar el estado de usuario local
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Llamar al endpoint de logout en el backend
      await axios.post('http://localhost:3000/api/auth/logout', {}, { withCredentials: true });

      // Eliminar el usuario en el frontend (limpiar contexto y/o almacenamiento local)
      logout();  // Esto elimina el estado de autenticación local
      navigate('/login');  // Redirigir al login después de cerrar sesión
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    }
  };

  return (
    <Button variant="contained" color="secondary" onClick={handleLogout}>
      Cerrar sesión
    </Button>
  );
};

export default Logout;
