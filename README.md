# Face Recognition Security System

This project is an undergraduate-level face recognition security system designed for authentication and surveillance purposes. The system leverages machine learning and deep learning techniques to recognize and verify individuals' faces, enhancing security in environments such as universities, offices, and restricted areas.

## Features

- **User Authentication**: Secure login and registration system with unique user credentials.
- **Real-Time Face Recognition**: Identifies and verifies faces from a live video feed, ensuring only recognized individuals are granted access.
- **Profile Management**: Users can update their personal information, upload, and change their profile image.
- **Forensic Analysis**: Supports forensic analysis of uploaded images and videos for investigative purposes.
- **Access Logs**: Maintains a record of all recognized and unrecognized faces, including timestamps, for auditing.

## Technologies Used

- **Frontend**: React.js for building a responsive and interactive user interface.
- **Backend**: Node.js and Express.js to manage API endpoints and handle data processing.
- **Machine Learning**: Haarcascade, mtcnn and FaceNet models for face detection and recognition.
- **Database**: MongoDB for storing user profiles, access logs, and media files.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB database configured and accessible.

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/face-recognition-security-system.git
   ```

2. Navigate to the project directory:

   ```bash
   cd face-recognition-security-system
   ```

3. Install dependencies:

   ```bash
   cd client && npm install
   ```

4. Set up environment variables for database connections, JWT secrets, and other configurations in a `.env` file.

5. Run the development server:
   ```bash
   cd client && npm start
   ```
6. Set up the backend server:
   ```bash
   cd server && npm install
   ```
7. Run the backend server:
   ```bash
   cd server && node src/app.js
   ```

### Usage

1. Register or log in to access the dashboard.
2. Use the profile page to manage personal information and upload a profile picture.
3. View access logs and perform forensic analysis on uploaded media files.
4. Use the live feed for real-time face recognition.

## Future Enhancements

- **Enhanced Security Measures**: Implement two-factor authentication for higher security.
- **Improved Face Recognition Accuracy**: Integrate additional machine learning models to improve recognition rates.
- **User Notification System**: Notify users in real-time when their profile is accessed or modified.
