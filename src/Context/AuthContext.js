import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Create context
const AuthContext = createContext();

// Create provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:8000/api/login/', { username, password });
      if (response.status === 200) {
        setIsAuthenticated(true);
        localStorage.setItem("token", response.data.token);
        // Redirect to ExpenseLoggingForm after successful login
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const signup = async (username, password, email, password2, first_name, last_name, alias, designation) => {
    try {
      const response = await axios.post('http://localhost:8000/api/signup/', { username, password, email, password2, first_name, last_name, alias, designation });
      if (response.status === 201) {
        // After successful signup, log in the user
        login(username, password);
      }
    } catch (error) {
      console.error('Signup failed', error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login'); // Redirect to login on logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
