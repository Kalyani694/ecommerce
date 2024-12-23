import React, { useState } from 'react';
import API from '../../service/api';

const SellerVerify = () => {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('admin/verify-email', { sellerId, verificationCode: code });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Verification failed');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Email Verification</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            name="code"
            placeholder="Verification Code"
            onChange={handleChange}
            value={code}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Verify
        </button>
      </form>
      {message && <p className="text-center mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default SellerVerify;
