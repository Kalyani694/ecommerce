import React from 'react';
import SellerCoupon from './seller/SellerCoupon';
import UserCoupon from './Users/UserCoupon';


const CouponManage = ({ role }) => {
  return (
    <div className="container">
      {role === 'seller' ? (
        <SellerCoupon />
      ) : (
        <UserCoupon />
      )}
    </div>
  );
};

export default CouponManage;
