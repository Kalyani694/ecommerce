import React, { useState } from 'react';
import API from '../service/api';

const UpdateVisibility = () => {
  const [productId, setProductId] = useState('');
  const [visibility, setVisibility] = useState('on'); // Default visibility value
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleVisibilityChange = async (e) => {
    e.preventDefault();
    
    try {
      const response = await API.put('/update-visibility', {
        productId,
        visibility
      });

      if (response.data.success) {
        setMessage(response.data.message);
        setError('');
      } else {
        setError(response.data.message);
        setMessage('');
      }
    } catch (err) {
      setError('Error updating visibility');
      setMessage('');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4">Update Product Visibility</h2>

      {message && <p className="text-green-500 mb-4">{message}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleVisibilityChange} className="space-y-4">
        <div>
          <label htmlFor="productId" className="block font-medium mb-2">
            Product ID
          </label>
          <input
            type="text"
            id="productId"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="visibility" className="block font-medium mb-2">
            Visibility
          </label>
          <select
            id="visibility"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="on">Visible</option>
            <option value="off">Hidden</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Visibility
        </button>
      </form>
    </div>
  );
};

export default UpdateVisibility;
