import React, { useState } from 'react';
import API from '../utils/axios';
import '../styles/Register.css';
import srtImage from '../images/SRT.webp'; 
import FrontNavbar from '../components/FrontNavbar';
// ✅ import your image here

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      alert('Registered successfully!');
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div>
    <FrontNavbar />
    <div className="register-container">
      <div className="form-section">
        <form onSubmit={handleSubmit} className="register-form">
          <h1>Register</h1>
          <input
            name="name"
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            name="email"
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            name="password"
            type="password"
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <button type="submit">Register</button>
        </form>
      </div>
      <div className="image-section">
        
        <img src={srtImage} alt="SRT Car" className="car-image" /> 
      </div>
    </div>
  </div>
  );
};

export default Register;
