import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import Link from react-router-dom
import API from '../service/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get('/get-product'); // Adjust URL if needed
        if (response.data.success && Array.isArray(response.data.products)) {
          setProducts(response.data.products); // Access 'products' array
        } else {
          setError('No products found');
        }
      } catch (err) {
        setError('Failed to fetch products');
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      // Replace 'userId' with actual user identification logic
      const userId = "current-user-id"; 
      const response = await API.post('/cart/add-item', {
        userId,
        productId: product._id,
        productName: product.name,
        productPrice: product.price,
        productQty: 1, // Default quantity
      });

      if (response.data.success) {
        alert('Product added to cart!');
      } else {
        alert('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error adding product to cart');
    }
  };

  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = Math.floor(rating);
    const emptyStars = totalStars - filledStars;
    const halfStar = rating % 1 !== 0;

    return (
      <div className="flex items-center space-x-1">
        {[...Array(filledStars)].map((_, index) => (
          <svg key={index} className="w-4 h-4 text-yellow-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M10 15l-3.09 1.636 1.178-3.873L4 7.953l4.026-.297L10 3l1.974 4.656L16 7.953l-4.089 4.81L13.09 16.636 10 15z" />
          </svg>
        ))}
        {halfStar && (
          <svg className="w-4 h-4 text-yellow-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M10 15l-3.09 1.636 1.178-3.873L4 7.953l4.026-.297L10 3l1.974 4.656L16 7.953l-4.089 4.81L13.09 16.636 10 15z" />
          </svg>
        )}
        {[...Array(emptyStars)].map((_, index) => (
          <svg key={index} className="w-4 h-4 text-gray-400" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M10 15l-3.09 1.636 1.178-3.873L4 7.953l4.026-.297L10 3l1.974 4.656L16 7.953l-4.089 4.81L13.09 16.636 10 15z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">All Products</h2>
      {error && <p className="text-center text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
            >
              <Link to={`/product/${product._id}`}>  {/* Make the product clickable */}
                <div className="relative">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-70 object-cover"
                    loading="lazy"
                  />
                </div>
              </Link>
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">Category: {product.category}</p>
                  <div className="text-lg font-bold text-violet-600 mb-4">Price: ₹{product.price}</div>
                  <div className="text-sm text-gray-500 mb-2">
                    Stock: <span className="text-gray-800">{product.inStockValue}</span>
                  </div>
                 
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
   <div className="text-sm text-gray-600 mb-4">
                    Rating: {renderStars(product.rating)} {/* Display stars for the rating */}
                  </div>
                </div>
                <div className="flex mt-6 space-x-4">
                <button
        onClick={() => navigate('/checkout', { state: { product } })}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 hover:bg-yellow-100 transition"
      >
        Buy Now
      </button>

                  <button onClick={() => handleAddToCart(product)} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 hover:bg-yellow-100 transition">
                    Add to Cart
                  </button>
                </div>
                <button
                  className="mt-4 flex items-center justify-center w-10 h-10 mx-auto text-yellow-600 bg-violet-100 rounded-full hover:bg-violet-200 transition"
                  aria-label="Like"
                >
                  <svg width="20" height="20" fill="currentColor" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No products available</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
