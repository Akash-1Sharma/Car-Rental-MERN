import React, { useEffect, useState, useMemo } from 'react';
import API from '../utils/axios';
import { saveAs } from 'file-saver';
import { Link } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';

import Papa from 'papaparse';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 5;

  const [bookings, setBookings] = useState([]);
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({
    name: '',
    image: '',
    rentPerHour: '',
    capacity: '',
    fuelType: ''
  });

  // Export to CSV
  const exportToCSV = () => {
    const csv = Papa.unparse(bookings.map((b) => ({
      Car: b.car?.name || 'N/A',
      User: b.user?.email || 'N/A',
      From: new Date(b.fromTime).toLocaleString(),
      To: new Date(b.toTime).toLocaleString(),
      Hours: b.totalHours,
      Amount: b.totalAmount,
      Status: b.status || 'confirmed'
    })));

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'bookings.csv');
  };

  const [sortBy, setSortBy] = useState('');
  const [filterCar, setFilterCar] = useState('');
  const [filterUser, setFilterUser] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchBookings();
    fetchCars();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await API.get('/bookings/all', { headers });
      setBookings(res.data);
    } catch (err) {
      alert('Failed to load bookings');
    }
  };

  // Chart data
  const getChartData = () => {
    const bookingCounts = {};
    const revenuePerDay = {};
    const carCounts = {};

    bookings.forEach(b => {
      const dateKey = new Date(b.fromTime).toISOString().split('T')[0]; // YYYY-MM-DD

      // Bookings per day
      bookingCounts[dateKey] = (bookingCounts[dateKey] || 0) + 1;

      // Revenue per day
      if (b.status !== 'cancelled') {
        revenuePerDay[dateKey] = (revenuePerDay[dateKey] || 0) + b.totalAmount;
      }

      // Most booked cars
      const carName = b.car?.name || 'Unknown';
      carCounts[carName] = (carCounts[carName] || 0) + 1;
    });

    return {
      bookingsChart: {
        labels: Object.keys(bookingCounts),
        datasets: [{
          label: 'Bookings per Day',
          data: Object.values(bookingCounts),
          backgroundColor: 'rgba(54, 162, 235, 0.6)'
        }]
      },
      revenueChart: {
        labels: Object.keys(revenuePerDay),
        datasets: [{
          label: 'Revenue per Day (₹)',
          data: Object.values(revenuePerDay),
          backgroundColor: 'rgba(75, 192, 192, 0.6)'
        }]
      },
      carChart: {
        labels: Object.keys(carCounts),
        datasets: [{
          label: 'Most Booked Cars',
          data: Object.values(carCounts),
          backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#9966FF', '#4BC0C0', '#F67019'
          ]
        }]
      }
    };
  };

  const chartData = useMemo(getChartData, [bookings]);

  const fetchCars = async () => {
    try {
      const res = await API.get('/cars');
      setCars(res.data);
    } catch (err) {
      alert('Failed to load cars');
    }
  };

  

  

  const sortedFilteredBookings = () => {
    let filtered = bookings;

    if (activeTab === 'confirmed') {
      filtered = filtered.filter(b => b.status !== 'cancelled');
    } else if (activeTab === 'cancelled') {
      filtered = filtered.filter(b => b.status === 'cancelled');
    }

    if (filterCar) {
      filtered = filtered.filter(b => b.car?.name?.toLowerCase().includes(filterCar.toLowerCase()));
    }

    if (filterUser) {
      filtered = filtered.filter(b => b.user?.email?.toLowerCase().includes(filterUser.toLowerCase()));
    }

    if (sortBy === 'latest') {
      filtered = filtered.sort((a, b) => new Date(b.fromTime) - new Date(a.fromTime));
    } else if (sortBy === 'oldest') {
      filtered = filtered.sort((a, b) => new Date(a.fromTime) - new Date(b.fromTime));
    } else if (sortBy === 'cost-high') {
      filtered = filtered.sort((a, b) => b.totalAmount - a.totalAmount);
    } else if (sortBy === 'cost-low') {
      filtered = filtered.sort((a, b) => a.totalAmount - b.totalAmount);
    }

    const start = (currentPage - 1) * bookingsPerPage;
    const end = start + bookingsPerPage;

    return filtered.slice(start, end);
  };

  const totalPages = Math.ceil(
    bookings.filter((b) => {
      if (activeTab === 'confirmed') return b.status === 'confirmed';
      if (activeTab === 'cancelled') return b.status === 'cancelled';
      return true; // All
    }).filter((b) => {
      const carMatch = filterCar ? b.car?.name?.toLowerCase().includes(filterCar.toLowerCase()) : true;
      const userMatch = filterUser ? b.user?.email?.toLowerCase().includes(filterUser.toLowerCase()) : true;
      return carMatch && userMatch;
    }).length / bookingsPerPage
  );

  return (
    <div style={{ padding: 20 }}>
      <AdminNavbar />
      <h2>Admin Dashboard</h2>

      <h3>Bookings</h3>
      <button onClick={exportToCSV} style={{ marginBottom: 20 }}>
        Export Bookings to CSV
      </button>

      {/* Tabs */}
      <div style={{ marginBottom: 20 }}>
        {['all', 'confirmed', 'cancelled'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              marginRight: 10,
              padding: '6px 12px',
              backgroundColor: activeTab === tab ? '#ccc' : 'white',
              border: '1px solid #aaa',
              cursor: 'pointer'
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Filter by Car Name"
          value={filterCar}
          onChange={(e) => {
            setFilterCar(e.target.value);
            setCurrentPage(1);
          }}
          style={{ marginRight: 10 }}
        />
        <input
          placeholder="Filter by User Email"
          value={filterUser}
          onChange={(e) => {
            setFilterUser(e.target.value);  // Fixed: Changed setFilterCar to setFilterUser
            setCurrentPage(1);
          }}
          style={{ marginRight: 10 }}
        />
        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
          <option value="">Sort by</option>
          <option value="latest">Date: Latest</option>
          <option value="oldest">Date: Oldest</option>
          <option value="cost-high">Cost: High to Low</option>
          <option value="cost-low">Cost: Low to High</option>
        </select>
      </div>

      {/* Booking List */}
      {sortedFilteredBookings().map((booking) => (
        <div
          key={booking._id}
          style={{ border: '1px solid #ccc', marginBottom: 10, padding: 10 }}
        >
          <p><strong>Car:</strong> {booking.car?.name || 'N/A'}</p>
          <p><strong>User:</strong> {booking.user?.email || 'N/A'}</p>
          <p><strong>From:</strong> {new Date(booking.fromTime).toLocaleString()}</p>
          <p><strong>To:</strong> {new Date(booking.toTime).toLocaleString()}</p>
          <p><strong>Total:</strong> ₹{booking.totalAmount}</p>
          <p><strong>Status:</strong> {booking.status || 'confirmed'}</p>
          <button onClick={() => setSelectedBooking(booking)}>View More</button>
        </div>
      ))}
      
      {/* Pagination */}
      <div style={{ marginTop: 20 }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            style={{
              marginRight: 5,
              padding: '5px 10px',
              backgroundColor: currentPage === i + 1 ? '#ddd' : 'white'
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Modal */}
      {selectedBooking && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
          alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            backgroundColor: 'white', padding: 20, borderRadius: 10,
            width: '90%', maxWidth: 500, position: 'relative'
          }}>
            <h3>Booking Details</h3>
            <p><strong>Car:</strong> {selectedBooking.car?.name}</p>
            <p><strong>User:</strong> {selectedBooking.user?.email}</p>
            <p><strong>From:</strong> {new Date(selectedBooking.fromTime).toLocaleString()}</p>
            <p><strong>To:</strong> {new Date(selectedBooking.toTime).toLocaleString()}</p>
            <p><strong>Hours:</strong> {selectedBooking.totalHours}</p>
            <p><strong>Total:</strong> ₹{selectedBooking.totalAmount}</p>
            <p><strong>Status:</strong> {selectedBooking.status}</p>
            <button onClick={() => setSelectedBooking(null)} style={{ marginTop: 10 }}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Charts */}
      <h3>📈 Booking Analytics</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 30 }}>
        <div style={{ width: '100%', maxWidth: 500 }}>
          <Bar data={chartData.bookingsChart} />
        </div>
        <div style={{ width: '100%', maxWidth: 500 }}>
          <Line data={chartData.revenueChart} />
        </div>
        <div style={{ width: '100%', maxWidth: 500 }}>
          <Pie data={chartData.carChart} />
        </div>
      </div>

          
    </div>
  );
};

export default AdminDashboard;