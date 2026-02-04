// src/pages/Transactions.jsx
import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Paper, Chip, Stack, IconButton,
  TextField, Button, Tooltip, CircularProgress
} from '@mui/material';
import {
  Edit, Delete, FilterList, Refresh, InfoOutlined,
  TrendingUp, ArrowDownward
} from '@mui/icons-material';
import API from '../api/axios';

export default function Transactions() {
  const [list, setList] = useState([]);
  const [dates, setDates] = useState({ start: '', end: '' });
  const [loading, setLoading] = useState(false);

  const COLORS = {
    bg: '#F5F7FF',
    accent: '#4F46E5',
    income: '#22C55E',
    expense: '#F43F5E',
  };

  /* ---------------- API ---------------- */

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const res = await API.get('/transactions');
      setList(res.data);
    } catch (err) {
      console.error("Fetch failed:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleFilter = async () => {
    if (!dates.start || !dates.end) {
      alert("Please select both start and end dates.");
      return;
    }
    setLoading(true);
    try {
      const start = `${dates.start}T00:00:00`;
      const end = `${dates.end}T23:59:59`;
      const res = await API.get(
        `/transactions/filter?startDate=${start}&endDate=${end}`
      );
      setList(res.data);
    } catch {
      alert("Filter failed");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Permanently delete this transaction?")) {
      await API.delete(`/transactions/${id}`);
      fetchTransactions();
    }
  };

  const handleEdit = async (transaction) => {
    const hours =
      (new Date() - new Date(transaction.createdAt)) / (1000 * 60 * 60);

    if (hours > 12) {
      alert("Edit window expired (12h)");
      return;
    }

    const newAmount = prompt("Enter new amount", transaction.amount);
    if (newAmount && !isNaN(newAmount)) {
      await API.put(`/transactions/${transaction.id}`, {
        amount: Number(newAmount),
        category: transaction.category,
        description: transaction.description,
      });
      fetchTransactions();
    }
  };

  const isEditable = (createdAt) =>
    (new Date() - new Date(createdAt)) / (1000 * 60 * 60) < 12;

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: COLORS.bg, minHeight: '100vh' }}>
      
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h3" fontWeight={900}>
          Transactions
        </Typography>
        <Chip
          label={`Total History: ${list.length}`}
          sx={{
            bgcolor: COLORS.accent,
            color: 'white',
            fontWeight: 800,
            px: 2,
          }}
        />
      </Stack>

      {/* Filters */}
      <Paper sx={{ p: 3, mb: 5, borderRadius: 50 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} gap={2} alignItems="center">
          <TextField
            type="date"
            label="Start Date"
            size="small"
            InputLabelProps={{ shrink: true }}
            value={dates.start}
            onChange={(e) => setDates({ ...dates, start: e.target.value })}
          />
          <TextField
            type="date"
            label="End Date"
            size="small"
            InputLabelProps={{ shrink: true }}
            value={dates.end}
            onChange={(e) => setDates({ ...dates, end: e.target.value })}
          />
          <Button
            variant="contained"
            startIcon={<FilterList />}
            onClick={handleFilter}
            sx={{
              bgcolor: COLORS.accent,
              borderRadius: 10,
              px: 3,
              fontWeight: 700,
              textTransform: 'none',
            }}
          >
            Apply Filters
          </Button>
          <IconButton onClick={fetchTransactions} sx={{ bgcolor: '#EEF2FF' }}>
            <Refresh />
          </IconButton>
        </Stack>
      </Paper>

      {/* List */}
      <Paper sx={{ p: 4, borderRadius: '60px' }}>
        {loading ? (
          <Box textAlign="center" py={6}>
            <CircularProgress />
          </Box>
        ) : list.length === 0 ? (
          <Box textAlign="center" py={8}>
            <Typography variant="h6">No transactions found</Typography>
          </Box>
        ) : (
          list.map((t) => {
            const isIncome = t.type === 'INCOME';

            return (
              <Box
                key={t.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  px: 4,
                  py: 3,
                  borderRadius: 6,
                  mb: 2,
                  '&:hover': { bgcolor: '#EEF2FF' },
                }}
              >
                {/* Date */}
                <Box flex={1.5}>
                  <Typography fontWeight={800}>
                    {new Date(t.createdAt).toLocaleDateString('en-IN')}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(t.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Typography>
                </Box>

                {/* Type */}
                <Box flex={1.2}>
                  <Chip
                    icon={isIncome ? <TrendingUp /> : <ArrowDownward />}
                    label={t.type}
                    size="small"
                    sx={{
                      bgcolor: isIncome ? '#DCFCE7' : '#FFE4E6',
                      color: isIncome ? '#166534' : '#9F1239',
                      fontWeight: 800,
                    }}
                  />
                </Box>

                {/* Category + Description */}
                <Box flex={1.8} display="flex" alignItems="center" gap={1}>
                  <Chip
                    label={t.category}
                    size="small"
                    variant="outlined"
                    sx={{ borderColor: COLORS.accent, fontWeight: 700 }}
                  />
                  {t.description && (
                    <Tooltip title={t.description}>
                      <InfoOutlined fontSize="small" color="action" />
                    </Tooltip>
                  )}
                </Box>

                {/* Amount */}
                <Box flex={1} textAlign="right">
                  <Typography
                    fontWeight={900}
                    color={isIncome ? COLORS.income : COLORS.expense}
                  >
                    {isIncome ? '+' : '-'} ₹{t.amount.toLocaleString('en-IN')}
                  </Typography>
                </Box>

                {/* Actions */}
                <Box flex={1} textAlign="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    {isEditable(t.createdAt) ? (
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          sx={{ bgcolor: '#F0FDF4', color: COLORS.income }}
                          onClick={() => handleEdit(t)}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Edit expired">
                        <IconButton size="small" disabled>
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        sx={{ bgcolor: '#FEF2F2', color: COLORS.expense }}
                        onClick={() => handleDelete(t.id)}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Box>
              </Box>
            );
          })
        )}
      </Paper>
    </Box>
  );
}
