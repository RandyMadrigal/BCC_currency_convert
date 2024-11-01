import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { theme } from './theme/theme';
import { Home } from './pages/Home';
import { Admin } from './pages/Admin';
import { Navigation } from './components/Navigation';
import { ConversionHistory } from './components/ConversionHistory';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navigation />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/history" element={<ConversionHistory />} /> 
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
