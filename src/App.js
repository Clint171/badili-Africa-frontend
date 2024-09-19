import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './Context/AuthContext';
import LoginForm from './components/LoggingForm';
import SignupForm from './components/SignupForm';
import ExpenseLoggingForm from './components/ExpenseLoggingForm';
import ExpenseReport from './components/ExpenseReport';
import ProjectCreationForm from './components/ProjectCreationForm';
import ProjectListing from './components/ProjectListing';
import SideNav from './components/SidebarNavigation';

// A wrapper for routes that require authentication
const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div style={{ display: 'flex' }}>
      {isAuthenticated && <SideNav />}
      <div style={{ flex: 1, padding: '20px' }}>
        <Routes>
          {/* Protected Routes */}
          <Route path="/" element={<ProtectedRoute element={<ExpenseLoggingForm />} />} />
          <Route path="/expense-report" element={<ProtectedRoute element={<ExpenseReport />} />} />
          <Route path="/create-project" element={<ProtectedRoute element={<ProjectCreationForm />} />} />
          <Route path="/project-listing" element={<ProtectedRoute element={<ProjectListing />} />} />

          {/* Public Routes */}
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          
          {/* Redirect unknown routes to the login page */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

export default App;
