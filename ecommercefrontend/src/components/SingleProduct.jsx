import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../service/api';
import CouponManage from './CouponManage';

const SingleProduct = () => {
  const { productId } = useParams(); // Extract productId from the URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await API.get(`/product/${productId}`); // Adjust URL if needed
        if (response.data.success) {
          setProduct(response.data.product);
        } else {
          setError(response.data.message || 'Product not found');
        }
      } catch (err) {
        setError('Error fetching product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <div className="text-center mt-8 text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-3xl font-bold mb-4">{product.name || 'Product Name'}</h2>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Product Image */}
        <div className="flex-1">
          <img
            src={product.img || 'default-image.jpg'} // Use a default image if none exists
            alt={product.name || 'Product'}
            className="w-full max-h-[400px] object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <p className="text-lg text-gray-700 mb-4">
            <span className="font-semibold">Price:</span> ₹{product.price || 'N/A'}
          </p>
          <p className="text-lg text-gray-700 mb-4">
            <span className="font-semibold">Category:</span> {product.category || 'Not Available'}
          </p>
          
          <p className="text-lg text-gray-600 mb-4">
            <span className="font-semibold">In Stock:</span> {product.inStockValue || 'Out of stock'}
          </p>
          <p className="text-lg text-gray-600 mb-4">
            <span className="font-semibold">Sold:</span> {product.soldStockValue || 'No sales yet'}
          </p>
          <div class="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
      <div class="space-x-2 flex text-sm">
        <label>
          <input class="sr-only peer" name="size" type="radio" value="xs" checked />
          <div class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
            XS
          </div>
        </label>
        <label>
          <input class="sr-only peer" name="size" type="radio" value="s" />
          <div class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
            S
          </div>
        </label>
        <label>
          <input class="sr-only peer" name="size" type="radio" value="m" />
          <div class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
            M
          </div>
        </label>
        <label>
          <input class="sr-only peer" name="size" type="radio" value="l" />
          <div class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
            L
          </div>
        </label>
        <label>
          <input class="sr-only peer" name="size" type="radio" value="xl" />
          <div class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
            XL
          </div>
        </label>
      </div>
    </div>

    <p className="text-lg text-yellow-500 mb-4">
            <span className="font-semibold">Rating:</span> {product.rating || 'N/A'} / 5
          </p>
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">
            Add to Cart
          </button>
         
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
