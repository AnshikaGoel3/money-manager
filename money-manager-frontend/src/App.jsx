// src/App.js
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { theme } from './theme';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import AddTransaction from './pages/AddTransaction';
import Categories from './pages/Categories';
import Sidebar from './components/Sidebar';

const ProtectedRoute = ({ children }) => {
  return localStorage.getItem('token') ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={
            <ProtectedRoute>
              <Box display="flex">
                <Sidebar />
                <Box component="main" sx={{ flexGrow: 1, height: '100vh', overflow: 'auto' }}>
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="/add-transaction" element={<AddTransaction />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="*" element={<Navigate to="/dashboard" />} />
                  </Routes>
                </Box>
              </Box>
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}