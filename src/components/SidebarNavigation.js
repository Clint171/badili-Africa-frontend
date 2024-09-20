import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Divider, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Logo from '../assets/fundflow.jpg'; // Add your logo here

const SideNav = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#f7f9fc',
        height: '100vh',
        width: '250px',
        padding: '20px',
        boxShadow: '2px 0px 5px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
      >
        <img src={Logo} alt="Logo" style={{ width: '150px' }} />
      </Box>

      {/* Navigation Items */}
      <Typography variant="h6" align="center" gutterBottom sx={{ color: '#4a4a4a', marginBottom: '10px' }}>
        Expense Tracker
      </Typography>
      <Divider sx={{ marginBottom: '20px' }} />

      <List component="nav" aria-label="main navigation" sx={{ padding: 0 }}>
        <ListItem button component={Link} to="/" sx={{ marginBottom: '10px', borderRadius: '8px', '&:hover': { backgroundColor: '#dfe6f1' } }}>
          <ListItemIcon>
            <ReceiptIcon sx={{ color: '#4a90e2' }} />
          </ListItemIcon>
          <ListItemText primary="Log Expense" sx={{ color: '#4a4a4a' }} />
        </ListItem>

        <ListItem button component={Link} to="/expense-report" sx={{ marginBottom: '10px', borderRadius: '8px', '&:hover': { backgroundColor: '#dfe6f1' } }}>
          <ListItemIcon>
            <ListAltIcon sx={{ color: '#4a90e2' }} />
          </ListItemIcon>
          <ListItemText primary="Expense Report" sx={{ color: '#4a4a4a' }} />
        </ListItem>

        <ListItem button component={Link} to="/create-project" sx={{ marginBottom: '10px', borderRadius: '8px', '&:hover': { backgroundColor: '#dfe6f1' } }}>
          <ListItemIcon>
            <AddCircleIcon sx={{ color: '#4a90e2' }} />
          </ListItemIcon>
          <ListItemText primary="Create Project" sx={{ color: '#4a4a4a' }} />
        </ListItem>

        <ListItem button component={Link} to="/project-listing" sx={{ marginBottom: '10px', borderRadius: '8px', '&:hover': { backgroundColor: '#dfe6f1' } }}>
          <ListItemIcon>
            <AssignmentIcon sx={{ color: '#4a90e2' }} />
          </ListItemIcon>
          <ListItemText primary="Project Listing" sx={{ color: '#4a4a4a' }} />
        </ListItem>
      </List>
    </Box>
  );
};

export default SideNav;
