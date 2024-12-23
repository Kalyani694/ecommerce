import React from 'react'
import API from '../../service/api';

const SellerLogout = ({ sellerId }) => {
    const handleLogout = async () => {
        try {
          await API.post('/logout', { sellerId });
          alert('Logged out successfully');
        } catch (error) {
          alert('Logout failed');
        }
      };
    
      return <button onClick={handleLogout}>Logout</button>;
    
}

export default SellerLogout