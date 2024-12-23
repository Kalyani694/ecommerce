import React, { useState } from 'react';
import API from '../../service/api';

const SellerLogin = () => {
  const [formData, setFormData] = useState({ sellerId: '', emailOrPhone: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('admin/login', formData);
      setMessage(response.data.message);
      // Redirect to dashboard if login is successful
    } catch (error) {
      setMessage(error.response?.data?.details || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            name="sellerId"
            placeholder="Seller ID"
            onChange={handleChange}
            value={formData.sellerId}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="emailOrPhone"
            placeholder="Email or Phone"
            onChange={handleChange}
            value={formData.emailOrPhone}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
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
      {message && <p className="text-center mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default SellerLogin;
