import React, { useState } from 'react';
import { TextField, Button,} from '@mui/material';

import axios from 'axios';

const SignupForm = ({ onSwitchToLogin, onSignup }) => {

  const [signupData, setSignupData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [showWarning, setShowWarning] = useState(false);

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSignupSubmit = async(e) => {
    e.preventDefault();

    try {
      // Make a POST request to the signup endpoint
      const response = await axios.post('http://localhost:5000/signup', signupData);

      // Handle the successful signup
      console.log('Signup successful:', response.data);
      onSignup();

      onSwitchToLogin();
    } catch (error) {
      // Handle signup error
      console.error('Signup failed:', error.response.data.error);
      
      if (error.response.data.error === 'Email already exists') {
        // Show a warning message
        setShowWarning(true);
      } else {
        // Handle other errors
        console.error('Signup failed. Please try again later.');
      }
    }

  };

  const handleWarningConfirm = () => {
    // User clicked "OK" on the warning message
    setShowWarning(false);
  };


  return (
    <form onSubmit={handleSignupSubmit} style={{ width: '100%', marginTop: 16 }}>
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="username"
        label="Username"
        name="username"
        onChange={handleSignupChange}
        value={signupData.username}
        required
      />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="email"
        label="Email"
        name="email"
        type="email"
        onChange={handleSignupChange}
        value={signupData.email}
        required
      />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="password"
        label="Password"
        name="password"
        type="password"
        onChange={handleSignupChange}
        value={signupData.password}
        required
      />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="confirmPassword"
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        onChange={handleSignupChange}
        value={signupData.confirmPassword}
        required
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Sign Up
      </Button>
      
      {showWarning && (
        <div>
          <p>Email already exists. Please use a different email.</p>
          <Button variant="contained" color="primary" onClick={handleWarningConfirm}>
            OK
          </Button>
        </div>
      )}

    </form>
  );
};
export default SignupForm;
