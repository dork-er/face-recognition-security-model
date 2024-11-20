// server/src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const verifyRole = (role) => {
  return (req, res, next) => {
    const userRole = req.user.role; // Assume `req.user` is set by your authentication middleware
    if (userRole !== role) {
      return res.status(403).json({ error: 'Access denied' });
    }
    next();
  };
};

const authMiddleware = (req, res, next) => {
  // Get token from the request header
  const token = req.headers.authorization?.split(' ')[1];
  // console.log(token);
  if (!token) {
    return res.status(401).json({ message: 'Authorization token missing' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Extract userId from token
    const userId = decoded.userId;

    // Attach user ID to req.user
    req.user = { id: userId };
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { authMiddleware, verifyRole };
