import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Typography,
  Box,
  Input,
  IconButton,
  CircularProgress,
  MenuItem,
  Select,
  Alert,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { green } from "@mui/material/colors";

const ExpenseLoggingForm = () => {
  const [project, setProject] = useState("");
  const [activity, setActivity] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const [projects, setProjects] = useState([]); // Projects from the database
  const [activities, setActivities] = useState([]); // Activities based on the selected project

  // Fetch Projects from the backend when the component loads
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectResponse = await fetch(
          "http://localhost:8000/api/projects",
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        ); // Adjust the API endpoint
        const projectData = await projectResponse.json();
        setProjects(projectData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  // Update activities when the selected project changes
  useEffect(() => {
    if (project) {
      const selectedProject = projects.find(proj => proj.name === project);
      if (selectedProject) {
        try {
          const parsedActivities = JSON.parse(selectedProject.activities);
          setActivities(parsedActivities);
        } catch (error) {
          console.error("Error parsing activities:", error);
        }
      }
    } else {
      setActivities([]);
    }
  }, [project, projects]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");

    if (!project || !activity || !description || !amount || !receipt) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("project_name", project);
    formData.append("activity", activity);
    formData.append("description", description);
    formData.append("amount", amount);
    formData.append("receipt", receipt);

    try {
      const response = await fetch("http://localhost:8000/api/expenses/", {
        headers:{
          'Authorization': localStorage.getItem('token'),
        },
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        setAmount(result.amount || "");
        setSuccessMessage("Expense logged successfully!");
        clearForm();
      } else {
        setError(result.error || "Error uploading expense.");
      }
    } catch (error) {
      setError("Error uploading expense.");
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setProject("");
    setActivity("");
    setDescription("");
    setAmount("");
    setReceipt(null);
  };

  const handleFileChange = (e) => {
    setReceipt(e.target.files[0]);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 600,
        margin: "0 auto",
        padding: 4,
        border: `1px solid ${green[500]}`,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "#fff",
        position: "relative",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ marginBottom: 3, color: green[700] }}
      >
        Log Expense
      </Typography>

      {/* Display Success or Error Messages */}
      {successMessage && (
        <Alert severity="success" sx={{ marginBottom: 2 }}>
          {successMessage}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )}

      {/* Project Dropdown */}
      <FormControl fullWidth margin="normal" sx={{ marginBottom: 2 }}>
        <InputLabel sx={{ color: green[700] }}>Project</InputLabel>
        <Select
          value={project}
          onChange={(e) => setProject(e.target.value)}
          label="Project"
          sx={{ padding: 1, color: green[800] }}
        >
          {projects.map((proj) => (
            <MenuItem key={proj.id} value={proj.name}>
              {proj.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Activity Dropdown */}
      <FormControl fullWidth margin="normal" sx={{ marginBottom: 2 }}>
        <InputLabel sx={{ color: green[700] }}>Activity</InputLabel>
        <Select
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          label="Activity"
          sx={{ padding: 1, color: green[800] }}
        >
          {activities.map((act, index) => (
            <MenuItem key={index} value={act}>
              {act}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter a description"
        sx={{
          marginBottom: 2,
          input: { color: green[800] },
          label: { color: green[700] },
        }}
        required
      />

      <TextField
        label="Amount"
        variant="outlined"
        fullWidth
        margin="normal"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter the amount"
        sx={{
          marginBottom: 2,
          input: { color: green[800] },
          label: { color: green[700] },
        }}
        required
      />

      <FormControl fullWidth margin="normal" sx={{ marginBottom: 2 }}>
        <InputLabel sx={{ color: green[700] }} htmlFor="receipt">
          Receipt
        </InputLabel>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Input
            id="receipt"
            type="file"
            onChange={handleFileChange}
            inputProps={{ accept: "image/*" }}
            sx={{ flexGrow: 1, marginRight: 1 }}
          />
          <IconButton sx={{ color: green[700] }}>
            <AttachFileIcon />
          </IconButton>
        </Box>
      </FormControl>

      <Button
        variant="contained"
        color="success"
        type="submit"
        fullWidth
        disabled={loading}
        sx={{
          padding: 1.5,
          backgroundColor: green[500],
          "&:hover": { backgroundColor: green[700] },
          position: "relative",
        }}
      >
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-12px",
              marginLeft: "-12px",
            }}
          />
        )}
        Submit Expense
      </Button>
    </Box>
  );
};

export default ExpenseLoggingForm;
