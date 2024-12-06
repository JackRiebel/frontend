import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log('Login button clicked'); // Log if the function is called

    try {
      const response = await axios.post('http://localhost:5001/api/users/login', {
        email,
        password,
      });

      // Handle response if login is successful
      if (response.status === 200) {
        alert('Login successful!');
        localStorage.setItem('token', response.data.token); // Save token to localStorage
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error); // Log the error for better insight
      // If the error has a response object
      if (error.response) {
        console.error('Response error:', error.response.data); // Log the response error details
        setErrorMessage(error.response.data.message || 'An error occurred');
      } else {
        setErrorMessage('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        {errorMessage && <div className="error">{errorMessage}</div>}
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
};

export default Login;
