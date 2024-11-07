import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ children }) => {
  const authToken = localStorage.getItem('authToken');

  // If the user is not authenticated, redirect to the login page
  return authToken ? children : <Navigate to="/" />;
};

export default AuthRoute;
