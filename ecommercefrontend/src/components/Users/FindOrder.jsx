import React, { useState } from 'react';
import API from '../../service/api';

const FindOrder = () => {
  const [userId, setUserId] = useState('');
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  const handleFindOrders = async () => {
    if (!userId) {
      setError('User ID is required');
      return;
    }
    setError(''); // Clear any existing errors
    try {
      const response = await API.post('/find-my-order', { userId });
      setOrders(response.data.orders || []); // Ensure orders is an array
    } catch (err) {
      setOrders([]);
      setError(err.response?.data?.message || 'Error fetching orders');
    }
  };

  return (
    <div className="m-4 p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Track Your Order</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter your User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded-md"
        />
      </div>

      <button
        onClick={handleFindOrders}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Find Orders
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {orders.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Your Orders</h2>
          {orders.map((order) => (
            <div key={order._id} className="border border-gray-300 rounded-md p-4 mt-4">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>

              <h3 className="font-medium mt-2">Products:</h3>
              {Array.isArray(order.products) && order.products.length > 0 ? (
                <ul className="list-disc ml-6">
                  {order.products.map((product) => (
                    <li key={product._id}>
                      <p><strong>Name:</strong> {product.name}</p>
                      <p><strong>Price:</strong> ${product.price}</p>
                      <p><strong>Description:</strong> {product.description}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No product details available</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FindOrder;
