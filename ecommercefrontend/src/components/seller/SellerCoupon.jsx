import React, { useState, useEffect } from 'react';
import API from '../../service/api';

const SellerCoupon = () => {
  const [code, setCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [coupons, setCoupons] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch coupons
  const fetchCoupons = async () => {
    try {
      const response = await API.get('/get-coupon');
      setCoupons(response.data.coupons);
    } catch (err) {
      setError('Error fetching coupons');
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  // Save coupon
  const handleSaveCoupon = async () => {
    if (!code || !discountPercentage) {
      setError('Both fields are required');
      return;
    }
    try {
      const response = await API.post('/save-coupon', { code, discountPercentage });
      setMessage(response.data.message);
      fetchCoupons();
      setCode('');
      setDiscountPercentage('');
    } catch (err) {
      setError('Error saving coupon');
    }
  };

  // Delete coupon
  const handleDeleteCoupon = async (couponCode) => {
    try {
      const response = await API.delete('/delete-coupon', { data: { code: couponCode } });
      setMessage(response.data.message);
      fetchCoupons();
    } catch (err) {
      setError('Error deleting coupon');
    }
  };

  return (
    <div>
      <h3>Seller Coupon Management</h3>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      <div>
        <h4>Create New Coupon</h4>
        <input
          type="text"
          placeholder="Coupon Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <input
          type="number"
          placeholder="Discount Percentage"
          value={discountPercentage}
          onChange={(e) => setDiscountPercentage(e.target.value)}
        />
        <button onClick={handleSaveCoupon}>Save Coupon</button>
      </div>

      <div>
        <h4>All Coupons</h4>
        <ul>
          {coupons.length > 0 ? (
            coupons.map((coupon, index) => (
              <li key={index}>
                <span>{coupon.code} - {coupon.discountPercentage}%</span>
                <button onClick={() => handleDeleteCoupon(coupon.code)}>Delete</button>
              </li>
            ))
          ) : (
            <p>No coupons available</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SellerCoupon;
