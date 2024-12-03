import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import userController from '../controllers/userController.js';
import verifyToken from '../middleware/verifyToken.js';

const { updateUserInfo, updatePassword, validateUnique, uploadImage } =
  userController;

const router = express.Router();

// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Route to validate unique email and username
router.post('/validate', verifyToken, validateUnique);

export default router;
