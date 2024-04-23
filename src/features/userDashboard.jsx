import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ListItemIcon } from '@mui/material';
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
  Drawer, // Added Drawer component
  List,
  ListItem,
  ListItemText,
  MenuIcon,
  // ListItemIcon,
} from '@mui/material';
import {
  AccountCircle as AccountCircleIcon,
  Home as HomeIcon,
  Work as WorkIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  ExitToApp as ExitToAppIcon,
} from '@mui/icons-material';
// import { AccountCircle as AccountCircleIcon } from '@mui/icons-material';

function UserDashboard() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMyProfileClick = () => {
    navigate('/userProfile');
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

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const dashboardOptions = [
    {
      text: 'Home',
      icon: <HomeIcon />,
      link: '/userDashboard',
    },
    {
      text: 'Find Work',
      icon: <WorkIcon />,
      link: '/findWorkUser',
    },
    {
      text: 'Current Projects',
      icon: <WorkIcon />,
      link: '/currentprojects',
    },
    {
      text: 'Manage Profile',
      icon: <PersonIcon />,
      link: '/userProfile',
    },
    {
      text: 'Settings',
      icon: <SettingsIcon />,
      link: '/dashboard/settings',
    },
  ];

  return (
    <div>
      <div style={{ backgroundColor: '#333', width: '250px', height: '100%', position: 'fixed' }}>
        <List>
          {dashboardOptions.map((option, index) => (
            <ListItem
              button
              key={index}
              component={Link}
              to={option.link}
              style={{ color: 'white' }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {option.icon && (
                  <div style={{ marginRight: '10px' }}>{option.icon}</div>
                )}
                <ListItemText primary={option.text} />
              </div>
            </ListItem>
          ))}
          <ListItem button onClick={handleLogoutClick} style={{ color: 'red' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ marginRight: '10px' }}>
                <ExitToAppIcon />
              </div>
              <ListItemText primary="Log Out" />
            </div>
          </ListItem>
        </List>
      </div>
      <div style={{ marginLeft: '250px' }}>
        <AppBar position="sticky" sx={{ background: '#2196F3' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
              {/* <MenuIcon /> */}
            </IconButton>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              User Dashboard
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
              Dashboard Content
            </Typography>
            {/* Your dashboard content here */}
          </Container>
        </main>
      </div>
    </div>
  );
}

export default UserDashboard;
