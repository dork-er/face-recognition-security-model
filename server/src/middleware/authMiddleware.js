import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
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

const verifyRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};

export { authMiddleware, verifyRole };
