import { verify } from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET; // Ensure you have a secret key in your environment variables

const authenticateToken = (req, res, next) => {
	const token = req.headers.authorization;
	if (!token)
		return res.status(401).json({ error: 'Access denied. No token provided.' });

	try {
		// Verify token
		const decoded = verify(token, JWT_SECRET);
		req.user = { id: decoded.id }; // Attach the user ID to the request object
		next();
	} catch (error) {
		console.error('Invalid token:', error);
		res.status(403).json({ error: 'Invalid token' });
	}
	next();
};

export default authenticateToken;
