// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';

// const AdminNavbar = () => {
//   const navigate = useNavigate();
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
//   const [menuOpen, setMenuOpen] = useState(false);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//       if (window.innerWidth > 768) setMenuOpen(false);
//     };
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return (
//     <nav style={styles.nav}>
//       <div style={styles.logo}>Admin Panel</div>

//       {/* Hamburger for mobile */}
//       {isMobile && (
//         <div style={styles.hamburger} onClick={toggleMenu}>
//           {menuOpen ? '✕' : '☰'}
//         </div>
//       )}

//       {/* Center box with admin links */}
//       {!isMobile ? (
//         <div style={styles.menuBox}>
//           <Link to="/admin" style={styles.menuLink}>Dashboard</Link>
//           <Link to="/admin/manage-cars" style={styles.menuLink}>Manage Cars</Link>
//         </div>
//       ) : (
//         <AnimatePresence>
//           {menuOpen && (
//             <motion.div
//               style={styles.mobileMenuBox}
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.3 }}
//             >
//               <Link to="/admin" style={styles.menuLink} onClick={toggleMenu}>Dashboard</Link>
//               <Link to="/admin/manage-cars" style={styles.menuLink} onClick={toggleMenu}>Manage Cars</Link>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       )}

//       <button style={styles.logoutButton} onClick={handleLogout}>
//         Logout
//       </button>
//     </nav>
//   );
// };

// const styles = {
//   nav: {
//     background: '#f7f7f7',
//     height: '64px',
//     padding: '0 24px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     position: 'relative',
//     boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
//     fontFamily: 'Inter, sans-serif',
//     zIndex: 100,
//   },
//   logo: {
//     fontWeight: '900',
//     fontSize: '20px',
//     color: '#1a1a1a',
//   },
//   hamburger: {
//     fontSize: '26px',
//     cursor: 'pointer',
//   },
//   menuBox: {
//     backgroundColor: '#eae8e4',
//     padding: '6px 20px',
//     borderRadius: '8px',
//     display: 'flex',
//     gap: '16px',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   menuLink: {
//     textDecoration: 'none',
//     fontWeight: '600',
//     fontSize: '12px',
//     color: '#333',
//     textTransform: 'uppercase',
//     letterSpacing: '0.05em',
//     padding: '6px 12px',
//     borderRadius: '16px',
//     transition: 'all 0.3s ease',
//   },
//   mobileMenuBox: {
//     position: 'absolute',
//     top: '64px',
//     left: 0,
//     right: 0,
//     backgroundColor: '#eae8e4',
//     padding: '12px 20px',
//     display: 'flex',
//     flexDirection: 'column',
//     borderBottomLeftRadius: '8px',
//     borderBottomRightRadius: '8px',
//     zIndex: 99,
//   },
//   logoutButton: {
//     backgroundColor: '#ff4d4f',
//     color: '#fff',
//     border: 'none',
//     padding: '8px 16px',
//     borderRadius: '6px',
//     fontSize: '12px',
//     fontWeight: '600',
//     cursor: 'pointer',
//     letterSpacing: '0.04em',
//   },
// };

// export default AdminNavbar;






import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/AdminNavbar.css';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('admin-theme') === 'dark';
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem('admin-theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const themeClass = darkMode ? 'dark-mode' : 'light-mode';

  return (
    <nav className={`admin-navbar ${themeClass}`}>
      <div className="admin-navbar-logo">Admin Panel</div>

      {/* Hamburger for mobile */}
      {isMobile && (
        <div className="admin-navbar-hamburger" onClick={toggleMenu}>
          {menuOpen ? '✕' : '☰'}
        </div>
      )}

      {/* Center Nav Items */}
      {!isMobile ? (
        <div className="admin-navbar-menu-container">
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/manage-cars">Manage Cars</Link>
        </div>
      ) : (
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="admin-navbar-mobile-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Link to="/admin" onClick={toggleMenu}>Dashboard</Link>
              <Link to="/admin/manage-cars" onClick={toggleMenu}>Manage Cars</Link>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Logout + Dark mode toggle */}
      <div className="admin-navbar-buttons">
        <button className="admin-navbar-dark-toggle" onClick={toggleDarkMode}>
          {darkMode ? '🌞' : '🌙'}
        </button>
        <button className="admin-navbar-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;


