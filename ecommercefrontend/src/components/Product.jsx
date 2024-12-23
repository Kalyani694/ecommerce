import React, { useState } from 'react';
import axios from 'axios';
import API from '../service/api';

const FetchProduct = () => {
  const [productId, setProductId] = useState('');
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFetchProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      // Make the POST request with productId in the body
      const response = await API.post(`/${productId}`, {
        productId: productId
      });
  
      if (response.data.success) {
        setProduct(response.data.product);
      } else {
        setError('Product not found');
      }
    } catch (err) {
      setError('Error fetching product');
    }
    setLoading(false);
  };
  

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4">Fetch Product</h2>

      <form onSubmit={handleFetchProduct} className="space-y-4">
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
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Fetch Product
        </button>
      </form>

      {loading && <p className="text-gray-500 mt-4">Loading...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      
      {product && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-2">Product Details</h3>
          <p className="text-gray-700">Name: {product.name}</p>
          <p className="text-gray-700">Price: {product.price}</p>
          <p className="text-gray-700">Category: {product.category}</p>
          <p className="text-gray-700">Description: {product.description}</p>
          {/* You can display more product details here */}
        </div>
      )}
    </div>
  );
};

export default FetchProduct;
