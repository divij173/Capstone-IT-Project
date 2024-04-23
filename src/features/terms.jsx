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

function Terms() {
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

      <Container maxWidth="md">
        <br></br><br></br>
        <Typography variant="h4" align="center" gutterBottom>
          Terms and Conditions
        </Typography>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor,
          libero vel lacinia tristique, erat augue egestas quam, nec scelerisque
          nulla risus id libero.

          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor,
          libero vel lacinia tristique, erat augue egestas quam, nec scelerisque
          nulla risus id libero.

          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor,
          libero vel lacinia tristique, erat augue egestas quam, nec scelerisque
          nulla risus id libero.

          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor,
          libero vel lacinia tristique, erat augue egestas quam, nec scelerisque
          nulla risus id libero. <br></br><br></br>

          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor,
          libero vel lacinia tristique, erat augue egestas quam, nec scelerisque
          nulla risus id libero.

          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor,
          libero vel lacinia tristique, erat augue egestas quam, nec scelerisque
          nulla risus id libero.

          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor,
          libero vel lacinia tristique, erat augue egestas quam, nec scelerisque
          nulla risus id libero. <br></br><br></br>

          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor,
          libero vel lacinia tristique, erat augue egestas quam, nec scelerisque
          nulla risus id libero.

          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor,
          libero vel lacinia tristique, erat augue egestas quam, nec scelerisque
          nulla risus id libero.

          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor,
          libero vel lacinia tristique, erat augue egestas quam, nec scelerisque
          nulla risus id libero.
          {/* Add your terms and conditions text here */}
          
        </Typography>
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

export default Terms;
