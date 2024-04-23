import React, { useState, useEffect } from 'react';
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
  Paper,
} from '@mui/material';
import {
  AccountCircle as AccountCircleIcon,
  Home as HomeIcon,
  Work as WorkIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  ExitToApp as ExitToAppIcon,
} from '@mui/icons-material';

function CompanyDashboard() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [projects, setProjects] = useState({});
  // const [professionals, setProfessionals] = useState([
  //   { id: 1, name: 'Professional 1', description: 'Goog1' },
  //   { id: 2, name: 'Professional 2', description: 'Goog2' },
  //   { id: 3, name: 'Professional 3', description: 'Goog3' },
  // ]);
  

  useEffect(() => {
    // Fetch user profile data here using the token from localStorage
    const token = localStorage.getItem('token');
    console.log('tokyy', token);
    axios.get('http://18.143.94.162:5000/work', {
      headers: {
        'Content-type': 'application/json',
        'x-access-token': `${token}`,
      },
    })
    .then((response) => {
      const workProjects = response.data; // Update with the actual response structure
      const projectsData = [];

      for (let i = 0; i < workProjects.length; i++) {
        projectsData.push({
          id: workProjects[i]._id,
          name: workProjects[i].profile.fullName,
          description: workProjects[i].profile.description,
        });
      }

      setProjects(projectsData);
      // setProfilep.
    })
    .catch((error) => {
      console.error('Failed to fetch user profile:', error);
      // Handle errors as needed
    });
  }, []); // Empty dependency array to fetch data when the component mounts

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

  // const fetchProfessionals = async () => {
  //   try {
  //     const response = await axios.get('http://18.143.94.162:5000/work');
  //     setProfessionals(response.data);
  //   } catch (error) {
  //     console.error('Error fetching professionals:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchProfessionals();
  // }, []);

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
              Projects Created
            </Typography>
            <List>
              {Object.keys(projects).map((projectKey) => (
                <Paper key={projectKey} sx={{ marginBottom: '10px', padding: '10px' }}>
                  <ListItemText primary={projects[projectKey].name} secondary={projects[projectKey].description} />
                  <Button
                    component={Link}
                    to={`/updateProject`}
                    variant="contained"
                    color="primary"
                    style={{ marginTop: '10px' }}
                    onClick={() => {
                      // Store the project ID in local storage
                      localStorage.setItem('projectId', projects[projectKey].id);
                      console.log('Project ID is ', projects[projectKey].id);
                    }}
                  >
                    Edit
                  </Button>
                </Paper>
              ))}
            </List>
          </Container>
        </main>
      </div>
    </div>
  );
}

export default CompanyDashboard;
