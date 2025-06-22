import React, { useEffect, useState } from 'react';
import API from '../utils/axios';
import CarCard from '../components/CarCard';
// import { Link } from 'react-router-dom';

const Home = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    console.log('Home component mounted');
    const fetchCars = async () => {
      try {
        const res = await API.get('/cars');
        console.log('Cars fetched:', res.data);
        setCars(res.data);
      } catch (err) {
        console.error('Failed to load cars', err);
      }
    };

    fetchCars();
  }, []);

  return (
    <div>
      <h2>Available Cars</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {cars.map((car) => (
          <CarCard key={car._id} car={car} />
          
        ))}
      </div>
    </div>
  );
};

export default Home;
