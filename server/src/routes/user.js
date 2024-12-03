import express from 'express';
import multer from 'multer';
import Image from '../models/Image.js';
import User from '../models/User.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

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
    const user = await User.findOneAndUpdate(
      { email },
      { profileImage: image_id },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while updating profile image.' });
  }
});

// Route to get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // authMiddleware sets the req.user object with the user ID
    const user = await User.findById(userId).populate('profileImage');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let profileImage = '/images/avatar.png'; // Default avatar
    if (user.profileImage && user.profileImage.MediaData) {
      const base64Image = Buffer.from(user.profileImage.MediaData).toString(
        'base64'
      );
      profileImage = `data:image/png;base64,${base64Image}`; // Assuming PNG format
    }

    res.json({
      username: user.username,
      email: user.email,
      profileImage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
