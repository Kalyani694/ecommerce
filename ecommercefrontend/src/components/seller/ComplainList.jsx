import React from 'react';

const ComplainList = ({ complaints }) => {
  return (
    <div>
      <h2>All Complaints</h2>
      <table>
        <thead>
          <tr>
            <th>Complaint ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint.complaintNumber}>
              <td>{complaint.complaintNumber}</td>
              <td>{complaint.name}</td>
              <td>{complaint.email}</td>
              <td>{complaint.status}</td>
              <td>{complaint.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplainList;
