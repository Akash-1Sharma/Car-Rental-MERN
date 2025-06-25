import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import API from '../utils/axios';

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [bookings, setBookings] = useState({
    upcoming: [],
    past: [],
    cancelled: []
  });

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await API.get('/bookings/my', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const now = new Date();

      const upcoming = [];
      const past = [];
      const cancelled = [];

      res.data.forEach((b) => {
        if (b.status === 'cancelled') {
          cancelled.push(b);
        } else if (new Date(b.toTime) <= now) {
          past.push(b);
        } else {
          upcoming.push(b);
        }
      });

      setBookings({ upcoming, past, cancelled });
    } catch (err) {
      alert('Error loading bookings');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBooking = async (id) => {
    const confirm = window.confirm('Are you sure you want to cancel this booking?');
    if (!confirm) return;

    try {
      const token = localStorage.getItem('token');
      await API.patch(`/bookings/cancel/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBookings(); // Reload all categories
      alert('Booking cancelled');
    } catch (err) {
      alert('Failed to cancel booking');
      console.error(err);
    }
  };

  const BookingCard = ({ b, isPast }) => {
    const from = new Date(b.fromTime);
    const to = new Date(b.toTime);
    const durationHours = Math.ceil((to - from) / (1000 * 60 * 60));
    const rent = b.car?.rentPerHour || 0;
    const carName = b.car?.name || 'Unknown Car';

    return (
      <div key={b._id} style={{ border: '1px solid #ccc', margin: '1rem 0', padding: 10 }}>
        {b.car?.image && (
          <img
            src={b.car.image}
            alt={carName}
            style={{ width: '100%', maxWidth: 300, height: 'auto', marginBottom: 10 }}
          />
        )}
        <h3>{carName}</h3>
        <p>From: {from.toLocaleString()}</p>
        <p>To: {to.toLocaleString()}</p>
        <p>Duration: {durationHours} hours</p>
        <p>Total Cost: ₹{durationHours * rent}</p>
        <p>Status: {b.status}</p>
        {!isPast && b.status !== 'cancelled' && (
          <button onClick={() => handleCancelBooking(b._id)}>Cancel Booking</button>
        )}
      </div>
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <Navbar />
      <h2>My Bookings</h2>

      {/* TABS */}
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setActiveTab('upcoming')}>Upcoming</button>
        <button onClick={() => setActiveTab('past')}>Past</button>
        <button onClick={() => setActiveTab('cancelled')}>Cancelled</button>
      </div>

      {/* TAB CONTENT */}
      {activeTab === 'upcoming' && (
        bookings.upcoming.length > 0 ? bookings.upcoming.map((b) => <BookingCard key={b._id} b={b} />)
        : <p>No upcoming bookings.</p>
      )}

      {activeTab === 'past' && (
        bookings.past.length > 0 ? bookings.past.map((b) => <BookingCard key={b._id} b={b} isPast />)
        : <p>No past bookings.</p>
      )}

      {activeTab === 'cancelled' && (
        bookings.cancelled.length > 0 ? bookings.cancelled.map((b) => <BookingCard key={b._id} b={b} isPast />)
        : <p>No cancelled bookings.</p>
      )}
    </div>
  );
};

export default MyBookings;
