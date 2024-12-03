import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    // fetch all users from the User model database

    const users = await User.find({}, { password: 0 }); // Exclude passwords in response
    console.log(users);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Update user details
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { username, email, password, role } = req.body;

  try {
    // Prepare the update object
    const updateData = { username, email, role };
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

export default router;
