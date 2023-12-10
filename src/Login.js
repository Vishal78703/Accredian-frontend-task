import React, { useState } from 'react';
import { Grid, TextField, Button, Link } from '@mui/material';
import axios from 'axios';

const LoginForm = ({ onSwitchToSignup, onLogin }) => {
  const [loginData, setLoginData] = useState({ usernameOrEmail: '', password: '' });

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async(e) => {
    e.preventDefault();
    // Implement login logic here

    try {
      // Make a POST request to the login endpoint
      const response = await axios.post('http://localhost:5000/login', loginData);

      // Handle the successful login
      console.log('Login successful:', response.data);
      onLogin();
    } catch (error) {
      // Handle login error
      console.error('Login failed:', error.response.data.error);
    }
  };

  return (
    <form onSubmit={handleLoginSubmit} style={{ width: '100%', marginTop: 16 }}>
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="usernameOrEmail"
        label="Username or Email"
        name="usernameOrEmail"
        onChange={handleLoginChange}
        value={loginData.usernameOrEmail}
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
        onChange={handleLoginChange}
        value={loginData.password}
        required
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Login
      </Button>
      <Grid container justifyContent="flex-end" style={{ marginTop: 16 }}>
        <Grid item>
          <Link component="button" variant="body2" onClick={onSwitchToSignup}>
            Don't have an account? Sign Up
          </Link>
        </Grid>
      </Grid>
    </form>
  );
};

export default LoginForm;