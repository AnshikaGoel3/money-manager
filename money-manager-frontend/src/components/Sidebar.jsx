import React from 'react';
import { 
  Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, 
  Typography, Avatar 
} from '@mui/material';
import { 
  Dashboard as DashboardIcon, ReceiptLong, Category, AddCircle, Logout, Savings 
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const MENU_ITEMS = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Transactions', icon: <ReceiptLong />, path: '/transactions' },
  { text: 'Categories', icon: <Category />, path: '/categories' },
  { text: 'Add Transaction', icon: <AddCircle />, path: '/add-transaction' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = localStorage.getItem('email') || 'User';

  const COLORS = {
    indigo: '#6366F1',
    slate: '#1E293B',
    slateLight: '#64748B',
    bg: '#F8FAFC'
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // Set this to true if you have a valid logo URL in src
  const hasLogo = false; 

  return (
    <Box 
      sx={{ 
        width: { xs: 280, md: 300 }, 
        height: '100vh', 
        bgcolor: 'white',
        boxShadow: '10px 0 40px rgba(0,0,0,0.04)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        borderRight: '1px solid #F1F5F9'
      }}
    >
      <Box sx={{ p: 4, pt: 4, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar 
            src={hasLogo ? "/path-to-your-logo.png" : ""} 
            alt="Money Manager Logo"
            sx={{ 
                width: 52, 
                height: 52,
                boxShadow: '0 8px 20px rgba(99, 102, 241, 0.3)',
                bgcolor: hasLogo ? 'transparent' : COLORS.bg 
            }}
          >
            {!hasLogo && <Savings sx={{ color: COLORS.indigo, fontSize: 32 }} />}
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight={900} color={COLORS.slate} letterSpacing={-0.5}>
                Money Manager
            </Typography>
            <Typography variant="caption" color={COLORS.slateLight} fontWeight={600}>
                {userEmail}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto', px: 2 }}>
        <List>
          {MENU_ITEMS.map((item) => {
            const selected = location.pathname === item.path;
            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                <ListItemButton 
                  selected={selected}
                  onClick={() => navigate(item.path)}
                  sx={{ 
                    borderRadius: 4, 
                    px: 3, py: 1.8,
                    transition: 'all 0.2s ease',
                    color: selected ? 'white' : COLORS.slateLight,
                    '&.Mui-selected': {
                      bgcolor: COLORS.indigo,
                      color: 'white',
                      boxShadow: '0 10px 25px rgba(99, 102, 241, 0.35)',
                      '& .MuiListItemIcon-root': { color: 'white' },
                      '&:hover': { bgcolor: COLORS.indigo }
                    },
                    '&:hover': {
                      bgcolor: selected ? COLORS.indigo : '#F1F5F9',
                      transform: 'translateX(4px)'
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 44, color: selected ? 'white' : COLORS.slateLight }}>
                    {React.cloneElement(item.icon, { sx: { fontSize: 24 } })}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    primaryTypographyProps={{ fontWeight: 700, fontSize: '0.95rem' }} 
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Box sx={{ p: 3, borderTop: '1px solid #F1F5F9' }}>
        <ListItemButton 
          onClick={handleLogout} 
          sx={{ borderRadius: 4, color: '#F43F5E', px: 3, py: 1.5, fontWeight: 700, '&:hover': { bgcolor: '#FFF1F2' } }}
        >
          <ListItemIcon sx={{ color: '#F43F5E', minWidth: 44 }}>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Logout" primaryTypographyProps={{ fontWeight: 800 }} />
        </ListItemButton>
      </Box>
    </Box>
  );
}