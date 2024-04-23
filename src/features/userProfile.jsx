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

function UserProfile() {
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    country: '',
    address: '',
    professionalBio: '',
    professionalTags: [],
    certifications: [],
    qualifications: [
      {
        educationLevel: '',
        courseName: '',
        status: '',
      },
    ],
  });

  // State for opening/closing the menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuAnchorRef = React.useRef(null);

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

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleAddQualification = () => {
    const newQualification = {
      educationLevel: '',
      courseName: '',
      status: '',
    };
    setProfile({
      ...profile,
      qualifications: [...profile.qualifications, newQualification],
    });
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
        <AppBar position="sticky" sx={{ background: '#2196F3' }}>
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
                {/* <MenuIcon /> */}
              </IconButton>
              <Typography variant="h6" style={{ flexGrow: 1 }}>
                User Profile
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
            <ListItem button onClick={() => navigate('/UserDashboard')}>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={() => navigate('/')}>
              <ListItemText primary="Sign Out" />
            </ListItem>
            {/* Add more menu items as needed */}
          </List>
        </Drawer>

        <Container maxWidth="md">
          <Typography variant="h4" gutterBottom>
            <br></br>
            My Profile
          </Typography>
          {/* Rest of your MyProfile content (form fields, etc.) */}
          <div>
        <Avatar alt="User Avatar" src="user-avatar.jpg" style={{ width: 150, height: 150, marginBottom: 20 }} />
        <input type="file" accept="image/*" />
      </div>
      
      <form onSubmit={handleSubmit}>
        <TextField
          label="Full Name"
          name="fullName"
          variant="outlined"
          margin="normal"
          fullWidth
          value={profile.fullName}
          onChange={handleInputChange}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          variant="outlined"
          margin="normal"
          fullWidth
          value={profile.email}
          onChange={handleInputChange}
        />
        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="country">Country</InputLabel>
          <Select
            label="Country"
            name="country"
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
          value={profile.address}
          onChange={handleInputChange}
        />
        <TextField
          label="Professional Bio"
          name="professionalBio"
          variant="outlined"
          margin="normal"
          fullWidth
          multiline
          rows={4}
          value={profile.professionalBio}
          onChange={handleInputChange}
        />
        <TextField
          label="Professional Tags (comma-separated)"
          name="professionalTags"
          variant="outlined"
          margin="normal"
          fullWidth
          value={profile.professionalTags ? profile.professionalTags.join(', ') : ''}
          onChange={(event) => {
            const tags = event.target.value.split(', ');
            setProfile({ ...profile, professionalTags: tags });
          }}
        />
        {/* Certifications */}
        {/* Qualifications */}
        {/* {profile.qualifications.map((qualification, index) => ( */}
        {profile.qualifications && profile.qualifications.map((qualification, index) => (
          <div key={index}>
            <Typography variant="h6" gutterBottom>
              Qualification {index + 1}
            </Typography>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor={`educationLevel-${index}`}>Education Level</InputLabel>
              <Select
                label="Education Level"
                name={`educationLevel-${index}`}
                value={qualification.educationLevel}
                onChange={(event) => {
                  const newQualifications = [...profile.qualifications];
                  newQualifications[index].educationLevel = event.target.value;
                  setProfile({ ...profile, qualifications: newQualifications });
                }}
              >
                <MenuItem value="High School">High School</MenuItem>
                <MenuItem value="Undergraduate">Undergraduate</MenuItem>
                {/* Add more education levels */}
              </Select>
            </FormControl>
            {/* Add more qualification fields (Course Name, Status) */}
          </div>
        ))}
        <IconButton onClick={handleAddQualification}>
          <AddIcon /> Add Qualification
        </IconButton>
        <Button variant="contained" color="primary" type="submit">
          Save
        </Button>
        <br></br><br></br>
      </form>
        </Container>
      </div>
    </div>
  );
}

export default UserProfile;
