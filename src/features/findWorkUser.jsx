import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ListItemIcon, Paper, TextField, InputAdornment } from '@mui/material';
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
  Search as SearchIcon,
} from '@mui/icons-material';
// import { AccountCircle as AccountCircleIcon } from '@mui/icons-material';

function FindWorkUser() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Project 1',
      description: 'This is the description of Project 1.',
    },
    {
      id: 2,
      name: 'Project 2',
      description: 'This is the description of Project 2.',
    },
    {
      id: 3,
      name: 'Project 3',
      description: 'This is the description of Project 3.',
    },
  ]); // State to store the projects

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

  // useEffect(() => {
  //   axios.get('http://18.143.94.162:5000/work')
  //     .then((response) => {
  //       const workProjects = response.data; // Assuming the response is an array of projects
  //       setProjects(workProjects);
  //       console.log('Fetched data', workProjects);
  //     })
  //     .catch((error) => {
  //       // const workProjects = {name: "Soft", description: "Software Dev"};
  //       // setProjects(workProjects);
  //       // console.log(workProjects);
  //       console.error('Failed to fetch work projects:', error);
  //     });
  // }, []);

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
      setProjects(workProjects);
      console.log('Fetched data', workProjects);
      // setProfilep.
    })
    .catch((error) => {
      console.error('Failed to fetch user profile:', error);
      // Handle errors as needed
    });
  }, []); // Empty dependency array to fetch data when the component mounts

  console.log(projects["Soft"]);
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
              Available Work Projects
            </Typography>
            <List>
              {Object.keys(projects).map((projectKey) => (
                <Paper key={projectKey} sx={{ marginBottom: '10px', padding: '10px' }}>
                  <ListItemText primary={projects[projectKey].name} secondary={projects[projectKey].description} />
                </Paper>
              ))}
            </List>
            {/* <List>
              {projects.map((project) => (
                <Paper key={project.id} sx={{ marginBottom: '10px', padding: '10px' }}>
                  <ListItemText primary={project.name} secondary={project.description} />
                </Paper>
              ))}
            </List> */}
          </Container>
        </main>
      </div>
    </div>
  );
}

export default FindWorkUser;
