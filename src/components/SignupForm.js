import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext'; // Ensure this import is correct

const SignupForm = () => {
  // State variables for form fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [alias, setAlias] = useState('');
  const [designation, setDesignation] = useState('');

  // Hook for authentication context and navigation
  const { signup } = useAuth();
  const navigate = useNavigate();

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert('Passwords do not match');
      return;
    }
    try {
      await signup(username, password, email, password2, first_name, last_name, alias, designation);
      navigate('/login'); // Redirect to login after successful signup
    } catch (error) {
      // Handle signup errors here
      console.error('Signup failed:', error);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="120vh"
      sx={{ backgroundColor: '#0096c7' }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 600,
          width: '100%',
          padding: 6,
          border: '1px solid #ddd',
          borderRadius: 2,
          boxShadow: 2,
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Sign Up
        </Typography>

        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password2}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          label="Alias"
          variant="outlined"
          fullWidth
          margin="normal"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
        />
        <TextField
          label="Designation"
          variant="outlined"
          fullWidth
          margin="normal"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
        />

        <Button variant="contained" color="primary" type="submit" fullWidth>
          Sign Up
        </Button>

        <Button
          variant="text"
          color="secondary"
          fullWidth
          sx={{ marginTop: 2 }}
          onClick={() => navigate('/login')}
        >
          Already have an account? Login
        </Button>
      </Box>
    </Box>
  );
};

export default SignupForm;
