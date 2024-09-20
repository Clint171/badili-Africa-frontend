import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const ProjectListing = () => {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    // Fetch all projects from API
    const fetchProjects = async () => {
      try {
        const result = await axios.get("http://localhost:8000/api/projects", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setProjects(result.data);
      } catch (error) {
        console.error("Error fetching projects", error);
      }
    };
    fetchProjects();
  }, []);

  const handleStatusChange = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/projects/${selectedProject.name}/update_status/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      const result = await response.json();
      if (response.ok) {
        // Parse activities if they are stringified
        const updatedProject = {
          ...result.project,
          activities: Array.isArray(result.project.activities)
            ? result.project.activities
            : JSON.parse(result.project.activities || "[]"),
        };
  
        setProjects(
          projects.map((p) =>
            p.id === selectedProject.id ? updatedProject : p
          )
        );
        setSelectedProject(updatedProject);
      } else {
        console.error("Error updating project status", result.message);
      }
    } catch (error) {
      console.error("Error updating project status", error);
    }
  };
  

  const handleOpen = (project) => {
    // Ensure activities is always an array
    const parsedProject = {
      ...project,
      activities: Array.isArray(project.activities)
        ? project.activities
        : JSON.parse(project.activities || "[]"),
    };
    setSelectedProject(parsedProject);
    setNewStatus(parsedProject.status); // Initialize newStatus with current project status
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProject(null);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Project Listing
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell>{project.status}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpen(project)}
                  >
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedProject && (
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          maxWidth="md" // Make dialog larger
        >
          <DialogTitle>Project Details</DialogTitle>
          <DialogContent>
            <Typography variant="h6">Name: {selectedProject.name}</Typography>
            <Typography variant="body1">
              Description: {selectedProject.description}
            </Typography>
            <Typography variant="body1">
              Current Status: {selectedProject.status}
            </Typography>
            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                label="Status"
              >
                <MenuItem value="inactive">Inactive</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="abandoned">Abandoned</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="body1">Activities:</Typography>
            <ul>
              {(selectedProject.activities || []).map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleStatusChange} color="primary">
              Update Status
            </Button>
            <Button onClick={handleClose} color="secondary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default ProjectListing;
