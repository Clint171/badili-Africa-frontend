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
import { blue } from "@mui/material/colors";

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
  const [fileUploading, setFileUploading] = useState(false); // New state for file upload
  const [fieldsDisabled, setFieldsDisabled] = useState(false); // New state to disable amount/description

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
      const selectedProject = projects.find((proj) => proj.name === project);
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
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.status === 201) {
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

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setReceipt(selectedFile);

    if (selectedFile) {
      setFieldsDisabled(true); // Disable amount and description fields
      setFileUploading(true); // Show file upload loader

      const formData = new FormData();
      formData.append("receipt", selectedFile);

      try {
        const response = await fetch("http://localhost:8000/api/file/", {
          method: "POST",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          body: formData,
        });

        const result = await response.json();

        if (response.ok) {
          setAmount(result.amount || ""); // Populate amount
          setDescription(result.description || ""); // Populate description
        } else {
          setError(result.error || "Error processing file.");
        }
      } catch (error) {
        setError("Error uploading file.");
      } finally {
        setFileUploading(false); // Hide file upload loader
        setFieldsDisabled(false); // Enable amount and description fields
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 600,
        margin: "0 auto",
        padding: 4,
        border: `1px solid ${blue[500]}`,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "#f0f4ff",
        position: "relative",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ marginBottom: 3, color: blue[700], fontWeight: "bold" }}
      >
        Log Expense
      </Typography>

      {/* Project Dropdown */}
      <FormControl fullWidth margin="normal" sx={{ marginBottom: 3 }}>
        <InputLabel sx={{ color: blue[700] }}>Project</InputLabel>
        <Select
          value={project}
          onChange={(e) => setProject(e.target.value)}
          label="Project"
          sx={{ padding: 1, color: blue[800] }}
        >
          {projects.map((proj) => (
            <MenuItem key={proj.id} value={proj.name}>
              {proj.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Activity Dropdown */}
      <FormControl fullWidth margin="normal" sx={{ marginBottom: 3 }}>
        <InputLabel sx={{ color: blue[700] }}>Activity</InputLabel>
        <Select
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          label="Activity"
          sx={{ padding: 1, color: blue[800] }}
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
          marginBottom: 3,
          input: { color: blue[800] },
          label: { color: blue[700] },
        }}
        required
        disabled={fieldsDisabled} // Disable when file is uploading
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
          marginBottom: 3,
          input: { color: blue[800] },
          label: { color: blue[700] },
        }}
        required
        disabled={fieldsDisabled} // Disable when file is uploading
      />

      <FormControl fullWidth margin="normal" sx={{ marginBottom: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Input
            id="receipt"
            type="file"
            onChange={handleFileChange}
            inputProps={{ accept: "image/*" }}
            sx={{ flexGrow: 1, marginLeft: 10 }}
          />
          <InputLabel sx={{ color: blue[700] }} htmlFor="receipt">
            Receipt
          </InputLabel>
          <IconButton sx={{ color: blue[700] }}>
            <AttachFileIcon />
          </IconButton>
        </Box>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        type="submit"
        fullWidth
        disabled={loading || fileUploading} // Disable submit during loading or file upload
        sx={{
          padding: 1.5,
          backgroundColor: blue[500],
          "&:hover": { backgroundColor: blue[700] },
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
    </Box>
  );
};

export default ExpenseLoggingForm;
