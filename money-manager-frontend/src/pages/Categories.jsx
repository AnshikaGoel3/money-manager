// src/pages/AddTransaction.jsx
import React, { useState } from 'react';
import { Box, Paper, Typography, ToggleButton, ToggleButtonGroup, TextField, MenuItem, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const CATEGORIES = ["Food", "Salary", "Shopping", "Transportation", "Bills", "Entertainment", "Other"];

export default function AddTransaction() {
  const navigate = useNavigate();
  const [type, setType] = useState('EXPENSE');
  const [formData, setFormData] = useState({
    amount: '',
    category: 'Other',
    description: '',
    division: 'Personal', // Added to match your DTO
    account: 'Cash'       // Added to match your DTO
  });

  const handleSave = async () => {
    try {
      // POST to /transactions (matches your @RequestMapping("/transactions"))
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
    <Box p={4} display="flex" justifyContent="center">
      <Paper sx={{ p: 4, width: '100%', maxWidth: 500, borderRadius: 4 }}>
        <Typography variant="h5" fontWeight="bold" mb={3}>Add Transaction</Typography>
        
        <ToggleButtonGroup fullWidth value={type} exclusive onChange={(e, v) => v && setType(v)} sx={{ mb: 3 }}>
          <ToggleButton value="INCOME" sx={{ "&.Mui-selected": { bgcolor: '#2D9C8E', color: 'white' } }}>Income</ToggleButton>
          <ToggleButton value="EXPENSE" sx={{ "&.Mui-selected": { bgcolor: '#f44336', color: 'white' } }}>Expense</ToggleButton>
        </ToggleButtonGroup>

        <TextField fullWidth label="Amount" type="number" margin="normal" 
          onChange={(e) => setFormData({...formData, amount: e.target.value})} />
        
        <TextField select fullWidth label="Category" margin="normal" value={formData.category}
          onChange={(e) => setFormData({...formData, category: e.target.value})}>
          {CATEGORIES.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
        </TextField>

        <TextField fullWidth label="Description" margin="normal" multiline rows={2}
          onChange={(e) => setFormData({...formData, description: e.target.value})} />

        <Button fullWidth variant="contained" size="large" onClick={handleSave} 
          sx={{ mt: 3, py: 1.5, bgcolor: type === 'INCOME' ? '#2D9C8E' : '#f44336' }}>
          Add {type}
        </Button>
      </Paper>
    </Box>
  );
}