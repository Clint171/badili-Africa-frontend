import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
    if (isAuthenticated) {
      navigate('/');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#32CD32'
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: 600,
          width: '100%',
          padding: 3,
          border: '1px solid #ddd',
          borderRadius: 2,
          boxShadow: 2,
          backgroundColor: '#ffffff'
        }}
      >
        <Typography variant="h4" gutterBottom>
          Log In
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
        <Button variant="contained" color="primary" type="submit" fullWidth sx={{ marginTop: 2 }}>
          Log In
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;
