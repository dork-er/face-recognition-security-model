import React, { useState, useRef } from 'react';
import '../styles/capture.css';

const LiveCapture = () => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [capturedFaces, setCapturedFaces] = useState([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const captureInterval = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      videoRef.current.srcObject = stream;
      setIsCameraOn(true);
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert('Unable to access camera. Please check your permissions.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
    setIsCameraOn(false);
    clearInterval(captureInterval.current);
  };

  const processFrame = async () => {
    if (!canvasRef.current || !videoRef.current) return;

    // Draw the current video frame onto the canvas
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    // Convert the canvas image to a Blob
    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append('image', blob, 'frame.jpg');

      try {
        // Send the frame to the Flask API
        const response = await fetch('http://127.0.0.1:5001/process_frame', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          console.error('Failed to process frame:', response.statusText);
          return;
        }

        const data = await response.json();
        setCapturedFaces(data.faces || []);
      } catch (error) {
        console.error('Error processing frame:', error);
      }
    }, 'image/jpeg');
  };

  const toggleCamera = () => {
    if (isCameraOn) {
      stopCamera();
    } else {
      startCamera();
      // Start capturing frames every second
      captureInterval.current = setInterval(processFrame, 1000);
    }
  };

  return (
    <div className="live-capture-page">
      <h2>Live Face Recognition</h2>
      <div className="video-container">
        {isCameraOn ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="video-feed"
          ></video>
        ) : (
          <div className="video-placeholder">Camera is off</div>
        )}
        <canvas
          ref={canvasRef}
          width="640"
          height="480"
          style={{ display: 'none' }}
        ></canvas>
      </div>

      <button onClick={toggleCamera} className="camera-button">
        {isCameraOn ? 'Stop Camera' : 'Start Camera'}
      </button>

      <div className="recognized-faces">
        <h3>Captured Faces:</h3>
        {capturedFaces.length > 0 ? (
          <ul>
            {capturedFaces.map((face, index) => (
              <li key={index}>
                <strong>Name:</strong> {face.name || 'Unknown'} <br />
                <strong>Confidence:</strong> {face.confidence.toFixed(2)}
              </li>
            ))}
          </ul>
        ) : (
          <p>No faces recognized yet.</p>
        )}
      </div>
    </div>
  );
};

export default LiveCapture;
