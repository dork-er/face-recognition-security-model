const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: false,
	},
	DateUploaded: { type: Date, default: Date.now },
	MediaData: { type: Buffer, required: true }, // Store binary data here
});

module.exports = mongoose.model('Image', imageSchema);
