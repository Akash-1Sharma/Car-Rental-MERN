import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../utils/axios';
import DatePicker from 'react-datepicker';


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

    try {
  await API.post('/bookings/book', {
    carId: car._id,
    fromTime,
    toTime
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });

  alert('Car booked successfully!');
} catch (err) {
  alert(err.response?.data?.message || 'Booking failed');
}
  };

  if (!car) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>{car.name}</h2>
      <p>{car.description || 'No description'}</p>
      <p>Rent per hour: ₹{car.rentPerHour}</p>
      <br />

      <div>
        <label>From: </label>
        <DatePicker
          selected={fromTime}
          onChange={(date) => setFromTime(date)}
          showTimeSelect
          timeFormat="HH:mm"
          dateFormat="Pp"
        />
      </div>
      <div>
        <label>To: </label>
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
