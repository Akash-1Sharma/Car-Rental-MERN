import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

import API from '../utils/axios';

const Home = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await API.get('/cars');
      setCars(res.data);
    } catch (err) {
      console.error('Error fetching cars', err);
      alert('Failed to load cars');
    }
  };

  return (
    
    <div style={{ padding: 20 }}>
      <Navbar/>
    
      <h2>Available Cars</h2>
      {cars.length === 0 && <p>No cars available.</p>}
      {cars.map((car) => (
        <div key={car._id} style={{ border: '1px solid #aaa', padding: 10, marginBottom: 10 }}>
          <img src={car.image} alt={car.name} style={{ width: '100%', maxHeight: 200, objectFit: 'cover' }} />
          <h3>{car.name}</h3>
          <p>Rent: ₹{car.rentPerHour} / hour</p>
          <p>Fuel Type: {car.fuelType}</p>
          <p>Capacity: {car.capacity} people</p>
          <button onClick={() => navigate(`/car/${car._id}`)}>View Details</button>
        </div>
      ))}
    
</div>
  );
};

export default Home;
