import React, { useState } from 'react';
import API from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await API.post('/auth/login', form);
    const { token, user } = res.data;

    localStorage.setItem('token', token);
    localStorage.setItem('isAdmin', user.isAdmin); // Store user role

    alert('Login successful!');

    if (user.isAdmin) {
      navigate('/admin');
    } else {
      navigate('/home');
    }

  } catch (err) {
    alert(err.response?.data?.error || 'Login failed');
  }
};


  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input name="email" onChange={handleChange} placeholder="Email" required />
      <input name="password" type="password" onChange={handleChange} placeholder="Password" required />
      <button type="submit">Login</button>
      <div style={{ marginTop: '1rem' }}>
  <p>Don't have an account?</p>
  <button
    onClick={() => navigate('/register')}
    style={{
      padding: '8px 16px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    }}
  >
    Register
  </button>
</div>

    </form>
  );
};

export default Login;
