import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Paper, Grid, Card, IconButton, 
  Button, TextField, Stack, Avatar, useTheme, Chip, LinearProgress 
} from '@mui/material';
import { 
  Category as CategoryIcon, AddCircle, Delete, Edit, 
  LocalDining, DirectionsCar, ShoppingBag, Work, Receipt 
} from '@mui/icons-material';
import API from '../api/axios';

const ICON_MAP = {
  "Food": <LocalDining />,
  "Salary": <Work />,
  "Shopping": <ShoppingBag />,
  "Transportation": <DirectionsCar />,
  "Bills": <Receipt />,
  "Other": <CategoryIcon />
};

export default function Categories() {
  const theme = useTheme();
  const [categories, setCategories] = useState(["Food", "Salary", "Shopping", "Transportation", "Bills", "Other"]);
  const [breakdown, setBreakdown] = useState({});
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [newCategory, setNewCategory] = useState('');

  const fetchBreakdown = async () => {
    try {
      // Fetching transactions to calculate the breakdown manually
      const { data: transactions } = await API.get('/transactions');
      
      const categoryTotals = {};
      let totalExp = 0;

      transactions.forEach(t => {
        if (t.type === 'EXPENSE') {
          categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
          totalExp += t.amount;
        }
      });

      setBreakdown(categoryTotals);
      setTotalExpenses(totalExp);
    } catch (err) {
      console.error("Error fetching breakdown:", err);
    }
  };

  useEffect(() => {
    fetchBreakdown();
  }, []);

  const calculatePercentage = (amount) => {
    if (!totalExpenses) return 0;
    return Math.round((amount / totalExpenses) * 100);
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, pt: 5, minHeight: '100vh', bgcolor: 'background.default' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={6}>
        <Box>
          <Typography variant="h3" fontWeight={900} letterSpacing={-1.5}>
            Expense Breakdown
          </Typography>
          <Typography variant="body1" color="text.secondary" fontWeight={600}>
            See how your categories impact your total spending
          </Typography>
        </Box>
      </Stack>

      <Paper sx={{ 
        p: 2, px: 4, mb: 6, borderRadius: 50, 
        display: 'flex', alignItems: 'center', gap: 2, 
        boxShadow: '0 10px 40px rgba(0,0,0,0.04)', border: 'none' 
      }}>
        <TextField 
          fullWidth
          placeholder="Add a new category..."
          size="small"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          variant="standard"
          InputProps={{ disableUnderline: true, sx: { px: 2, fontWeight: 600 } }}
        />
        <Button 
          variant="contained" 
          onClick={handleAddCategory}
          sx={{ borderRadius: 8, px: 4, bgcolor: theme.palette.primary.main, fontWeight: 700 }}
        >
          Add
        </Button>
      </Paper>

      <Grid container spacing={4} alignItems="stretch">
        {categories.map((cat) => {
          const amount = breakdown[cat] || 0;
          const percentage = calculatePercentage(amount);

          return (
            <Grid item xs={12} sm={6} md={4} key={cat} sx={{ display: 'flex' }}>
              <Card sx={{ 
                p: 4, borderRadius: '40px', width: '100%',
                display: 'flex', flexDirection: 'column',
                boxShadow: '0 20px 50px rgba(0,0,0,0.04)', border: 'none'
              }}>
                <Stack direction="row" alignItems="center" mb={2}>
                  <Avatar sx={{ 
                    bgcolor: `${theme.palette.primary.main}15`, 
                    color: theme.palette.primary.main, mr: 2 
                  }}>
                    {ICON_MAP[cat] || <CategoryIcon />}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight={800}>{cat}</Typography>
                    <Typography variant="caption" color="text.secondary" fontWeight={700}>
                      {percentage}% of total expenses
                    </Typography>
                  </Box>
                </Stack>

                <Box sx={{ mt: 'auto' }}>
                  <Typography variant="body2" fontWeight={800} color="text.primary" mb={1}>
                    ₹{amount.toLocaleString('en-IN')}
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={percentage} 
                    sx={{ 
                      height: 8, borderRadius: 4, bgcolor: '#F1F5F9',
                      '& .MuiLinearProgress-bar': { bgcolor: theme.palette.primary.main }
                    }} 
                  />
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}