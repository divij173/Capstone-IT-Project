import React, { useState } from 'react';
import axios from 'axios'; // Import axios
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

function ResetPassword() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [passwordError, setPasswordError] = useState('');

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

  const handleSubmit = async (event) => {

    const token = localStorage.getItem('token')
    console.log(token)
    event.preventDefault();
  
    const passwordValue = event.target.elements.currentpassword.value;
    const newpasswordValue = event.target.elements.newpassword.value;
    
    if (newpasswordValue.length > 8) {
      // console.log(SelectedUserType)
      try {
        const response = await axios.post('http://18.143.94.162:5000/changepassword', {
          // fullName: event.target.elements.fullName.value,
          old_password: passwordValue,
          new_password: newpasswordValue,
          // Add more fields as needed
        }, {
          headers: {
            'Content-type': 'application/json',
            'x-access-token': `${token}`
          }
        });
        
        // Handle the response, e.g., redirect the user or show a success message
        console.log('Registration successful:', response.data);
      } catch (error) {
        // Handle registration errors, e.g., show an error message
        console.error('Registration failed:', error);
      }
    }

    if (passwordValue.length < 8) {
        setPasswordError('Password must be at least 8 characters.');
      } 

    // if (formRef.current){
    //   formRef.current.submit();
    // }
  };

  return (
    <div>
      <AppBar position="sticky" sx={{ background: '#2196F3' }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Dashboard
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
            Reset Password
          </Typography>
            <form onSubmit={handleSubmit}>
                    <TextField
                      label="Current Password"
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      required
                      type="password"
                      name="currentpassword"
                    />
                    <TextField
                      label="New Password"
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      required
                      type="password"
                      name="newpassword"
                    />
                    {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}

                    <TextField
                      label="Confirm New Password"
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      required
                      type="password"
                      name="confirmnewpassword"
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

export default ResetPassword;
