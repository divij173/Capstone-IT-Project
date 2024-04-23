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
} from '@mui/material';
import { Link } from 'react-router-dom'; // You can use React Router for navigation
import {
  PhotoCamera as CameraIcon,
  Email as EmailIcon,
  Facebook as FacebookIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
} from '@mui/icons-material';

function Home() {
  return (
    <div>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar>
          <CameraIcon />
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            ThinkFin
          </Typography>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button color="primary" variant="contained">Login</Button>
          </Link>
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <Button color="primary" variant="contained">
              Signup
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero section with image */}
        <Paper
          style={{
            backgroundImage: `url('hero-image.jpg')`, // Replace with actual image path
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '400px',
            marginBottom: '20px',
          }}
        >
          <Container maxWidth="md" style={{ textAlign: 'center', paddingTop: '120px' }}>
            <Typography
              variant="h2"
              color="textPrimary"
              gutterBottom
            >
              Connect with Finance Professionals
            </Typography>
            <Typography
              variant="h5"
              color="textSecondary"
              paragraph
            >
              Discover projects and collaborate with experts in the finance industry.
            </Typography>
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary">
                Get Started
              </Button>
            </Link>
          </Container>
        </Paper>

        {/* Feature section */}
        <Container maxWidth="md" style={{ marginBottom: '20px' }}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardMedia
                  component="img"
                  alt="Feature 1"
                  height="140"
                  image={`feature-1.jpg`} // Replace with actual image path
                />
                <CardContent>
                  <Typography variant="h6">Feature 1</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Description of Feature 1.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardMedia
                  component="img"
                  alt="Feature 2"
                  height="140"
                  image={`feature-2.jpg`} // Replace with actual image path
                />
                <CardContent>
                  <Typography variant="h6">Feature 2</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Description of Feature 2.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
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
}

export default Home;
