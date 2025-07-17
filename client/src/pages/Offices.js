import React from 'react';
import '../styles/Offices.css';
import FrontNavbar from '../components/FrontNavbar';


const Offices = () => {
  const locations = [
    {
      city: 'Delhi',
      address: '123 Connaught Place, New Delhi - 110001',
      phone: '+91 99999 11111',
      hours: '9 AM - 9 PM',
    },
    {
      city: 'Mumbai',
      address: '456 Bandra Kurla Complex, Mumbai - 400051',
      phone: '+91 88888 22222',
      hours: '10 AM - 8 PM',
    },
    {
      city: 'Bangalore',
      address: '789 MG Road, Bangalore - 560001',
      phone: '+91 77777 33333',
      hours: '8 AM - 10 PM',
    },
  ];

  return (
    <div style={{ padding: 20 }}>
       <FrontNavbar/> 
    <div className="offices-page">
      <h2>Our Office Locations</h2>
      <div className="office-list">
        {locations.map((loc, index) => (
          <div key={index} className="office-card">
            <h3>{loc.city}</h3>
            <p><strong>Address:</strong> {loc.address}</p>
            <p><strong>Phone:</strong> {loc.phone}</p>
            <p><strong>Working Hours:</strong> {loc.hours}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Offices;
