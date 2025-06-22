    import React from 'react';
    import { useNavigate } from 'react-router-dom';

    const CarCard = ({ car }) => {
    const navigate = useNavigate();

    return (
        <div style={{ border: '1px solid #ccc', padding: 16, width: 300 }}>
        <h3>{car.name}</h3>
        <p>{car.description || 'No description'}</p>
        <p>Rent: ₹{car.rentPerHour}/hour</p>
        <button onClick={() => navigate(`/car/${car._id}`)}>Book Now</button>
        </div>
    );
    };

    export default CarCard;
