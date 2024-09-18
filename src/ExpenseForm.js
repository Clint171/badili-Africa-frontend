import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Expenseform.css'; 

function ExpenseForm({ setExpenses }) {
  const [formData, setFormData] = useState({
    project: '',
    activity: '',
    amount: '',
    receipt: null,
    description: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      receipt: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
	setExpenses([formData]);
    setFormData({
      project: '',
      activity: '',
      amount: '',
      receipt: null,
      description: '',
    });
    // Navigate to the expenses list page
    navigate('/expenses');
  };

  return (
    <div className="container">
      <h2 className="heading">Expense Report Form</h2>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Project:</label>
          <input
            type="text"
            name="project"
            value={formData.project}
            onChange={handleInputChange}
            required
            className="input"
          />
        </div>

        <div className="form-group">
          <label>Activity:</label>
          <input
            type="text"
            name="activity"
            value={formData.activity}
            onChange={handleInputChange}
            required
            className="input"
          />
        </div>

        <div className="form-group">
          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            required
            className="input"
          />
        </div>

        <div className="form-group">
          <label>Receipt (file):</label>
          <input
            type="file"
            name="receipt"
            onChange={handleFileChange}
            required
            className="input"
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="textarea"
          />
        </div>

        <button type="submit" className="button">Submit Expense</button>
      </form>
    </div>
  );
}

export default ExpenseForm;
