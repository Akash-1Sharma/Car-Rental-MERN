import React, { useEffect, useState } from 'react';
import API from '../utils/axios';
import AdminNavbar from '../components/AdminNavbar';


const ManageCars = () => {
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({
    name: '',
    image: '',
    rentPerHour: '',
    capacity: '',
    fuelType: ''
  });

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const fetchCars = async () => {
    try {
      const res = await API.get('/cars');
      setCars(res.data);
    } catch (err) {
      alert('Failed to load cars');
    }
  };

  const handleAddCar = async () => {
    try {
      await API.post('/cars/add', {
        name: newCar.name,
        image: newCar.image,
        rentPerHour: Number(newCar.rentPerHour),
        capacity: Number(newCar.capacity),
        fuelType: newCar.fuelType
      }, { headers });

      alert('Car added!');
      setNewCar({
        name: '',
        image: '',
        rentPerHour: '',
        capacity: '',
        fuelType: ''
      });
      fetchCars();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add car');
    }
  };

  const handleDeleteCar = async (id) => {
    try {
      await API.delete(`/cars/${id}`, { headers });
      alert('Car deleted');
      fetchCars();
    } catch (err) {
      alert('Failed to delete car');
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <AdminNavbar />

      <h2>Manage Cars</h2>

      <div style={{ marginBottom: 20 }}>
        <input type="text" placeholder="Car Name" value={newCar.name} onChange={(e) => setNewCar({ ...newCar, name: e.target.value })} />
        <input type="text" placeholder="Image URL" value={newCar.image} onChange={(e) => setNewCar({ ...newCar, image: e.target.value })} />
        <input type="number" placeholder="Rent Per Hour" value={newCar.rentPerHour} onChange={(e) => setNewCar({ ...newCar, rentPerHour: e.target.value })} />
        <input type="number" placeholder="Capacity" value={newCar.capacity} onChange={(e) => setNewCar({ ...newCar, capacity: e.target.value })} />
        <input type="text" placeholder="Fuel Type" value={newCar.fuelType} onChange={(e) => setNewCar({ ...newCar, fuelType: e.target.value })} />
        <button onClick={handleAddCar}>Add Car</button>
      </div>

      {cars.map((car) => (
        <div key={car._id} style={{ border: '1px solid #aaa', padding: 10, marginBottom: 10 }}>
          <p><strong>{car.name}</strong></p>
          <p>₹{car.rentPerHour}/hr</p>
          <button onClick={() => handleDeleteCar(car._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ManageCars;
