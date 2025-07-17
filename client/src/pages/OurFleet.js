import React, { useEffect, useState } from 'react';
import API from '../utils/axios';
import '../styles/OurFleet.css';
import FrontNavbar from '../components/FrontNavbar';

const OurFleet = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await API.get('/cars');
      setCars(res.data);
    } catch (err) {
      alert('Failed to load cars');
    }
  };

  return (
    <div style={{ padding: 20 }}>
       <FrontNavbar/>
    <div className="fleet-page">
      <h2>Our Fleet</h2>
      <p>Explore our premium selection of cars for rent. Choose comfort, luxury, and reliability for your journey.</p>

      <div className="fleet-grid">
        {cars.map(car => (
          <div key={car._id} className="fleet-card">
            <img src={car.image} alt={car.name} />
            <h3>{car.name}</h3>
            <p><strong>Rent Per Hour:</strong> ₹{car.rentPerHour}</p>
            <p><strong>Capacity:</strong> {car.capacity} persons</p>
            <p><strong>Fuel Type:</strong> {car.fuelType}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default OurFleet;
