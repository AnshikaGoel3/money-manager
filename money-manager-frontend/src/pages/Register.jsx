import React, { useState } from 'react';
import { 
  Box, TextField, Button, Typography, Paper, Alert, CircularProgress, useTheme, Link 
} from '@mui/material';
import { AccountBalanceWallet } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

export default function Register() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      await API.post('/auth/register', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
    setLoading(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3, bgcolor: '#F8FAFC' }}>
      <Paper sx={{ 
        p: { xs: 4, md: 8 }, width: '100%', maxWidth: 550, borderRadius: '100% 100% 100% 100% / 50% 50% 50% 50%',
        textAlign: 'center', boxShadow: '0 20px 70px rgba(0,0,0,0.06)', position: 'relative', overflow: 'hidden'
      }}>
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: '25%', bgcolor: theme.palette.primary.main }} />
        
        <Box sx={{ position: 'relative', mt: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ bgcolor: 'white', p: 2, borderRadius: '50%', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', mb: 2 }}>
            <AccountBalanceWallet sx={{ fontSize: 40, color: theme.palette.primary.main }} />
          </Box>
          
          <Typography variant="h3" fontWeight={900} letterSpacing={-1}>Join Money Manager</Typography>
          <Typography variant="body1" color="text.secondary" fontWeight={600} mb={4}>Create your free account</Typography>

          {error && <Alert severity="error" sx={{ mb: 3, width: '100%', borderRadius: 3 }}>{error}</Alert>}

          <form onSubmit={handleRegister} style={{ width: '100%', maxWidth: 350 }}>
            <TextField 
              fullWidth label="Email" margin="normal" variant="outlined"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <TextField 
              fullWidth label="Password" type="password" margin="normal"
              sx={{ mb: 4, '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            <Button 
              fullWidth variant="contained" size="large" type="submit" disabled={loading}
              sx={{ py: 2, borderRadius: 10, fontWeight: 900, fontSize: '1.1rem' }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
            </Button>
          </form>

          <Typography mt={3} fontWeight={600}>
            Already have an account? <Link href="/login" sx={{ color: theme.palette.primary.main, textDecoration: 'none', fontWeight: 800 }}>Sign In</Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}