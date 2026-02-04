// src/theme.js
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',

    primary: {
      main: '#4F46E5',   // Indigo
    },

    secondary: {
      main: '#22C55E',   // Income green
    },

    error: {
      main: '#F43F5E',   // Expense red
    },

    background: {
     default: '#F5F7FF',   // 👈 subtle pretty background
     paper: '#FFFFFF',
    },

    text: {
      primary: '#0F172A',
      secondary: '#64748B',
    },
  },

  typography: {
    fontFamily: `'Inter', 'Roboto', sans-serif`,
    h3: { fontWeight: 900 },
    h4: { fontWeight: 800 },
    h5: { fontWeight: 800 },
  },

  shape: {
    borderRadius: 16,
  },
});
