import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import Image from '../models/Image.js';
import fs from 'fs';

const updateUserInfo = async (req, res) => {
  const userId = req.user.userId; // assuming verifyToken middleware attaches `userId`
  const { username, email } = req.body;
  console.log(`Email: ${email}`);
  console.log(`Username: ${username}`);
  try {
    const user = await User.findById(userId);
    console.log(`User: ${user}`);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (username) user.username = username;
    if (email) user.email = email;

    await user.save();
    res.status(200).json({ message: 'Profile updated successfully!' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
};

// Update password
const updatePassword = async (req, res) => {
  try {
    console.log(`Update password: ${req.body}`);
    const { password } = req.body;
    console.log(`Password: ${password}`);

    // decoded information from the token contains the user ID.
    const userId = req.user.userId;
    console.log(`User ID: ${userId}`);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ message: 'Password updated successfully!' });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Server error. Could not update password.' });
  }
};

// Validate unique email and username
const validateUnique = async (req, res) => {
  const { username, email } = req.body;

  try {
    // Initialize a result object to store uniqueness status
    let isUnique = { username: true, email: true };

    // Check for unique username only if it's provided in the request body
    if (username) {
      const usernameExists = await User.findOne({ username });
      if (usernameExists) {
        isUnique.username = false;
      }
    }

    // Check for unique email only if it's provided in the request body
    if (email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        isUnique.email = false;
      }
    }

    if (!isUnique.username) {
      return res.status(200).json({
        message: 'Username is already in use.',
        isUnique,
      });
    }

    if (!isUnique.email) {
      return res.status(200).json({
        message: 'Email is already in use.',
        isUnique,
      });
    }

    res.status(200).json({ message: 'All fields are unique.', isUnique });
  } catch (error) {
    console.error('Error checking unique fields:', error);
    res.status(500).json({ message: 'Error validating uniqueness' });
  }
};

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Read the file as a buffer
    const imageBuffer = fs.readFileSync(req.file.path);

    // Create a new image document
    const newImage = new Image({
      user: req.user.userId,
      MediaData: imageBuffer,
    });

    // Save the image document to the database
    const savedImage = await newImage.save();

    // Update user profile image in the database
    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      { profileImage: savedImage._id },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'Profile image uploaded successfully!',
      profileImageId: savedImage._id,
    });
  } catch (error) {
    console.error('Error uploading profile image:', error);
    res.status(500).json({ message: 'Error uploading profile image' });
  }
};

export default {
  updateUserInfo,
  updatePassword,
  validateUnique,
  uploadImage,
};
