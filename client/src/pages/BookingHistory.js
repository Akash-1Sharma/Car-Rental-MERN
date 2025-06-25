import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import API from '../utils/axios';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await API.get('/bookings/my', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
      } catch (err) {
        alert('Error loading bookings');
        console.error(err);
      }
    };

    fetchBookings();
  }, []);

  const now = new Date();
  const pastBookings = bookings.filter(b => new Date(b.toTime) < now);

  return (
    <div style={{ padding: 20 }}>
      <Navbar />
      <h2>Past Bookings</h2>
      {pastBookings.length === 0 ? (
        <p>No past bookings found.</p>
      ) : (
        pastBookings.map((b) => {
          const durationHours = Math.ceil((new Date(b.toTime) - new Date(b.fromTime)) / (1000 * 60 * 60));
          const rent = b.car?.rentPerHour || 0;
          const carName = b.car?.name || 'Unknown Car';

          return (
            <div key={b._id} style={{ border: '1px solid #ccc', margin: '1rem 0', padding: 10 }}>
              <h3>{carName}</h3>
              <p>From: {new Date(b.fromTime).toLocaleString()}</p>
              <p>To: {new Date(b.toTime).toLocaleString()}</p>
              <p>Duration: {durationHours} hours</p>
              <p>Total Cost: ₹{durationHours * rent}</p>
              <p>Status: {b.status || 'confirmed'}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default BookingHistory;
