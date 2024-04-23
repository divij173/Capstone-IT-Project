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
} from '@mui/material';
import { AccountCircle as AccountCircleIcon } from '@mui/icons-material';

function AdminDashboard() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMyProfileClick = () => {
    navigate('/adminProfile');
    handleMenuClose();
  };

  const handleLogoutClick = () => {
    // Add your logout logic here (e.g., clearing session)
    // After logout, redirect to the login page
    navigate('/');
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
            Admin Dashboard
          </Typography>
          <IconButton onClick={handleMenuOpen}>
            <Avatar alt="User Avatar" src="user-avatar.jpg" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMyProfileClick}>
              My Profile
            </MenuItem>
            <MenuItem onClick={handleResetPasswordClick}>
              Reset Password
            </MenuItem>
            <MenuItem
              onClick={handleLogoutClick}
              style={{ color: 'red', fontWeight: 'bold' }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <main>
        <Container maxWidth="md" sx={{ marginTop: '20px' }}>
          <Typography variant="h4" gutterBottom>
            Dashboard Options
          </Typography>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li style={{ marginBottom: '10px' }}>
              <Link to="/dashboard/option1" style={{ textDecoration: 'none', color: '#333' }}>
                <Button variant="outlined">Option 1</Button>
              </Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Link to="/dashboard/option2" style={{ textDecoration: 'none', color: '#333' }}>
                <Button variant="outlined">Option 2</Button>
              </Link>
            </li>
            {/* Add more dashboard options as needed */}
          </ul>
        </Container>
      </main>
    </div>
  );
}

export default AdminDashboard;
