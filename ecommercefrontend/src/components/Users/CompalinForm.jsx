import React, { useState } from 'react';

import API from '../../service/api';

const ComplainForm = ({ addComplaint }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [userType, setUserType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const complaintData = {
      name,
      email,
      message,
      userType
    };

    API.post('/post-complaints', complaintData)
      .then(response => {
        addComplaint(response.data.complaint);
        setIsLoading(false);
        alert('Complaint registered successfully. A confirmation email has been sent.');
      })
      .catch(error => {
        setIsLoading(false);
        alert('There was an error registering your complaint.');
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Register a Complaint</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>User Type:</label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            required
          >
            <option value="">Select User Type</option>
            <option value="Customer">Customer</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div>
          <label>Complaint Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit Complaint'}
        </button>
      </form>
    </div>
  );
};

export default ComplainForm;
