// import React from 'react';
// import '../styles/ContactAbout.css';
// import FrontNavbar from '../components/FrontNavbar';


// const ContactAbout = () => {
//   const drivers = [
//     { name: 'Rajesh Kumar', experience: '5 years', phone: '+91 98765 43210' },
//     { name: 'Anil Sharma', experience: '8 years', phone: '+91 91234 56789' },
//     { name: 'Sunil Verma', experience: '4 years', phone: '+91 99887 77665' },
//   ];

//   return (
//     <div style={{ padding: 20 }}>
//        <FrontNavbar/>
//     <div className="contact-about-page">
//       <h2>About Our Car Rental Service</h2>
//       <p>
//         We are committed to providing safe, reliable, and comfortable rides at affordable prices.
//         Our fleet is well-maintained, and our experienced drivers ensure you have a smooth journey.
//       </p>

//       <h3>Contact Information</h3>
//       <ul>
//         <li><strong>Phone:</strong> +91 99999 00000</li>
//         <li><strong>Email:</strong> info@carrentalstore.com</li>
//         <li><strong>Office Hours:</strong> 8 AM - 10 PM</li>
//       </ul>

//       <h3>Meet Our Drivers</h3>
//       <div className="driver-list">
//         {drivers.map((driver, index) => (
//           <div key={index} className="driver-card">
//             <h4>{driver.name}</h4>
//             <p><strong>Experience:</strong> {driver.experience}</p>
//             <p><strong>Phone:</strong> {driver.phone}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//     </div>
//   );
// };

// export default ContactAbout;


// import React from 'react';
// import '../styles/ContactAbout.css';
// import FrontNavbar from '../components/FrontNavbar';
// import { FaPhone, FaEnvelope, FaClock, FaCar, FaUserTie, FaSmile, FaMapMarkerAlt } from 'react-icons/fa';

// const ContactAbout = () => {
//   const drivers = [
//     { name: 'Rajesh Kumar', experience: '5 years', phone: '+91 98765 43210', trips: 1200 },
//     { name: 'Anil Sharma', experience: '8 years', phone: '+91 91234 56789', trips: 2500 },
//     { name: 'Sunil Verma', experience: '4 years', phone: '+91 99887 77665', trips: 900 },
//   ];

//   const stats = [
//     { value: "500+", label: "Happy Customers" },
//     { value: "50+", label: "Vehicles in Fleet" },
//     { value: "24/7", label: "Customer Support" },
//     { value: "100%", label: "Safety Record" }
//   ];

//   return (
//     <div className="contact-about-container">
//       <FrontNavbar />
      
//       <div className="contact-about-page">
//         <section className="hero-section">
//           <h1>Your Journey, Our Priority</h1>
//           <p className="hero-subtitle">Trusted by thousands for reliable and comfortable transportation</p>
//         </section>

//         <div className="stats-grid">
//           {stats.map((stat, index) => (
//             <div key={index} className="stat-card">
//               <div className="stat-value">{stat.value}</div>
//               <div className="stat-label">{stat.label}</div>
//             </div>
//           ))}
//         </div>

//         <section className="about-section">
//           <h2>About Our Car Rental Service</h2>
//           <p>
//             With over 10 years in the industry, we are committed to providing safe, reliable, 
//             and comfortable rides at affordable prices. Our fleet of 50+ well-maintained vehicles 
//             and experienced drivers ensure you have a smooth journey every time.
//           </p>
          
//           <div className="features-grid">
//             <div className="feature-item">
//               <FaCar className="feature-icon" />
//               <h4>Modern Fleet</h4>
//               <p>Regularly serviced vehicles with latest amenities</p>
//             </div>
//             <div className="feature-item">
//               <FaUserTie className="feature-icon" />
//               <h4>Professional Drivers</h4>
//               <p>Verified, trained and experienced chauffeurs</p>
//             </div>
//             <div className="feature-item">
//               <FaSmile className="feature-icon" />
//               <h4>Customer Satisfaction</h4>
//               <p>98% positive feedback from our clients</p>
//             </div>
//           </div>
//         </section>

//         <section className="contact-section">
//           <h2>Contact Information</h2>
//           <ul className="contact-list">
//             <li>
//               <FaPhone className="contact-icon" />
//               <strong>Phone:</strong> +91 99999 00000 (24/7 Support)
//             </li>
//             <li>
//               <FaEnvelope className="contact-icon" />
//               <strong>Email:</strong> info@carrentalstore.com
//             </li>
//             <li>
//               <FaClock className="contact-icon" />
//               <strong>Office Hours:</strong> 8 AM - 10 PM
//             </li>
//             <li>
//               <FaMapMarkerAlt className="contact-icon" />
//               <strong>Headquarters:</strong> 123 Business Street, City, PIN 560001
//             </li>
//           </ul>
//         </section>

//         <section className="drivers-section">
//           <h2>Meet Our Expert Drivers</h2>
//           <p className="section-intro">Our professionally trained drivers average 4.8/5 customer rating</p>
          
//           <div className="driver-list">
//             {drivers.map((driver, index) => (
//               <div key={index} className="driver-card">
//                 <div className="driver-avatar">
//                   {driver.name.charAt(0)}
//                 </div>
//                 <h4>{driver.name}</h4>
//                 <p><strong>Experience:</strong> {driver.experience}</p>
//                 <p><strong>Trips Completed:</strong> {driver.trips.toLocaleString()}</p>
//                 <p><strong>Contact:</strong> {driver.phone}</p>
//                 <div className="driver-rating">4.7 - 4.9 ★</div>
//               </div>
//             ))}
//           </div>
//         </section>

