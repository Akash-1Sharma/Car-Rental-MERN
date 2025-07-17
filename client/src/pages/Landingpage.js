import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Land.css'; // for external styling
import FrontNavbar from '../components/FrontNavbar';

const Land = () => {
  return (
    <div style={{ padding: 20 }}>
        <FrontNavbar/>
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <h1>Rent the Perfect Car for Your Journey</h1>
        <p>Affordable, Reliable, Convenient</p>
        <Link to="/Our-fleet" className="cta-button">View Our Fleet</Link>
      </section>

      {/* Why Choose Us */}
     <section className="why-choose-us">
  <h2>Why Choose Our Car Rental Service?</h2>
  <div className="features">
    <div className="feature-card">
      <h3>Wide Range of Cars</h3>
      <p>Choose from economy to luxury vehicles for any occasion.</p>
    </div>
    <div className="feature-card">
      <h3>Affordable Rates</h3>
      <p>Transparent pricing with no hidden fees.</p>
    </div>
    <div className="feature-card">
      <h3>Easy Booking</h3>
      <p>Quick and convenient online reservations.</p>
    </div>
    <div className="feature-card">
      <h3>24/7 Support</h3>
      <p>We’re here to help you anytime during your rental.</p>
    </div>
  </div>
</section>

      {/* Carousel / Running Images */}
    
      <section className="car-carousel">
  <h2>Explore Our Cars</h2>
  <div className="marquee">
    <div className="marquee-content">
      <img src="https://media.architecturaldigest.com/photos/66a914f1a958d12e0cc94a8e/16:9/w_2992,h_1683,c_limit/DSC_5903.jpg" alt="Car 1" />
      <img src="https://media.architecturaldigest.com/photos/66a914f1a958d12e0cc94a8e/16:9/w_2992,h_1683,c_limit/DSC_5903.jpg" alt="Car 2" />
      <img src="https://media.architecturaldigest.com/photos/66a914f1a958d12e0cc94a8e/16:9/w_2992,h_1683,c_limit/DSC_5903.jpg" alt="Car 3" />
      <img src="https://media.architecturaldigest.com/photos/66a914f1a958d12e0cc94a8e/16:9/w_2992,h_1683,c_limit/DSC_5903.jpg" alt="Car 4" />
      <img src="https://media.architecturaldigest.com/photos/66a914f1a958d12e0cc94a8e/16:9/w_2992,h_1683,c_limit/DSC_5903.jpg" alt="Car 5" />
    </div>
  </div>
</section>


      {/* About Us */}
      <section className="about">
        <h2>About Us</h2>
        <p>We are committed to providing affordable, reliable, and safe car rentals across the city. Choose from a wide range of well-maintained vehicles for every need.</p>
      </section>

      {/* Footer */}
      <footer className="footer">
  <div className="footer-content">
    <div className="footer-brand">
      <h3>CarRentalPro</h3>
      <p>Your trusted car rental partner. Premium cars. Great service. Best prices.</p>
    </div>

    <div className="footer-links">
      <h4>Quick Links</h4>
      <ul>
        <li><a href="/our-fleet">Our Fleet</a></li>
        <li><a href="/offers">Offers</a></li>
        <li><a href="/addresses">Our Offices</a></li>
        <li><a href="/contact">Contact & About</a></li>
      </ul>
    </div>

    <div className="footer-contact">
      <h4>Contact Us</h4>
      <p>Email: support@carrentalpro.com</p>
      <p>Phone: +91-9876543210</p>
      <p>Address: Main Street, Your City</p>
    </div>
  </div>

  <div className="footer-bottom">
    <p>© {new Date().getFullYear()} CarRentalPro. All rights reserved.</p>
  </div>
</footer>

    </div>
    </div>
  );
};

export default Land;
