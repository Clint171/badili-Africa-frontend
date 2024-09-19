import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const ProjectListing = () => {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    // Fetch all projects from API
    const fetchProjects = async () => {
      const result = await axios.get('/api/projects');
      setProjects(result.data);
    };
    fetchProjects();
  }, []);

  const handleStatusChange = async (projectId, newStatus) => {
    try {
      await axios.put(`/api/projects/${projectId}`, { status: newStatus });
      setProjects(projects.map(p => p.id === projectId ? { ...p, status: newStatus } : p));
    } catch (error) {
      console.error("Error updating project status", error);
    }
  };

  const handleOpen = (project) => {
    setSelectedProject(project);
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
                  <Button variant="contained" color="primary" onClick={() => handleOpen(project)}>
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedProject && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Project Details</DialogTitle>
          <DialogContent>
            <Typography variant="h6">Name: {selectedProject.name}</Typography>
            <Typography variant="body1">Description: {selectedProject.description}</Typography>
            <Typography variant="body1">Status: {selectedProject.status}</Typography>
            <Typography variant="body1">Activities:</Typography>
            <ul>
              {selectedProject.activities.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleStatusChange(selectedProject.id, 'Completed')} color="primary">
              Mark as Completed
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
