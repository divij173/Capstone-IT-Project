import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  TextField
} from '@mui/material';
import { AccountCircle as AccountCircleIcon } from '@mui/icons-material';

function NewPassword() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMyProfileClick = () => {
    navigate('/myprofile');
    handleMenuClose();
  };

  const handleLogoutClick = () => {
    // Add your logout logic here (e.g., clearing session)
    // After logout, redirect to the login page
    navigate('/login');
    handleMenuClose();
  };

  const handleResetPasswordClick = () => {
    navigate('/resetpassword');
    handleMenuClose();
  };

  return (
    <div>
      <AppBar position="sticky" sx={{ background: '#2196F3' }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            ThinkFin
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container maxWidth="xs" sx={{ marginTop: '20px' }}>
          <Typography variant="h4" gutterBottom>
            Set New Password
          </Typography>
            <form>
                    <TextField
                      label="New Password"
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      required
                      type="password"
                    />
                    <TextField
                      label="Confirm New Password"
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      required
                      type="password"
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      style={{ marginTop: '20px' }}
                    >
                      Save New Password
                    </Button>
            </form>
        </Container>
      </main>
    </div>
  );
}

export default NewPassword;
