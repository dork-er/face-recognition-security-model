const express = require('express');
const router = express.Router();
const {
  updateUserInfo,
  updatePassword,
  validateUnique,
  uploadImage,
} = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Define the upload directory path
const uploadDir = path.join(__dirname, '..', 'uploads');

// Check if the uploads directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('Uploads directory created successfully');
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('Saving file to:', uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueFilename = Date.now() + '-' + file.originalname;
    console.log('Generated filename:', uniqueFilename);
    cb(null, uniqueFilename);
  },
});

const upload = multer({ storage });

// Route definition with multer middleware
router.put(
  '/profile/uploadImage',
  verifyToken,
  upload.single('image'),
  uploadImage
);

// Route to update personal info (username and email)
router.put('/profile/update', verifyToken, updateUserInfo);

// Route to update password
router.put('/profile/security', verifyToken, updatePassword);

router.post('/validate', verifyToken, validateUnique);

module.exports = router;
