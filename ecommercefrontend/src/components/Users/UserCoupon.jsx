import React, { useState } from 'react';
import API from '../../service/api';

const UserCoupon = () => {
  const [couponCode, setCouponCode] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleVerifyCoupon = async () => {
    if (!couponCode) {
      setError('Please enter a coupon code');
      return;
    }
    try {
      const response = await API.post('/verify-coupon', { code: couponCode });
      setMessage(`Coupon applied! Discount: ${response.data.discountPercentage}%`);
      setError('');
    } catch (err) {
      setError('Invalid coupon code');
      setMessage('');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Apply Coupon</h3>

      {message && (
        <p className="text-green-600 font-medium mb-4">{message}</p>
      )}
      {error && (
        <p className="text-red-600 font-medium mb-4">{error}</p>
      )}

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Enter Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <button
          onClick={handleVerifyCoupon}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-semibold transition duration-300"
        >
          Apply Coupon
        </button>
      </div>
    </div>
  );
};

export default UserCoupon;
