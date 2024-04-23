import React from 'react';
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

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    navigate('/signup');
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
                  Forgot Password
                </Typography>
                <form>
                  <TextField
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    type="email"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: '20px' }}
                  >
                    Confirm Email
                  </Button>
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

export default ForgotPassword;