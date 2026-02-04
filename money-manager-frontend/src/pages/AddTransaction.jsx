import React, { useState } from 'react';
import { 
  Box, Paper, Typography, ToggleButton, ToggleButtonGroup, 
  TextField, MenuItem, Button, Chip 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBack, TrendingUp, ArrowDownward } from '@mui/icons-material';
import API from '../api/axios';

const CATEGORIES = ["Food", "Salary", "Shopping", "Transportation", "Bills", "Entertainment", "Other"];

export default function AddTransaction() {
  const navigate = useNavigate();
  const [type, setType] = useState('EXPENSE');
  const [formData, setFormData] = useState({
    amount: '',
    category: 'Other',
    description: '',
    division: 'Personal',
    account: 'Cash'
  });

  // THEME COLORS
  const COLORS = {
    indigo: '#6366F1',
    emerald: '#10B981',
    rose: '#F43F5E',
    slate: '#1E293B'
  };

  const handleSave = async () => {
    try {
      await API.post('/transactions', { 
        ...formData, 
        type, 
        amount: Number(formData.amount) 
      });
      navigate('/dashboard');
    } catch (err) {
      console.error("Save Error:", err.response);
      alert(err.response?.data?.message || "Error saving transaction");
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* Back Link */}
      <Box 
        onClick={() => navigate(-1)}
        sx={{ 
          display: 'flex', alignItems: 'center', gap: 1, mb: 4, 
          cursor: 'pointer', color: COLORS.slate, '&:hover': { opacity: 0.7 } 
        }}
      >
        <ArrowBack fontSize="small" />
        <Typography variant="body1" fontWeight={700}>Back to Dashboard</Typography>
      </Box>
      
      <Paper sx={{ 
        p: { xs: 4, md: 8 }, 
        maxWidth: 600, 
        mx: 'auto',
        borderRadius: '100% 100% 100% 100% / 50% 50% 50% 50%',
        textAlign: 'center',
        boxShadow: '0 20px 70px rgba(0,0,0,0.06)',
        border: 'none',
        aspectRatio: { md: '1/1' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 1 }}>
          <Typography variant="h3" fontWeight={900} sx={{ textTransform: 'uppercase', color: COLORS.slate }}>
            New {type}
          </Typography>
          <Chip 
            label={type} 
            sx={{ 
              fontWeight: 900, 
              height: 32, 
              px: 1, 
              bgcolor: type === 'INCOME' ? COLORS.emerald : COLORS.rose,
              color: 'white'
            }}
          />
        </Box>
        
        <Typography variant="body1" color="text.secondary" fontWeight={600} mb={5}>
          Add your {type.toLowerCase()} details to keep track of your finances
        </Typography>
        
        <Box sx={{ maxWidth: 400, mx: 'auto', width: '100%' }}>
          {/* Type Toggle */}
          <ToggleButtonGroup 
            fullWidth 
            value={type} 
            exclusive 
            onChange={(e, v) => v && setType(v)} 
            sx={{ mb: 4, bgcolor: '#F1F5F9', borderRadius: 10, p: 0.5, border: 'none' }}
          >
            <ToggleButton 
              value="INCOME" 
              sx={{ 
                border: 'none', borderRadius: '8px !important', fontWeight: 800,
                '&.Mui-selected': { 
                  bgcolor: 'white !important', 
                  color: COLORS.emerald, 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)' 
                }
              }}
            >
              <TrendingUp sx={{ mr: 1 }} /> INCOME
            </ToggleButton>
            <ToggleButton 
              value="EXPENSE" 
              sx={{ 
                border: 'none', borderRadius: '8px !important', fontWeight: 800,
                '&.Mui-selected': { 
                  bgcolor: 'white !important', 
                  color: COLORS.rose, 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)' 
                }
              }}
            >
              <ArrowDownward sx={{ mr: 1 }} /> EXPENSE
            </ToggleButton>
          </ToggleButtonGroup>

          {/* Form Fields */}
          <TextField 
            fullWidth label="Amount" type="number" variant="outlined" sx={{ mb: 3 }}
            InputProps={{ 
              startAdornment: <Typography sx={{ mr: 1, fontWeight: 800, color: COLORS.indigo }}>₹</Typography>,
              sx: { borderRadius: 4, fontWeight: 700 }
            }}
            value={formData.amount}
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
          />
          
          <TextField 
            select fullWidth label="Category" variant="outlined" sx={{ mb: 3 }}
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            SelectProps={{ sx: { borderRadius: 4, textAlign: 'left', fontWeight: 600 } }}
          >
            {CATEGORIES.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
          </TextField>

          <TextField 
            fullWidth label="What's this about?" multiline rows={3} variant="outlined" sx={{ mb: 4 }}
            placeholder="Description..."
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            InputProps={{ sx: { borderRadius: 4, fontWeight: 500 } }}
          />

          {/* DYNAMIC ACTION BUTTON */}
          <Button 
            fullWidth variant="contained" size="large" onClick={handleSave} 
            disabled={!formData.amount}
            sx={{ 
              py: 2, borderRadius: 10, fontSize: '1.1rem', fontWeight: 900,
              bgcolor: type === 'INCOME' ? COLORS.emerald : COLORS.rose,
              color: 'white',
              '&:hover': { 
                bgcolor: type === 'INCOME' ? '#059669' : '#E11D48',
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.2s',
              boxShadow: type === 'INCOME' 
                ? '0 10px 25px rgba(16, 185, 129, 0.3)' 
                : '0 10px 25px rgba(244, 63, 94, 0.3)',
              textTransform: 'uppercase'
            }}
          >
            Save {type}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}