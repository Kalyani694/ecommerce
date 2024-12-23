import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CouponManage from './CouponManage';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product; // Receive the product data from navigation state

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-semibold text-gray-800">No Product Found!</h1>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
        >
          Go Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Order Summary</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-6">
          <img
            src={product.img}
            alt={product.name}
            className="w-32 h-32 object-cover rounded-md border"
          />
          <div className="ml-6">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <p className="text-lg font-bold text-blue-600 mt-4">₹{product.price}</p>
          </div>
        </div>
        <CouponManage/>

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Shipping Address:</label>
          <textarea
            className="mt-2 p-3 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            placeholder="Enter your address"
          ></textarea>
        </div>

        <div className="mt-6">
          <button
            onClick={() => navigate('/payment', { state: { product } })}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 font-bold"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
