import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../utils/axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from '../components/Navbar';


const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [fromTime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);

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

  const handleBooking = async () => {
    if (!fromTime || !toTime) {
      alert('Please select from and to time');
      return;
    }

    if (fromTime >= toTime) {
      alert('End time must be after start time');
      return;
    }

    try {
      await API.post(
        '/bookings/book',
        {
          carId: car._id,
          fromTime,
          toTime
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      alert('Car booked successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Booking failed');
    }
  };

  if (!car) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: '0 auto' }}>
      <h2>{car.name}</h2>
      <Navbar />
    <div style={{ padding: 20 }}></div>

      {/* ✅ Car Image */}
      {car.image && (
        <img
          src={car.image}
          alt={car.name}
          style={{ width: '100%', maxHeight: 300, objectFit: 'cover', marginBottom: 15 }}
        />
      )}

      {/* ✅ Car Details */}
      <p><strong>Rent per hour:</strong> ₹{car.rentPerHour}</p>
      <p><strong>Capacity:</strong> {car.capacity} people</p>
      <p><strong>Fuel Type:</strong> {car.fuelType}</p>
      <br />

      {/* ✅ Booking Section */}
      <div>
        <label><strong>From: </strong></label>
        <DatePicker
          selected={fromTime}
          onChange={(date) => setFromTime(date)}
          showTimeSelect
          timeFormat="HH:mm"
          dateFormat="Pp"
        />
      </div>
      <div>
        <label><strong>To: </strong></label>
        <DatePicker
          selected={toTime}
          onChange={(date) => setToTime(date)}
          showTimeSelect
          timeFormat="HH:mm"
          dateFormat="Pp"
        />
      </div>
      <br />
      <button onClick={handleBooking}>Book Now</button>
    </div>
  );
};

export default CarDetails;
