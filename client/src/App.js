import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import CarDetails from './pages/CarDetails';
import MyBookings from './pages/MyBookings';
import AdminDashboard from './pages/AdminDashboard';
import ManageCars from './pages/ManageCars';
import Land from './pages/Landingpage';
import OurFleet from './pages/OurFleet';
import Offers from './pages/Offers';
import Offices from './pages/Offices';
import ContactAbout from './pages/ContactAbout';





function App() {
  return (
    <BrowserRouter>
          <Routes>
        <Route path="/" element={<Navigate to="/land" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/car/:id" element={<CarDetails />} />
        <Route path="/mybookings" element={<MyBookings />} />
        <Route path="/admin/manage-cars" element={<ManageCars />} />
        <Route path='land' element={<Land />} />
        <Route path="/our-fleet" element={<OurFleet />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/offices" element={<Offices />} />
        <Route path="/contact" element={<ContactAbout />} />



  
      </Routes>
    </BrowserRouter>
  );
}

export default App;