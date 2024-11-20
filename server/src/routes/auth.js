const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
require('dotenv').config();

// Login Route with Validation for Username or Email
router.post('/login', async (req, res) => {
  const { identifier, password } = req.body;
  try {
    // Find user by either email or username
    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Validate password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    // Generate JWT token if login is successful
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Signup Route
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const role = 'admin';
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      role,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error signing up user' });
  }
});

// Check if username or email exists
router.post('/checkAvailability', async (req, res) => {
  const { username, email } = req.body;

  try {
    const usernameExists = username ? await User.findOne({ username }) : null;
    const emailExists = email ? await User.findOne({ email }) : null;

    if (usernameExists) {
      return res.status(409).json({ message: 'Username is already taken.' });
    }
    if (emailExists) {
      return res.status(409).json({ message: 'Email is already registered.' });
    }

    res.status(200).json({ message: 'Available' });
  } catch (error) {
    console.error('Error checking availability:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
