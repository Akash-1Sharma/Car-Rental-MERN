// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out successfully!');
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <Link to="/home" style={styles.link}>Home</Link>
        <Link to="/mybookings" style={styles.link}>My Bookings</Link>
      </div>
      <button onClick={handleLogout} style={styles.logout}>Logout</button>
    </nav>
  );
};

const styles = {
  nav: {
    background: '#333',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  left: {
    display: 'flex',
    gap: '20px'
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  logout: {
    background: '#ff4d4f',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: 5,
    cursor: 'pointer'
  }
};

export default Navbar;
