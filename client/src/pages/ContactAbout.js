import React from 'react';
import '../styles/ContactAbout.css';
import FrontNavbar from '../components/FrontNavbar';


const ContactAbout = () => {
  const drivers = [
    { name: 'Rajesh Kumar', experience: '5 years', phone: '+91 98765 43210' },
    { name: 'Anil Sharma', experience: '8 years', phone: '+91 91234 56789' },
    { name: 'Sunil Verma', experience: '4 years', phone: '+91 99887 77665' },
  ];

  return (
    <div style={{ padding: 20 }}>
       <FrontNavbar/>
    <div className="contact-about-page">
      <h2>About Our Car Rental Service</h2>
      <p>
        We are committed to providing safe, reliable, and comfortable rides at affordable prices.
        Our fleet is well-maintained, and our experienced drivers ensure you have a smooth journey.
      </p>

      <h3>Contact Information</h3>
      <ul>
        <li><strong>Phone:</strong> +91 99999 00000</li>
        <li><strong>Email:</strong> info@carrentalstore.com</li>
        <li><strong>Office Hours:</strong> 8 AM - 10 PM</li>
      </ul>

      <h3>Meet Our Drivers</h3>
      <div className="driver-list">
        {drivers.map((driver, index) => (
          <div key={index} className="driver-card">
            <h4>{driver.name}</h4>
            <p><strong>Experience:</strong> {driver.experience}</p>
            <p><strong>Phone:</strong> {driver.phone}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default ContactAbout;
