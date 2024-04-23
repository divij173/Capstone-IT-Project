import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'; // Import axios
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
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
import { Link, useNavigate  } from 'react-router-dom'; // You can use React Router for navigation
import {
  PhotoCamera as CameraIcon,
  Email as EmailIcon,
  Facebook as FacebookIcon,
  LinkedIn as LinkedInIcon,
  NineKOutlined,
  Twitter as TwitterIcon,
} from '@mui/icons-material';

const Register = () => {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [SelectedUserType, setSelectedUserType] = useState('');
  const [Invalid, setInvalid] = React.useState(false);
  const formRef = useRef(null);


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const passwordValue = event.target.elements.password.value;
    const emailValue = event.target.elements.email.value;
    const confirmEmailValue = event.target.elements.confirmEmail.value;

    // if (passwordValue.length < 8) {
    //   setPasswordError('Password must be at least 8 characters.');
    // } 

    // if (emailValue !== confirmEmailValue) {
    //   setEmailError('Emails do not match.');
    // }

    // else if (!passwordError && !emailError) {
    if (passwordValue.length > 8 && emailValue === confirmEmailValue) {
      // console.log(SelectedUserType)
      try {
        const response = await axios.post('http://18.143.94.162:5000/register', {
          // fullName: event.target.elements.fullName.value,
          email: emailValue,
          password: passwordValue,
          country: selectedCountry,
          user_type: SelectedUserType,
          // Add more fields as needed
        });
        
        localStorage.setItem('token', response.data.token);
        if (SelectedUserType == "Professional")
        {
          navigate('/userDashboard');  
        }
        if (SelectedUserType == "Organisation")
        {
          navigate('/companyDashboard');  
        }
        if (SelectedUserType == "Admin")
        {
          navigate('/adminDashboard');  
        }
        // navigate('/');
        // console.log('tokyy',response.data.token)
        

        // Handle the response, e.g., redirect the user or show a success message
        console.log('Registration successful:', response.data);
      } catch (error) {
        // Handle registration errors, e.g., show an error message
        console.error('Registration failed:', error);
      }
    }

    if (passwordValue.length < 8) {
        setPasswordError('Password must be at least 8 characters.');
        // console.log("heheheeh");
      } 
  
    if (emailValue !== confirmEmailValue) {
      setEmailError('Emails do not match.');
    }

    // if (formRef.current){
    //   formRef.current.submit();
    // }
  };

  const handleUserTypeChange = (event) => {
    setSelectedUserType(event.target.value);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleTermsChange = (event) => {
    setIsTermsChecked(event.target.checked);
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
            <Container maxWidth="xs">
              <Paper elevation={3} style={{ padding: '20px', marginTop: '40px' }}>
                <Avatar style={{ margin: '0 auto', backgroundColor: 'secondary.main' }}>
                </Avatar>
                <Typography variant="h5" align="center" style={{ marginBottom: '20px' }}>
                  Register with Email
                </Typography>
                <form onSubmit={handleSubmit}>
                <FormControl variant="outlined" fullWidth margin="normal" required>
                  <InputLabel id="select-user-type">User Type</InputLabel>
                  <Select
                    labelId="select-user-type"
                    value={SelectedUserType}
                    onChange={handleUserTypeChange}
                    label="User Type"
                  >
                    <MenuItem value="Professional">Professional</MenuItem>
                    <MenuItem value="Organisation">Organisation</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                    label="Full Name"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    inputProps={{
                      maxLength: 100,
                    }}
                    type="text"
                  />
                  <TextField
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    type="email"
                    name = "email"
                  />
                  <TextField
                    label="Confirm Email"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    type="email"
                    name = "confirmEmail"
                  />
                  {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
                  <TextField
                  label="Password"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  type="password"
                  name="password"
                  />
                  {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}

                  <FormControl variant="outlined" fullWidth margin="normal" required>
                  <InputLabel id="select-country-label">Select Country</InputLabel>
                  <Select
                    labelId="select-country-label"
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    label="Select Country"
                  >
                    <MenuItem value="aus">Australia</MenuItem>
                    <MenuItem value="usa">United States</MenuItem>
                    <MenuItem value="canada">Canada</MenuItem>
                    <MenuItem value="uk">United Kingdom</MenuItem>
                  </Select>
                </FormControl>

              <input type="hidden" name="country" value={selectedCountry} />

                  <FormControlLabel
                  control={
                    <Checkbox
                      checked={isTermsChecked}
                      onChange={handleTermsChange}
                      name="terms"
                      color="primary"
                    />
                  }
                  label={
                    <span>
                      I confirm that I have read and agree to the&nbsp;
                      <a href="/terms" target="_blank" rel="noopener noreferrer">
                        Terms & Conditions
                      </a>
                    </span>
                  }
                  style={{ marginTop: '10px' }} 
                />
              
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: '20px' }}
                  >
                    Register
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

export default Register;