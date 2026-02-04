import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('email') || 'User';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#F8F9FA' }}>
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', color: 'text.primary', borderBottom: '1px solid #eee' }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700, color: 'primary.main' }}>
              Money Manager
            </Typography>
            <Typography variant="body2" sx={{ mr: 2, color: 'text.secondary' }}>
              {userEmail}
            </Typography>
            <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />} size="small">
              Logout
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {children}
      </Container>
    </Box>
  );
};

export default Layout;