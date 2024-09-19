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

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/signup" />;
};

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <SideNav />}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<ProtectedRoute element={<ExpenseLoggingForm />} />} />
          <Route path="/expense-report" element={<ProtectedRoute element={<ExpenseReport />} />} />
          <Route path="/create-project" element={<ProtectedRoute element={<ProjectCreationForm />} />} />
          <Route path="/project-listing" element={<ProtectedRoute element={<ProjectListing />} />} />
          <Route path="/login" element={!isAuthenticated ? <Navigate to="/signup" /> : <LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
        </Routes>
      </div>
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;
