import React from "react";
import { Link } from "react-router-dom";
import "./Expenselist.css"; // Import the CSS file

function ExpenseList({ expenses }) {
  const latestExpense = expenses[expenses.length - 1];

  // Check if there is a latest expense
  if (!latestExpense) {
    return (
      <div className="container">
        <h2 className="heading">No expenses submitted yet</h2>
        <Link to="/" className="link">
          Go back to Form
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="heading">Submitted Expense Reports</h2>

      <ul className="list">
        {expenses.map((expense, index) => (
          <li key={index} className="list-item">
            <div>
              <strong>Project:</strong> {latestExpense.project}
            </div>
            <div>
              <strong>Activity:</strong> {latestExpense.activity}
            </div>
            <div>
              <strong>Amount:</strong> {latestExpense.amount}
            </div>
            <div>
              <strong>Description:</strong> {latestExpense.description}
            </div>
            <div>
              <strong>Receipt:</strong>{" "}
              {latestExpense.receipt
                ? latestExpense.receipt.name
                : "No file uploaded"}
            </div>
          </li>
        ))}
      </ul>
      <Link to="/" className="link">
        Go back to Form
      </Link>
    </div>
  );
}

export default ExpenseList;
