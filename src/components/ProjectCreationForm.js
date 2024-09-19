import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Typography, Box } from '@mui/material';

const ProjectCreationForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [activities, setActivities] = useState(['']);
  const [status, setStatus] = useState('Inactive');

  const handleActivityChange = (index, event) => {
    const newActivities = activities.slice();
    newActivities[index] = event.target.value;
    setActivities(newActivities);
  };

  const addActivity = () => {
    setActivities([...activities, '']);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, margin: '0 auto', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Create New Project
      </Typography>
      <TextField
        label="Name of Project"
        variant="outlined"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {activities.map((activity, index) => (
        <TextField
          key={index}
          label={`Activity ${index + 1}`}
          variant="outlined"
          fullWidth
          margin="normal"
          value={activity}
          onChange={(e) => handleActivityChange(index, e)}
        />
      ))}
      <Button variant="outlined" onClick={addActivity} sx={{ marginBottom: '20px' }}>
        Add Activity
      </Button>
      <FormControl fullWidth margin="normal">
        <InputLabel>Project Status</InputLabel>
        <Select value={status} onChange={(e) => setStatus(e.target.value)} label="Project Status">
          <MenuItem value="inactive">Inactive</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="abandoned">Abandoned</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" type="submit" fullWidth>
        Create Project
      </Button>
    </Box>
  );
};

export default ProjectCreationForm;
