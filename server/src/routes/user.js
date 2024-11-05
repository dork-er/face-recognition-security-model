const express = require('express');
const multer = require('multer');
const router = express.Router();
const Image = require('../models/Image');
const User = require('../models/User');
const authenticateToken = require('../middleware/authenticateToken').default;
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to upload an image
router.post('/uploadImage', upload.single('image'), async (req, res) => {
	try {
		const newImage = new Image({
			MediaData: req.file.buffer,
		});
		const savedImage = await newImage.save();
		res.status(200).json({ imageID: savedImage._id });
	} catch (error) {
		res.status(500).json({ error: 'Error uploading image' });
	}
});

// Route to update user's profile image ID
router.post('/updateImageId', async (req, res) => {
	const { email, image_id } = req.body;
	try {
		const updatedUser = await User.findOneAndUpdate(
			{ email },
			{ profileImage: image_id },
			{ new: true }
		);
		if (!updatedUser) {
			return res.status(404).json({ error: 'User not found' });
		}
		res.status(200).json({ message: 'Profile image updated successfully.' });
	} catch (error) {
		res
			.status(500)
			.json({ error: 'An error occurred while updating profile image.' });
	}
});

// GET /user/profile - Retrieve user profile data
router.get('/profile', authenticateToken, async (req, res) => {
	try {
		// Find the user by their ID (set in authenticateToken middleware)
		const user = await User.findById(req.user.id);
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		// Construct the full profile image URL if it exists
		const profileImageUrl = user.profileImage
			? `${req.protocol}://${req.get('host')}/images/${user.profileImage}`
			: null;

		// Send the user profile data with profile image URL
		res.json({
			id: user._id,
			name: user.username,
			email: user.email,
			profileImage: profileImageUrl,
		});
	} catch (error) {
		console.error('Error fetching user profile:', error);
		res.status(500).json({ error: 'Failed to fetch user profile' });
	}
});

module.exports = router;
