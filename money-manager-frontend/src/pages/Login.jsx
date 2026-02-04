import React, { useState } from 'react';
import { 
  Box, TextField, Button, Typography, Paper, IconButton, InputAdornment,
  Alert, CircularProgress, useTheme 
} from '@mui/material';
import { Visibility, VisibilityOff, AccountBalanceWallet } from '@mui/icons-material';
import API from '../api/axios';

export default function Login() {
  const theme = useTheme();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await API.post('/auth/login', formData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('userEmail', data.email);
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
    setLoading(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3, bgcolor: '#F8FAFC' }}>
      <Paper sx={{ 
        p: { xs: 4, md: 8 }, width: '100%', maxWidth: 550, borderRadius: '100% 100% 100% 100% / 50% 50% 50% 50%',
        textAlign: 'center', boxShadow: '0 20px 70px rgba(0,0,0,0.06)', position: 'relative', overflow: 'hidden'
      }}>
        {/* Header Indigo Section */}
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: '25%', bgcolor: theme.palette.primary.main }} />
        
        <Box sx={{ position: 'relative', mt: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ bgcolor: 'white', p: 2, borderRadius: '50%', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', mb: 2 }}>
            <AccountBalanceWallet sx={{ fontSize: 40, color: theme.palette.primary.main }} />
          </Box>
          
          <Typography variant="h3" fontWeight={900} letterSpacing={-1}>Money Manager</Typography>
          <Typography variant="body1" color="text.secondary" fontWeight={600} mb={4}>Sign in to your account</Typography>

          {error && <Alert severity="error" sx={{ mb: 3, width: '100%', borderRadius: 3 }}>{error}</Alert>}

          <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 350 }}>
            <TextField 
              fullWidth label="Email" margin="normal" variant="outlined"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <TextField 
              fullWidth label="Password" type={showPassword ? 'text' : 'password'} margin="normal"
              sx={{ mb: 4, '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Button 
              fullWidth variant="contained" size="large" type="submit" disabled={loading}
              sx={{ py: 2, borderRadius: 10, fontWeight: 900, fontSize: '1.1rem' }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
            </Button>
          </form>

          <Button href="/register" sx={{ mt: 3, fontWeight: 700, textTransform: 'none', color: theme.palette.primary.main }}>
            Create New Account
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}