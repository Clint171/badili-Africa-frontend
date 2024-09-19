import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

// Create context
const AuthContext = createContext();

// Create provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:8000/api/login/', { username, password });
      if (response.data.success) {
        setIsAuthenticated(true);
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const signup = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:8000/api/signup/', { username, password });
      if (response.data.success) {
        login(username, password);
      }
    } catch (error) {
      console.error('Signup failed', error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
