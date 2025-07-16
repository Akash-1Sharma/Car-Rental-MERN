import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Land.css'; // for external styling
import FrontNavbar from '../components/FrontNavbar';

const Land = () => {
  return (
    <div>
        <FrontNavbar/>
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <h1>Rent the Perfect Car for Your Journey</h1>
        <p>Affordable, Reliable, Convenient</p>
        <Link to="/fleet" className="cta-button">View Our Fleet</Link>
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
      <section className="carousel">
        <h2>Our Cars</h2>
        <div className="scrolling-images">
          <img src="/images/car1.jpg" alt="Car 1" />
          <img src="/images/car2.jpg" alt="Car 2" />
          <img src="/images/car3.jpg" alt="Car 3" />
          {/* Add more images */}
        </div>
      </section>

      {/* About Us */}
      <section className="about">
        <h2>About Us</h2>
        <p>We are committed to providing affordable, reliable, and safe car rentals across the city. Choose from a wide range of well-maintained vehicles for every need.</p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/fleet">Our Fleet</Link>
          <Link to="/offers">Offers</Link>
          <Link to="/offices">Our Offices</Link>
          <Link to="/contact">Contact & About</Link>
        </nav>
        <p>&copy; 2025 Car Rental Service. All rights reserved.</p>
      </footer>
    </div>
    </div>
  );
};

export default Land;
