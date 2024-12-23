import React, { useState, useEffect } from 'react';
import API from '../../service/api';
 // Assuming you have an API service for making requests

const UpdateStock = ({ productId }) => {
  const [productDetails, setProductDetails] = useState({
    name: '',
    price: '',
    category: '',
    inStockValue: '',
    soldStockValue: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await API.get(`/product/${productId}`);
        if (response.data.success) {
          setProductDetails(response.data.product);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Error fetching product details');
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await API.put('/instock-update', {
        productId,
        ...productDetails
      });

      if (response.data.success) {
        setSuccessMessage('Stock status updated successfully');
      } else {
        setError(response.data.message || 'Error updating stock status');
      }
    } catch (err) {
      setError('Error updating stock status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4">Update Product Stock</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium mb-2">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={productDetails.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="price" className="block font-medium mb-2">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={productDetails.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block font-medium mb-2">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={productDetails.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="inStockValue" className="block font-medium mb-2">
            In Stock
          </label>
          <input
            type="number"
            id="inStockValue"
            name="inStockValue"
            value={productDetails.inStockValue}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="soldStockValue" className="block font-medium mb-2">
            Sold Stock
          </label>
          <input
            type="number"
            id="soldStockValue"
            name="soldStockValue"
            value={productDetails.soldStockValue}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Stock'}
        </button>
      </form>
    </div>
  );
};

export default UpdateStock;
