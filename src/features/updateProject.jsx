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

function UpdateProject() {
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState({
    fullName: '',
    description: '',
    professionalTags: [],
    numberOfPeopleRequired: '',
    minHourlyPrice: '',
    maxHourlyPrice: '',
  });

  // State for opening/closing the menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuAnchorRef = React.useRef(null);

  useEffect(() => {
    // Fetch user profile data here using the token from localStorage
    const token = localStorage.getItem('token');
    const projectId = localStorage.getItem('projectId');
    console.log('tokyy', token);
    axios.get('http://18.143.94.162:5000/work/${projectId}', {
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
      work : { profile }
    }
    // Send the updated profile data to the server
    const token = localStorage.getItem('token');
    axios.post('http://18.143.94.162:5000/work', prof1, {
      headers: {
        'Content-type': 'application/json',
        'x-access-token': `${token}`,
      },
    })
    .then((response) => {
      // Handle successful profile update
      console.log('posted new project', prof1);
      console.log('Work created successfully');
    })
    .catch((error) => {
      console.error('Failed to create project profile:', error);
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
                Update Project
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
              Update Project
            </Typography>
            {/* Rest of your MyProfile content (form fields, etc.) */}
        
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
                label="Description"
                name="description"
                variant="outlined"
                margin="normal"
                fullWidth
                multiline
                rows={4}
                value={profile.description}
                onChange={handleInputChange}
              />
              <div>
                {/* <div style={{ display: 'inline-flex' }}>
                  <Avatar alt="User Avatar" src="user-avatar.jpg" style={{ width: 80, height: 80, marginRight: 10 }} />
                </div> */}
                  <input type="file" accept="image/*" style={{ marginTop: 10 }} />
              </div>
                                
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

              <TextField
                label="Number of People Required"
                name="numberOfPeopleRequired"
                variant="outlined"
                margin="normal"
                fullWidth
                value={profile.numberOfPeopleRequired}
                onChange={handleInputChange}
              />

              <TextField
                label="Minimum Hourly Price"
                name="minHourlyPrice"
                variant="outlined"
                margin="normal"
                fullWidth
                value={profile.minHourlyPrice}
                onChange={handleInputChange}
              />

              <TextField
                label="Maximum Hourly Price"
                name="maxHourlyPrice"
                variant="outlined"
                margin="normal"
                fullWidth
                value={profile.maxHourlyPrice}
                onChange={handleInputChange}
              />
              
              <Button variant="contained" color="primary" type="submit" margin="normal">
                Create Project
              </Button>
              <br></br>
            </form>
          </Container>

            {/* Contact and social links */}
            <Container maxWidth="sm" style={{ marginBottom: '20px' }}>
                <Divider style={{ margin: '20px 0' }} />
                <Typography variant="h4" color="textPrimary" align="center">
                  Contact Us
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                  <IconButton>
                    <EmailIcon fontSize="large" />
                  </IconButton>
                  <IconButton>
                    <FacebookIcon fontSize="large" />
                  </IconButton>
                  <IconButton>
                    <LinkedInIcon fontSize="large" />
                  </IconButton>
                  <IconButton>
                    <TwitterIcon fontSize="large" />
                  </IconButton>
                </div>
            </Container>
            <footer>
            <Container maxWidth="md">
              <Typography variant="body1" color="textSecondary" align="center">
                © {new Date().getFullYear()} Finance Pro Connect
              </Typography>
            </Container>
          </footer>
          
        </div>
    </div>
  );
}

export default UpdateProject;
