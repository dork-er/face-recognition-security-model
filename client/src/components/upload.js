import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/upload.css';

const Upload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Upload file to backend
    console.log('File uploaded:', file);
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
      </div>
    </div>
  );
};

export default Upload;
