import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const ExpenseReport = () => {
  const expenses = [
    { date: '2023-01-01', projectName: 'Project A', activity: 'Activity 1', amount: 100, projectOfficer: 'John Doe' },
    { date: '2023-01-02', projectName: 'Project B', activity: 'Activity 2', amount: 200, projectOfficer: 'Jane Doe' },
  ];

  return (
    <TableContainer component={Paper}>
      <Typography variant="h4" gutterBottom>
        Expense Report
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Project Name</TableCell>
            <TableCell>Activity</TableCell>
            <TableCell>Amount (Ksh.)</TableCell>
            <TableCell>Project Officer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((expense, index) => (
            <TableRow key={index}>
              <TableCell>{expense.date}</TableCell>
              <TableCell>{expense.projectName}</TableCell>
              <TableCell>{expense.activity}</TableCell>
              <TableCell>{expense.amount}</TableCell>
              <TableCell>{expense.projectOfficer}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpenseReport;
