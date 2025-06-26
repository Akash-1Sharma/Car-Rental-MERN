import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={{ padding: '10px', backgroundColor: '#222', color: '#fff' }}>
      <h3 style={{ display: 'inline', marginRight: '20px' }}>Admin Panel</h3>
      <Link to="/admin" style={{ color: '#fff', marginRight: '10px' }}>Dashboard</Link>
      <Link to="/admin/manage-cars" style={{ color: '#fff', marginRight: '10px' }}>Manage Cars</Link>
      <button onClick={handleLogout} style={{ marginLeft: 'auto', backgroundColor: 'red', color: 'white' }}>Logout</button>
    </nav>
  );
};

export default AdminNavbar;
