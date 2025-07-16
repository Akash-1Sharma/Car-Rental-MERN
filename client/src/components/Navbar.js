import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/usernavbar.css'; // ✅ Correct file

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out successfully!');
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="user-navbar">
      <div className="user-navbar-logo">AutoFleet</div>

      {/* Hamburger for mobile */}
      {isMobile && (
        <div className="user-navbar-hamburger" onClick={toggleMenu}>
          {menuOpen ? '✕' : '☰'}
        </div>
      )}

      {/* Center Nav Items */}
      {!isMobile ? (
        <div className="user-navbar-menu-container">
          <Link to="/home">Home</Link>
          <Link to="/mybookings">My Bookings</Link>
        </div>
      ) : (
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="user-navbar-mobile-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Link to="/home" onClick={toggleMenu}>Home</Link>
              <Link to="/mybookings" onClick={toggleMenu}>My Bookings</Link>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Logout Button */}
      <button className="user-navbar-logout" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
