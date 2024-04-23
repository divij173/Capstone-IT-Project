import React from 'react';
import axios from 'axios'; // Import axios
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CssBaseline,
  Divider,
  Fab,
  IconButton,
  Paper,
  TextField,
  Avatar,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'; // You can use React Router for navigation
import {
  PhotoCamera as CameraIcon,
  Email as EmailIcon,
  Facebook as FacebookIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
} from '@mui/icons-material';

const Login = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const handleForgotPasswordClick = () => {
    navigate('/forgotpassword');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const passwordValue = event.target.elements.password.value;
    const emailValue = event.target.elements.email.value;
    console.log(passwordValue);
    console.log(emailValue);

    try {
      const response = await axios.post('http://18.143.94.162:5000/login', {
        email: emailValue,
        password: passwordValue,
      });

      // const { token, user_type } = response.data;
      const { token, user_type } = response.data;
      // const user_type = 'Professional'
      console.log('toky and user', token,user_type);
      if (user_type === 'Professional') {
        // Navigate to the Professional dashboard
        navigate('/userDashboard');
      } else if (user_type === 'Admin') {
        // Navigate to the Admin dashboard
        navigate('/adminDashboard');
      } else if (user_type === 'Organisation') {
        navigate('/companyDashboard');
        // setError('Invalid user type');
      }
      console.log('Login successful:', response.data);
      localStorage.setItem('token', token);
      console.log(localStorage.data);
    } catch (error) {
      // setError('Login failed. Please check your credentials.');
      console.error('Login failed. Please check your credentials.:', error);
    }

  };

  return (
    <div>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar>
          <CameraIcon />
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            ThinkFin
          </Typography>
          {/* <Link to="/login" style={{ textDecoration: 'none' }}> */}
          <Button color="primary" variant="contained" onClick={handleLoginClick}>Login</Button>
          {/* </Link> */}
          {/* <Link to="/signup" style={{ textDecoration: 'none' }}> */}
          <Button color="primary" variant="contained" onClick={handleSignUpClick}>Signup</Button>
          {/* </Link> */}
        </Toolbar>
      </AppBar>
      <main>
            <Container maxWidth="xs">
              <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <Avatar style={{ margin: '0 auto', backgroundColor: 'secondary.main' }}>
                </Avatar>
                <Typography variant="h5" align="center" style={{ marginBottom: '20px' }}>
                  Login with Email
                </Typography>
                <form onSubmit={handleSubmit}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    type="email"
                    name="email"
                  />
                  <TextField
                    label="Password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    type="password"
                    name="password"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: '20px' }}
                  >
                    Login
                  </Button>

                  <a onClick={handleForgotPasswordClick}> Forgot Password </a>
                </form>
              </Paper>
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
      </main>

      <footer>
        <Container maxWidth="md">
          <Typography variant="body1" color="textSecondary" align="center">
            © {new Date().getFullYear()} Finance Pro Connect
          </Typography>
        </Container>
      </footer>
    </div>
  );
};

export default Login;