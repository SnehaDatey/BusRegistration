import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../Services/api';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // useNavigate for redirection
  const navigate = useNavigate();

  // Function to validate email and password
  const validateForm = () => {
    if (!email || !password) {
      setError('Both fields are required.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email format.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error messages

    if (!validateForm()) return; // Stop if validation fails

    setLoading(true);
    // svzdvdvzdvzdvzvz
    try {
      const data = await login(email, password);
      localStorage.setItem('authToken', data.temp_dict.token);
      alert('Login successful!');
      navigate('/dashboard'); // Redirect to dashboard after login
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Logindsasdas</h2>

        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;