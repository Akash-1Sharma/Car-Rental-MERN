// import React, { useState } from 'react';
// import API from '../utils/axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [form, setForm] = useState({ email: '', password: '' });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const res = await API.post('/auth/login', form);
//     const { token, user } = res.data;

//     localStorage.setItem('token', token);
//     localStorage.setItem('isAdmin', user.isAdmin); // Store user role

//     alert('Login successful!');

//     if (user.isAdmin) {
//       navigate('/admin');
//     } else {
//       navigate('/home');
//     }

//   } catch (err) {
//     alert(err.response?.data?.error || 'Login failed');
//   }
// };


//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Login</h2>
//       <input name="email" onChange={handleChange} placeholder="Email" required />
//       <input name="password" type="password" onChange={handleChange} placeholder="Password" required />
//       <button type="submit">Login</button>
//       <div style={{ marginTop: '1rem' }}>
//   <p>Don't have an account?</p>
//   <button
//     onClick={() => navigate('/register')}
//     style={{
//       padding: '8px 16px',
//       backgroundColor: '#007bff',
//       color: '#fff',
//       border: 'none',
//       borderRadius: '4px',
//       cursor: 'pointer'
//     }}
//   >
//     Register
//   </button>
// </div>

//     </form>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import API from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import FrontNavbar from '../components/FrontNavbar';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('isAdmin', user.isAdmin);

      if (rememberMe) {
        localStorage.setItem('rememberedEmail', form.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

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
    <div>
      <FrontNavbar />
    <div className="login-container">
      <div className="login-wrapper">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-title">Login</h2>
          
          <div className="login-input-field">
            <input 
              name="email" 
              type="email" 
              onChange={handleChange} 
              required 
            />
            <label>Email</label>
          </div>
          
          <div className="login-input-field">
            <input 
              name="password" 
              type="password" 
              onChange={handleChange} 
              required 
            />
            <label>Password</label>
          </div>
          
          <div className="login-forget">
            <label>
              <input 
                type="checkbox" 
                id="remember" 
                checked={rememberMe}
                onChange={handleRememberMe}
              />
              <p>Remember me</p>
            </label>
            <a href="/forgot-password" className="login-link">Forgot password?</a>
          </div>
          
          <button type="submit" className="login-button">Login</button>
          
          <div className="login-register">
            <p>Don't have an account?{' '}
              <button 
                type="button" 
                className="login-register-button"
                onClick={() => navigate('/register')}
              >
                Register
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Login;
