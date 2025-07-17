// const jwt = require('jsonwebtoken');

// const protect = (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token)
//     return res.status(401).json({ message: 'Access Denied: No token provided' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // Attach user to request
//     next();
//   } catch (err) {
//     res.status(400).json({ message: 'Invalid token' });
//   }
// };

// module.exports = protect;



// middleware/protect.js
const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  // strip off the "Bearer " prefix if it exists
  const token = req.headers.authorization?.split(' ')[1];

  if (!token)
    return res.status(401).json({ message: 'Please log in to continue booking.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, email, … }
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = protect;
