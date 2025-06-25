import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import API from '../utils/axios';


const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await API.get('/bookings/my', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(res.data);
      } catch (err) {
        alert('Error loading bookings');
        console.error(err);
      }
    };

    fetchBookings();
  }, []);

  if (!bookings.length) return <p>No bookings found.</p>;

  return (
    <div style={{ padding: 20 }}>
      <Navbar />
    <div style={{ padding: 20 }}></div>
      <h2>My Bookings</h2>
      {bookings.map((b) => (
        <div key={b._id} style={{ border: '1px solid #ccc', margin: '1rem 0', padding: 10 }}>
          <h3>{b.carId?.name}</h3>
          <p>From: {new Date(b.fromTime).toLocaleString()}</p>
          <p>To: {new Date(b.toTime).toLocaleString()}</p>
          <p>
            Duration: {Math.ceil((new Date(b.toTime) - new Date(b.fromTime)) / (1000 * 60 * 60))} hours
          </p>
          <p>
            Total Cost: ₹
            {Math.ceil((new Date(b.toTime) - new Date(b.fromTime)) / (1000 * 60 * 60)) *
              b.carId?.rentPerHour}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