//         <section className="cta-section">
//           <h3>Ready to book your perfect ride?</h3>
//           <button className="cta-button">Reserve Your Vehicle Now</button>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default ContactAbout;



import React, { useState } from 'react';
import '../styles/ContactAbout.css';
import FrontNavbar from '../components/FrontNavbar';

const ContactAbout = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const drivers = [
    { 
      name: 'Rajesh Kumar', 
      experience: '5 years', 
      phone: '+91 98765 43210',
      trips: 1200,
      rating: 4.8,
      specialties: ['Luxury Vehicles', 'Long Distance']
    },
    { 
      name: 'Anil Sharma', 
      experience: '8 years', 
      phone: '+91 91234 56789',
      trips: 2500,
      rating: 4.9,
      specialties: ['Corporate Travel', 'Airport Transfers']
    },
    { 
      name: 'Sunil Verma', 
      experience: '4 years', 
      phone: '+91 99887 77665',
      trips: 900,
      rating: 4.7,
      specialties: ['City Tours', 'Family Trips']
    },
  ];

  const stats = [
    { value: "500+", label: "Happy Customers", icon: "😊" },
    { value: "50+", label: "Vehicles in Fleet", icon: "🚗" },
    { value: "24/7", label: "Customer Support", icon: "🕒" },
    { value: "100%", label: "Safety Record", icon: "🛡️" }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
    alert(`Thanks for your message, ${formData.name}! We'll contact you soon.`);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-about-container">
      <FrontNavbar />
      
      <div className="hero-banner">
        <div className="hero-content">
          <h1>Premium Car Rental Services</h1>
          <p>Experience luxury, comfort, and reliability with our professional chauffeurs</p>
        </div>
      </div>

      <div className="tab-navigation">
        <button 
          className={activeTab === 'about' ? 'active' : ''}
          onClick={() => setActiveTab('about')}
        >
          About Us
        </button>
        <button 
          className={activeTab === 'contact' ? 'active' : ''}
          onClick={() => setActiveTab('contact')}
        >
          Contact
        </button>
        <button 
          className={activeTab === 'drivers' ? 'active' : ''}
          onClick={() => setActiveTab('drivers')}
        >
          Our Drivers
        </button>
      </div>

      <div className="content-wrapper">
        {activeTab === 'about' && (
          <section className="about-section">
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="about-content">
              <h2>Our Story</h2>
              <p>
                Founded in 2015, we've grown from a small local service to one of the most trusted 
                car rental providers in the region. Our commitment to excellence has earned us 
                numerous industry awards and thousands of satisfied customers.
              </p>
              
              <div className="features-grid">
                <div className="feature-card">
                  <div className="feature-icon">🌟</div>
                  <h3>Premium Fleet</h3>
                  <p>Regularly updated vehicles with the latest safety features and amenities</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">🛡️</div>
                  <h3>Full Insurance</h3>
                  <p>Comprehensive coverage for complete peace of mind</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">📱</div>
                  <h3>Easy Booking</h3>
                  <p>Instant confirmation through our mobile app or website</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'contact' && (
          <section className="contact-section">
            <div className="contact-methods">
              <div className="contact-info">
                <h2>Get In Touch</h2>
                <div className="info-item">
                  <div className="info-icon">📞</div>
                  <div>
                    <h4>Phone</h4>
                    <p>+91 99999 00000 (24/7 Support)</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon">✉️</div>
                  <div>
                    <h4>Email</h4>
                    <p>info@carrentalstore.com</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon">🏢</div>
                  <div>
                    <h4>Office</h4>
                    <p>123 Business Street, City, PIN 560001</p>
                    <p>Hours: 8 AM - 10 PM</p>
                  </div>
                </div>
              </div>

              <form className="contact-form" onSubmit={handleSubmit}>
                <h3>Send Us a Message</h3>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn">
                  Send Message
                </button>
              </form>
            </div>
          </section>
        )}

        {activeTab === 'drivers' && (
          <section className="drivers-section">
            <h2>Meet Our Professional Drivers</h2>
            <p className="section-description">
              Our drivers average 4.8/5 customer rating and undergo rigorous training
            </p>
            
            <div className="driver-list">
              {drivers.map((driver, index) => (
                <div key={index} className="driver-card">
                  <div className="driver-header">
                    <div className="driver-avatar">
                      {driver.name.charAt(0)}
                    </div>
                    <div className="driver-rating">
                      {driver.rating} ★
                    </div>
                  </div>
                  <div className="driver-body">
                    <h3>{driver.name}</h3>
                    <div className="driver-meta">
                      <span>Experience: {driver.experience}</span>
                      <span>Trips: {driver.trips.toLocaleString()}</span>
                    </div>
                    <div className="driver-contact">
                      <span>Contact: {driver.phone}</span>
                    </div>
                    <div className="driver-specialties">
                      <h4>Specialties:</h4>
                      <ul>
                        {driver.specialties.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="testimonial-section">
        <h2>What Our Customers Say</h2>
        <div className="testimonials">
          <div className="testimonial-card">
            <div className="testimonial-text">
              "The best car rental experience I've ever had! The driver was professional and the car was spotless."
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">A</div>
              <div className="author-info">
                <h4>Arjun Patel</h4>
                <div className="rating">5 ★</div>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-text">
              "Perfect for our business trips. Always on time and excellent service."
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">P</div>
              <div className="author-info">
                <h4>Priya Sharma</h4>
                <div className="rating">4.8 ★</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready for Your Next Journey?</h2>
        <p>Book your perfect ride in just a few clicks</p>
        <button className="cta-button">Book Now</button>
      </div>
    </div>
  );
};

export default ContactAbout;