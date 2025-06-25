import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home'; // for regular users
import CarDetails from './pages/CarDetails';
import MyBookings from './pages/MyBookings';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} /> {/* For regular users */}
      <Route path="/admin" element={<AdminDashboard />} /> {/* For admin */}
      <Route path="/car/:id" element={<CarDetails />} />
      <Route path="/mybookings" element={<MyBookings />} />
    </Routes>
  );
}

export default App;
