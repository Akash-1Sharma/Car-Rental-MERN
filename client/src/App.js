import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import CarDetails from './pages/CarDetails';
import MyBookings from './pages/MyBookings';



function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/car/:id" element={<CarDetails />} />
      <Route path="/mybookings" element={<MyBookings />} />

    </Routes>
  );
}

export default App;
