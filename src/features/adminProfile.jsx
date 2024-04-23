import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import { Container, Typography, TextField, Button, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Add as AddIcon, Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function AdminProfile() {
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState({
    companyName: '',
    industry: '',
    address: '',
    description: '',
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Fetch user profile data here using the token from localStorage
    const token = localStorage.getItem('token');
    console.log('tokyyAAA', token);
    axios.get('http://18.143.94.162:5000/profile', {
      headers: {
        'Content-type': 'application/json',
        'x-access-token': `${token}`,
      },
    })
    .then((response) => {
      const userData = response.data; // Update with the actual response structure
      console.log('Fetched data', userData.profile);
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

  const handleSave = () => {
    // Add logic to save company profile to the server/database
    console.log('Company Profile Saved:', profile);
  };

  return (
    <div style={{ flex: 1 }}>
      {/* App Bar */}
      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleMenu}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Admin Profile
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer Menu */}
      <Drawer
        anchor="left"
        open={isMenuOpen}
        onClose={toggleMenu}
      >
        <List>
          <ListItem button onClick={() => navigate('/adminDashboard')}>
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
          Admin Profile
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Company Name"
            name="companyName"
            variant="outlined"
            fullWidth
            value={profile.companyName}
            onChange={handleInputChange}
          />
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="industry">Industry</InputLabel>
            <Select
              label="Industry"
              name="industry"
              value={profile.industry}
              onChange={handleInputChange}
            >
              <MenuItem value="Finance">Finance</MenuItem>
              <MenuItem value="Technology">Technology</MenuItem>
              {/* Add more industry options */}
            </Select>
          </FormControl>
          <TextField
            label="Address"
            name="address"
            variant="outlined"
            fullWidth
            value={profile.address}
            onChange={handleInputChange}
          />
          <TextField
            label="Description"
            name="description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={profile.description}
            onChange={handleInputChange}
          />
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default AdminProfile;
