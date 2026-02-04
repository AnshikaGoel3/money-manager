
import React, { useEffect, useState } from 'react';
import { 
  Grid, Card, Typography, Box, ToggleButton, ToggleButtonGroup, 
  LinearProgress, Avatar, Stack, Tooltip, CircularProgress, Paper, IconButton 
} from '@mui/material';
import { TrendingUp, ArrowDownward, AccountBalanceWallet, InfoOutlined } from '@mui/icons-material';
import API from '../api/axios';


export default function Dashboard() {
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0, balance: 0 });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('MONTH');

    const COLORS = {
    income: '#22C55E',      // brighter green
    expense: '#F43F5E',     // rose red (keep)
    accent: '#4F46E5',      // deeper indigo
    bg: '#F5F7FF'
    };

  const calculateProgress = (val, total) => {
    if (!total || total === 0) return 0;
    return Math.min(Math.round((val / total) * 100), 100);
  };

  const formatRecentDate = (dateString) => {
    const date = new Date(dateString);
    if (!dateString || isNaN(date.getTime())) return "Recently";
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [summaryRes, recentRes] = await Promise.all([
        API.get(`/dashboard/summary/${period}`),
        API.get('/transactions')
      ]);
      setSummary(summaryRes.data);
      const sortedData = (recentRes.data || []).sort((a, b) => 
        new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt)
      );
      setRecent(sortedData.slice(0, 5));
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, [period]);

  const cards = [
    { 
      title: 'Total Income', value: summary.totalIncome, icon: TrendingUp, 
      color: COLORS.income, gradient: 'linear-gradient(135deg, #16A34A 0%, #22C55E 100%)', progress: 100 
    },
    { 
      title: 'Total Expense', value: summary.totalExpense, icon: ArrowDownward, 
      color: COLORS.expense, gradient: 'linear-gradient(135deg, #E11D48 0%, #FB7185 100%)', 
      progress: calculateProgress(summary.totalExpense, summary.totalIncome),
      label: `${calculateProgress(summary.totalExpense, summary.totalIncome)}% of income spent`
    },
    { 
      title: 'Balance', value: summary.balance, icon: AccountBalanceWallet, 
      color: COLORS.accent, gradient: 'linear-gradient(135deg, #4F46E5 0%, #818CF8 100%)', 
      progress: calculateProgress(summary.balance, summary.totalIncome),
      label: `${calculateProgress(summary.balance, summary.totalIncome)}% savings rate`
    }
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: COLORS.bg, minHeight: '100vh' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-end" mb={5}>
        <Box>
          <Typography variant="h3" fontWeight={900} letterSpacing={-1.5} color="#1E293B">Financial Overview</Typography>
          <Typography variant="body1" color="text.secondary" fontWeight={600}>Welcome back! Tracking your success daily.</Typography>
        </Box>
        <ToggleButtonGroup value={period} exclusive onChange={(e, v) => v && setPeriod(v)} sx={{ bgcolor: 'white', borderRadius: 4, p: 0.5, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          {['WEEK', 'MONTH', 'YEAR'].map(p => <ToggleButton key={p} value={p} sx={{ border: 'none', borderRadius: '12px !important', px: 3, fontWeight: 700 }}>{p}</ToggleButton>)}
        </ToggleButtonGroup>
      </Stack>

      <Grid container spacing={4} alignItems="stretch">
        {cards.map((card) => (
          <Grid item xs={12} md={4} key={card.title} sx={{ display: 'flex' }}>
            <Card sx={{ p: 4, borderRadius: '35px', boxShadow: '0 20px 50px rgba(0,0,0,0.04)', border: 'none', display: 'flex', flexDirection: 'column', textAlign: 'center', width: '100%', transition: 'transform 0.3s ease', '&:hover': { transform: 'translateY(-5px)' } }}>
              <Avatar sx={{ background: card.gradient, color: 'white', width: 60, height: 60, mb: 3, mx: 'auto', boxShadow: `0 10px 20px ${card.color}40` }}>
                <card.icon fontSize="medium" />
              </Avatar>
              <Typography variant="h6" color="text.secondary" fontWeight={700}>{card.title}</Typography>
              <Typography variant="h3" fontWeight={900} sx={{ my: 1, color: '#0F172A' }}>₹{card.value.toLocaleString('en-IN')}</Typography>
              
              <Box sx={{ mt: 'auto', pt: 2 }}>
                <LinearProgress variant="determinate" value={card.progress} sx={{ height: 10, borderRadius: 5, bgcolor: '#F1F5F9', '& .MuiLinearProgress-bar': { background: card.gradient } }} />
                <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ mt: 1, display: 'block' }}>
                  {card.label || ""}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box mt={6}>
        <Paper sx={{ p: 5, borderRadius: '50px', boxShadow: '0 30px 70px rgba(0,0,0,0.05)', border: 'none' }}>
          <Typography variant="h5" fontWeight={900} mb={4} letterSpacing={-0.5} color="#1E293B">Recent Activity</Typography>
          {loading ? <Box display="flex" justifyContent="center" p={4}><CircularProgress sx={{ color: COLORS.accent }} /></Box> : (
            <Stack spacing={1}>
              {recent.map((item) => {
                const isIncome = item.type === 'INCOME';
                return (
                  <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', py: 2, px: 3, borderRadius: 5, '&:hover': { bgcolor: '#F1F5F9' } }}>
                    <Avatar sx={{ bgcolor: isIncome ? '#D1FAE5' : '#FFE4E6', color: isIncome ? COLORS.income : COLORS.expense, mr: 2 }}>
                      {isIncome ? <TrendingUp /> : <ArrowDownward />}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography fontWeight={800} color="#334155">{item.category}</Typography>
                      <Typography variant="caption" color="text.secondary" fontWeight={700}>{formatRecentDate(item.date || item.createdAt)}</Typography>
                    </Box>
                    <Typography fontWeight={900} color={isIncome ? COLORS.income : COLORS.expense} sx={{ ml: 2, fontSize: '1.1rem' }}>
                      {isIncome ? '+' : '-'} ₹{item.amount.toLocaleString('en-IN')}
                    </Typography>
                  </Box>
                );
              })}
            </Stack>
          )}
        </Paper>
      </Box>
    </Box>
  );
}