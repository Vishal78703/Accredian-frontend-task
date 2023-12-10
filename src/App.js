import React, { useState } from 'react';
import { Container, Paper, Typography, Link} from '@mui/material';
import LoginForm from './Login';
import SignupForm from './SignUp';


const App = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSwitchToSignup = () => {
    setIsLogin(false);
  };

  const handleSwitchToLogin = () => {
    setIsLogin(true);
  };

  const handleLogin = () => {
    // Handle successful login
    console.log('Login successful');
  };

  const handleSignup = () => {
    // Handle successful signup
    console.log('Signup successful');
  
  };

  return (
    <Container component="main" maxWidth="sm" style= {{ margin: 'auto', display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'center'}}>
      <Paper elevation={3} style={{ padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Typography variant="h5" gutterBottom>
          {isLogin ? 'Login' : 'Sign Up'}
        </Typography>
        {isLogin ? (
          <LoginForm onSwitchToSignup={handleSwitchToSignup} onLogin={handleLogin} />
        ) : (
          <SignupForm onSwitchToLogin={handleSwitchToLogin} onSignup={handleSignup} />
        )}
        {!isLogin && (
          <Link component="button" variant="body2" onClick={handleSwitchToLogin}>
            Already have an account? Login
          </Link>
        )}
      </Paper>
    </Container>

  
  );
};

export default App;