import React, { useState, useContext } from 'react';
import API from '../../service/api';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../pages/context/AuthContext';

const UserLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const { updateUser } = useContext(AuthContextProvider); // Destructure updateUser from AuthContext
  const navigate = useNavigate(); // Initialize navigate hook

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage(''); // Clear message on input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.includes('@')) {
      setMessage('Invalid email format');
      return;
    }

    if (formData.password.length < 6) {
      setMessage('Password must be at least 6 characters');
      return;
    }

    try {
      const response = await API.post('auth/login', formData);
      if (response.data?.userId) {
        // Update the AuthContext with user data
        updateUser(response.data); // Assuming response.data contains the user object

        setMessage('Login successful!');
        navigate('/'); // Redirect to the home page
      } else {
        setMessage('Login successful, but no user ID received.');
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setMessage('Invalid email or password');
      } else if (!error.response) {
        setMessage('Network error. Please try again later.');
      } else {
        setMessage(error.response?.data?.error || 'An unexpected error occurred');
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg mt-8">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNm1AkyllPV6b6Sa4rP-qRdD2nTBOxw0v7jQ&s"
        alt="Login illustration"
        className="w-full md:w-1/2"
      />
      <div className="w-full md:w-1/2 p-6">
        <h2 className="text-2xl font-bold text-center mb-4">User Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              aria-label="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              aria-label="Enter your password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        {message && <p className="mt-4 text-center">{message}</p>}
        <p className="text-center mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-700">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
