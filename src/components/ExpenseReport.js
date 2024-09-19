import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
  Box,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const ExpenseReport = () => {
  const [expenses, setExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    // Fetch expenses from the backend
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/expenses', {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        setExpenses(response.data);
      } catch (error) {
        console.error('Error fetching expenses', error);
      }
    };

    fetchExpenses();
  }, []);

  const handleOpenDialog = (expense) => {
    setSelectedExpense(expense);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedExpense(null);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Expense Report
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Project Name</TableCell>
              <TableCell>Activity</TableCell>
              <TableCell>Amount (Ksh.)</TableCell>
              <TableCell>Project Officer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id} onClick={() => handleOpenDialog(expense)}>
                <TableCell>{expense.project_name}</TableCell>
                <TableCell>{expense.activity}</TableCell>
                <TableCell>{expense.amount}</TableCell>
                <TableCell>{expense.project_officer}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedExpense && (
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle>
            Expense Details
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleCloseDialog}
              aria-label="close"
              sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Typography variant="h6">Project Name: {selectedExpense.project_name}</Typography>
            <Typography variant="body1">Activity: {selectedExpense.activity}</Typography>
            <Typography variant="body1">Amount: {selectedExpense.amount}</Typography>
            <Typography variant="body1">Description: {selectedExpense.description}</Typography>
            <Typography variant="body1">Project Officer: {selectedExpense.project_officer}</Typography>
            <Typography variant="body1">Date: {new Date(selectedExpense.created_at).toLocaleDateString()}</Typography>
            {selectedExpense.receipt && (
              <Box mt={2}>
                <Typography variant="body1">Receipt:</Typography>
                <img
                  src={`${selectedExpense.receipt}`} // Adjust path if necessary
                  alt="Receipt"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default ExpenseReport;
