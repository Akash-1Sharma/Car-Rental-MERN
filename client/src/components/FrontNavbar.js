// src/components/FrontNavbar.jsx

import React, { useState } from 'react';
import './FrontNavbar.css';
import { Link } from 'react-router-dom';

const FrontNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="front-navbar">
      <div className="navbar-logo">AutoFleet</div>

      <div className="navbar-hamburger" onClick={toggleMobileMenu}>
        ☰
      </div>

      <div className={`navbar-menu-container ${menuOpen ? 'open' : ''}`}>
        <Link to="/land">Home</Link>
        <Link to="/Our-Fleet">Browse Cars</Link>
        
        <Link to="/offers">Offers</Link>
        <Link to="/offices">Locations</Link>
        <Link to="/contact">About</Link>
      </div>

      <div className="navbar-right">
        <Link className="navbar-login" to="/login">Login</Link>
        <Link to="/register">
          <button className="navbar-signup">Sign Up</button>
        </Link>
      </div>
    </nav>
  );
};

export default FrontNavbar;
