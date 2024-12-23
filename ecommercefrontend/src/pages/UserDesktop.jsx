import React, { useState } from 'react'
import ComplainForm from '../components/Users/CompalinForm';

const UserDesktop = () => {
    const [complaints, setComplaints] = useState([]);

  const addComplaint = (newComplaint) => {
    setComplaints([...complaints, newComplaint]);
  };
  return (
    <div>
        <ComplainForm addComplaint={addComplaint} />
        </div>
  )
}

export default UserDesktop