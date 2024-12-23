import React, { useEffect, useState } from 'react'
import ComplainList from '../components/seller/ComplainList';

const SellerDesktop = () => {
    const [complaints, setComplaints] = useState([]);
    useEffect(() => {
        API.get('/get-complaints')
          .then(response => {
            setComplaints(response.data.complaints);
          })
          .catch(error => {
            console.error('There was an error fetching the complaints!', error);
          });
      }, []);
  return (
    <div>
         <ComplainList complaints={complaints} />
    </div>
  )
}

export default SellerDesktop