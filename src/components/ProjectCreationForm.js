import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import { useAuth } from "../Context/AuthContext"; // Import useAuth hook to get the token

const ProjectCreationForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [activities, setActivities] = useState([""]);
  const [status, setStatus] = useState("active"); // Default status set to "active"
  const [loading, setLoading] = useState(false); // To manage the loading state
  const [error, setError] = useState(null); // To manage error messages
  const navigate = useNavigate();
  const { user } = useAuth(); // Get user from auth context to retrieve token

  const handleActivityChange = (index, event) => {
    const newActivities = activities.slice();
    newActivities[index] = event.target.value;
    setActivities(newActivities);
  };

  const addActivity = () => {
    setActivities([...activities, ""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let strActivities = JSON.stringify(activities);

    const projectData = {
      name,
      description,
      activities: strActivities,
      status,
    };

    try {
      const response = await fetch("http://localhost:8000/api/projects/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"), // Include the token in the request header
        },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Project created successfully");
        // Handle success (e.g., redirect to another page or show a success message)
        navigate('/');
      } else {
        const errorResult = await response.json();
        throw new Error(errorResult.detail || "Failed to create project");
      }
    } catch (error) {
      console.error("Error creating project:", error);
      setError(error.message); // Set error message to display
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 600, margin: "0 auto", padding: "20px" }}
    >
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
        required
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
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
          required
        />
      ))}
      <Button
        variant="outlined"
        onClick={addActivity}
        sx={{ marginBottom: "20px" }}
      >
        Add Activity
      </Button>
      <FormControl fullWidth margin="normal">
        <InputLabel>Project Status</InputLabel>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          label="Project Status"
          required
        >
          <MenuItem value="inactive">Inactive</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="abandoned">Abandoned</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        fullWidth
        sx={{
          padding: 1.5,
          backgroundColor: "#1976d2",
          "&:hover": { backgroundColor: "#1565c0" },
        }}
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Project"}
      </Button>
      {error && (
        <Typography color="error" sx={{ marginTop: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default ProjectCreationForm;
