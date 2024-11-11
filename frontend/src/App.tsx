import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Container } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { theme } from "./shared/theme/theme";
import HomePage from "./pages/HomePage/HomePage";
import { Admin } from "./pages/AdminPage/Admin";
import { Navigation } from "./shared/components/Navigation/Navigation";
import LoginPage from "./pages/LoginPage/LoginPage";
import { AuthProvider } from "./modules/auth/context/AuthContext"; // Importa el proveedor de autenticación
import ProtectedRoute from "./shared/components/ProtectedRoute/ProtectedRoute"; // Importa el componente de ruta protegida
 
function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Navigation />
          <Container>
            <Routes>
              {/* Ruta para login, no protegida */}
              <Route path="/login" element={<LoginPage />} />

              {/* Rutas protegidas */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Container>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
