const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  profileImage: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' }, // Reference to Image collection
});

module.exports = mongoose.model('User', userSchema);
