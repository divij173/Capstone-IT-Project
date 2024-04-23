import React, { useState } from 'react';
import axios from 'axios';
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
  Drawer, // Added Drawer component
  List,
  ListItem,
  ListItemText,
  MenuIcon,
  TextField,
} from '@mui/material';
import {
  AccountCircle as AccountCircleIcon,
  Home as HomeIcon,
  Work as WorkIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  ExitToApp as ExitToAppIcon,
} from '@mui/icons-material';

function CreateWorkCompany() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [newProject, setNewProject] = useState({
    id: '',
    name: '',
    description: '',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMyProfileClick = () => {
    navigate('/companyProfile');
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

  const dashboardOptions = [
    {
      text: 'Home',
      icon: <HomeIcon />,
      link: '/companyDashboard',
    },
    {
      text: 'Create Work',
      icon: <WorkIcon />,
      link: '/createWorkCompany',
    },
    {
      text: 'Manage Profile',
      icon: <PersonIcon />,
      link: '/companyProfile',
    },
    {
      text: 'Settings',
      icon: <SettingsIcon />,
      link: '/dashboard/settings',
    },
  ];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Add your logic to submit the new project to the API
    // Use the `newProject` state to access the project data

    // Clear the form after submission
    setNewProject({
      id: '',
      name: '',
      description: '',
    });

    const token = localStorage.getItem('token');
    axios.post('http://18.143.94.162:5000/CreateWork', setNewProject, {
      headers: {
        'Content-type': 'application/json',
        'x-access-token': `${token}`,
      },
    })
    .then((response) => {
      // Handle successful profile update
      console.log('posted Fetched data', setNewProject);
      console.log('Profile updated successfully');
    })
    .catch((error) => {
      console.error('Failed to update user profile:', error);
      // Handle errors as needed
    });
  };

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
              Company Dashboard
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
              Create New Project
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="ID"
                name="id"
                variant="outlined"
                fullWidth
                value={newProject.id}
                onChange={handleInputChange}
              />
              <TextField
                label="Name"
                name="name"
                variant="outlined"
                fullWidth
                value={newProject.name}
                onChange={handleInputChange}
              />
              <TextField
                label="Description"
                name="description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={newProject.description}
                onChange={handleInputChange}
              />
              <Button variant="contained" color="primary" type="submit">
                Create Project
              </Button>
            </form>
          </Container>
        </main>
      </div>
    </div>
  );
}

export default CreateWorkCompany;
