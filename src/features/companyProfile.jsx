import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import { Container, Typography, TextField, Button, IconButton, Avatar, FormControl, InputLabel, Select, MenuItem, Paper, List, ListItem, ListItemText, AppBar, Toolbar, Divider, Menu, Drawer } from '@mui/material';
import { Add as AddIcon, Menu as MenuIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

import {
  PhotoCamera as CameraIcon,
  Email as EmailIcon,
  Facebook as FacebookIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  AccountCircle as AccountCircleIcon,
  Home as HomeIcon,
  Work as WorkIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  ExitToApp as ExitToAppIcon
} from '@mui/icons-material';

function CompanyProfile() {
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState({
    companyName: '',
    email: '',
    country: '',
    address: '',
    companyBio: '',
    professionalTags: [],
    abnNumber: '',
    gstNumber: '',
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Fetch user profile data here using the token from localStorage
    const token = localStorage.getItem('token');
    console.log('tokyy', token);
    axios.get('http://18.143.94.162:5000/profile', {
      headers: {
        'Content-type': 'application/json',
        'x-access-token': `${token}`,
      },
    })
    .then((response) => {
      const userData = response.data; // Update with the actual response structure
      console.log('Fetched data', userData.profile.fullName);
      setProfile(userData.profile);
      // setProfilep.
    })
    .catch((error) => {
      console.error('Failed to fetch user profile:', error);
      // Handle errors as needed
    });
  }, []); // Empty dependency array to fetch data when the component mounts


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // const passwordValue = event.target.elements.password.value;
    // const emailValue = event.target.elements.email.value;
    // const confirmEmailValue = event.target.elements.confirmEmail.value;
    const prof1={
      profile : { profile }
    }
    // Send the updated profile data to the server
    const token = localStorage.getItem('token');
    axios.post('http://18.143.94.162:5000/profile', prof1, {
      headers: {
        'Content-type': 'application/json',
        'x-access-token': `${token}`,
      },
    })
    .then((response) => {
      // Handle successful profile update
      console.log('posted Fetched data', prof1);
      console.log('Profile updated successfully');
    })
    .catch((error) => {
      console.error('Failed to update user profile:', error);
      // Handle errors as needed
    });
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfile({ ...profile, [name]: value });
  };

  const dashboardOptions = [
    {
      text: 'Home',
      icon: <HomeIcon />,
      link: '/companyDashboard',
    },
    {
      text: 'Create Project',
      icon: <WorkIcon />,
      link: '/createproject',
    },
    {
      text: 'Find Professional',
      icon: <WorkIcon />,
      link: '/findProfessional',
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

  const handleLogoutClick = () => {
    // Add your logout logic here (e.g., clearing session)
    // After logout, redirect to the login page
    navigate('/');
    handleMenuClose();
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMyProfileClick = () => {
    navigate('/userProfile');
    handleMenuClose();
  };

  const handleResetPasswordClick = () => {
    navigate('/resetpassword');
    handleMenuClose();
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
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
      <div style={{ flex: 1, marginLeft: '250px' }}>
        {/* App Bar */}
        <AppBar position="sticky" sx={{ background: '#2196F3' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
              {/* <MenuIcon /> */}
            </IconButton>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Company Profile
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

        {/* Drawer Menu */}
        <Drawer
          anchor="left"
          open={isMenuOpen}
          onClose={toggleMenu}
        >
          <List>
            <ListItem button onClick={() => navigate('/CompanyDashboard')}>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={() => navigate('/')}>
              <ListItemText primary="Sign Out" />
            </ListItem>
            {/* Add more menu items as needed */}
          </List>
        </Drawer>

        {/* Content */}
        <Container maxWidth="md">
          <Typography variant="h4" gutterBottom>
            <br></br>
            Company Profile
          </Typography>
          {/* General Information */}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Company Name"
              name="companyName"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={profile.companyName}
              onChange={handleInputChange}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={profile.email}
              onChange={handleInputChange}
            />
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="country">Country</InputLabel>
              <Select
                label="Country"
                name="country"
                margin="normal"
                required
                value={profile.country}
                onChange={handleInputChange}
              >
                <MenuItem value="USA">USA</MenuItem>
                <MenuItem value="Canada">Canada</MenuItem>
                {/* Add more country options */}
              </Select>
            </FormControl>
            <TextField
              label="Address"
              name="address"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={profile.address}
              onChange={handleInputChange}
            />
            <TextField
              label="Company Bio"
              name="companyBio"
              variant="outlined"
              margin="normal"
              fullWidth
              multiline
              rows={4}
              value={profile.companyBio}
              onChange={handleInputChange}
            />
            <TextField
              label="Professional Tags (comma-separated)"
              name="professionalTags"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={profile.professionalTags.join(', ')}
              onChange={(event) => {
                const tags = event.target.value.split(', ');
                setProfile({ ...profile, professionalTags: tags });
              }}
            />
            <TextField
              label="ABN Number"
              name="abnNumber"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={profile.abnNumber}
              onChange={handleInputChange}
            />
            <TextField
              label="GST Number"
              name="gstNumber"
              variant="outlined"
              margin="normal"
              fullWidth
              value={profile.gstNumber}
              onChange={handleInputChange}
            />
            {/* Add more fields as needed */}
            <Button variant="contained" color="primary" type="submit" margin="normal">
              Save
            </Button>
            <br></br><br></br>
          </form>
        </Container>
      </div>
    </div>
  );
}

export default CompanyProfile;
