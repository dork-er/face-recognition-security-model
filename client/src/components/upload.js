import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/upload.css';

const Upload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadStatus(null); // Reset status on file change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Send the file to the backend
      const response = await axios.post(
        'http://127.0.0.1:5000/upload',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      // Handle backend response
      const { recognized_faces } = response.data;

      // Show success message
      setUploadStatus('success');

      // Optionally, navigate to logs page or update logs dynamically
      console.log('Recognized faces:', recognized_faces);
      alert('File uploaded successfully!');
      navigate('/logs'); // Navigate to logs page
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('error');
      alert('Failed to upload the file. Please try again.');
    }
  };

  return (
    <div className="upload-page">
      <button onClick={() => navigate(-1)} className="back-button">
        <img
          src="/icons/back_icon_24px.png"
          alt="back"
          className="back-icon"
        ></img>
      </button>
      <div className="upload-form-container">
        <h2 className="upload-title">File Upload</h2>
        <div className="upload-box">
          <label htmlFor="file-upload" className="upload-label">
            <div className="upload-icon">📤</div>
            <p>Drag and drop or browse</p>
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </label>
        </div>
        <button onClick={handleSubmit} className="upload-button">
          Upload
        </button>
        {uploadStatus === 'success' && (
          <p className="success-message">File uploaded successfully!</p>
        )}
        {uploadStatus === 'error' && (
          <p className="error-message">Failed to upload file.</p>
        )}
      </div>
    </div>
  );
};

export default Upload;
