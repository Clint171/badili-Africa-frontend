import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const SideNav = () => {
  return (
    <List component="nav" aria-label="main mailbox folders" style={{ backgroundColor: '#f0f0f0', height: '100vh', padding: '20px' }}>
      <ListItem button component={Link} to="/">
        <ListItemText primary="Log Expense" />
      </ListItem>
      <ListItem button component={Link} to="/expense-report">
        <ListItemText primary="Expense Report" />
      </ListItem>
      <ListItem button component={Link} to="/create-project">
        <ListItemText primary="Create Project" />
      </ListItem>
      <ListItem button component={Link} to="/project-listing">
        <ListItemText primary="Project Listing" />
      </ListItem>
    </List>
  );
};

export default SideNav;
