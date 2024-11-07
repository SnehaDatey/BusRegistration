import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Component/Login/Login';
import Dashboard from './Component/Dashboard/Dashboard';
import AuthRoute from './Component/AuthRoute';

function App() {
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" 
        element={
          <AuthRoute>
          <Dashboard />
        </AuthRoute>
        }
          
          />
      </Routes>
    </Router>
  );
}

export default App;