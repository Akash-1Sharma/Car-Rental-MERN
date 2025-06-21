import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../utils/axios';

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await API.get(`/cars/${id}`);
        setCar(res.data);
      } catch (err) {
        console.error('Error fetching car details', err);
      }
    };

    fetchCar();
  }, [id]);

  if (!car) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>{car.name}</h2>
      <p>{car.description || 'No description'}</p>
      <p>Rent per hour: ₹{car.rentPerHour}</p>
      <p>Seats: {car.seats || 'N/A'}</p>
      <p>Fuel: {car.fuelType || 'N/A'}</p>

      {/* Placeholder: We'll add date/time & booking in Day 8 */}
      <p><b>Booking UI Coming Tomorrow...</b></p>
    </div>
  );
};

export default CarDetails;
