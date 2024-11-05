// uploadDefaultAvatar.js
const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();
const Image = require('./src/models/Image');

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

async function uploadDefaultAvatar() {
	try {
		// Read the default avatar image file
		const avatarData = fs.readFileSync('../client/public/images/avatar.png'); // Adjust path to avatar file

		// Create a new image document
		const defaultAvatar = new Image({
			MediaData: avatarData,
			DateUploaded: new Date(),
		});

		// Save to the database
		const savedAvatar = await defaultAvatar.save();

		console.log(`Default avatar saved with imageID: ${savedAvatar._id}`);
		process.exit(0);
	} catch (error) {
		console.error('Error uploading default avatar:', error);
		process.exit(1);
	}
}

uploadDefaultAvatar();
