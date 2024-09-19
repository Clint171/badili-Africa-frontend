import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useAuth } from '../Context/AuthContext';

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [alias, setAlias] = useState('');
  const [designation, setDesignation] = useState('');
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    await signup(username, password, email, firstName, lastName, alias, designation);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{
        backgroundColor: '#04e762',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 600,
          width: '100%',
          padding: 3,
          border: '1px solid #ddd',
          borderRadius: 2,
          boxShadow: 2,
          backgroundColor: '#fff'
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
          value={confirmPassword}
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
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={lastName}
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
      </Box>
    </Box>
  );
};

export default SignupForm;
