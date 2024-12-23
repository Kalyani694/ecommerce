import React, { useState } from 'react';
import API from '../../service/api';

const SellerRegister = () => {
  const [formData, setFormData] = useState({ phoneNumber: '', emailId: '', password: '' });
  const [message, setMessage] = useState('');
  const [sellerId, setSellerId] = useState(''); // State to store the sellerId

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('admin/seller/signup', formData);
      setMessage(response.data.message); // Store the message
      setSellerId(response.data.sellerId); // Store the sellerId
    } catch (error) {
      setMessage(error.response?.data?.error || 'Signup failed');
      setSellerId(''); // Clear sellerId on error
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            onChange={handleChange}
            value={formData.phoneNumber}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            name="emailId"
            placeholder="Email ID"
            onChange={handleChange}
            value={formData.emailId}
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
          Signup
        </button>
      </form>
      {message && <p className="text-center mt-4 text-red-500">{message}</p>}
      {sellerId && <p className="text-center mt-4 text-green-500">Seller ID: {sellerId}</p>}
      <button>Verify the email</button>
    </div>
  );
};

export default SellerRegister;
