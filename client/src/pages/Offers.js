import React from 'react';
import '../styles/Offers.css';
import FrontNavbar from '../components/FrontNavbar';

const Offers = () => {
  const offers = [
    {
      title: 'Summer Special',
      description: 'Get 20% off on all bookings in June!',
      code: 'SUMMER20',
      image: 'https://source.unsplash.com/400x250/?car,sunset'
    },
    {
      title: 'Weekend Deal',
      description: 'Book for 2 days, get 1 day free!',
      code: 'WEEKENDFREE',
      image: 'https://source.unsplash.com/400x250/?car,roadtrip'
    },
    {
      title: 'First Ride Offer',
      description: 'Flat ₹500 off for new customers!',
      code: 'FIRST500',
      image: 'https://source.unsplash.com/400x250/?luxury-car'
    }
  ];

  return (
    <div style={{ padding: 20 }}>
       <FrontNavbar/> 
    <div className="offers-page">
      <h2>Special Offers & Discounts</h2>
      <p>Check out our latest promotions to save on your next ride.</p>

      <div className="offers-grid">
        {offers.map((offer, index) => (
          <div key={index} className="offer-card">
            <img src={offer.image} alt={offer.title} />
            <h3>{offer.title}</h3>
            <p>{offer.description}</p>
            <div className="promo-code">Use Code: <strong>{offer.code}</strong></div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Offers;
