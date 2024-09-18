import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes,} from 'react-router-dom';
import ExpenseForm from './ExpenseForm'
import ExpenseList from './ExpenseList';

function App() {
  const [expenses, setExpenses] = useState([]);

  return (
    <Router>
      <Routes>
        {/* Route for the form */}
        <Route path="/" element={<ExpenseForm setExpenses={setExpenses} />} />
        {/* Route for the list of expenses */}
        <Route path="/expenses" element={<ExpenseList expenses={expenses} />} />
      </Routes>
    </Router>
  );
}

export default App;

