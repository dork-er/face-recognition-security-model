import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/landing.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* <img
        src="/images/backgroundSignup.jpg"
        alt="background"
        className="background-cover"
      /> */}
      <img
        src="/images/friendlyRobot.png"
        alt="robot"
        className="robot-image"
      ></img>
      <div className="card-container">
        <div className="card live-capture-card">
          <img
            src="/images/bionicRobot.png"
            alt="Live Capture"
            loading="lazy"
          />
          <div className="card-content">
            <h3>Live Capture</h3>
            <p>
              This is where you can interact with the face recognition model in
              real-time.
            </p>
            <Link
              to="https://face-recognition-security-model.streamlit.app/"
              className="card-button live-capture-card-button"
            >
              Go
            </Link>
          </div>
        </div>

        <div className="card upload-card">
          <img src="/images/robot.png" alt="Upload" loading="lazy" />
          <div className="card-content">
            <h3>Upload</h3>
            <p>Upload images or videos for forensic analysis.</p>
            <a
              href="https://face-recognition-security-model.streamlit.app/"
              className="card-button live-capture-card-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Upload
            </a>
            {/* <Link to="/upload" className="card-button upload-card-button">
              Upload
            </Link> */}
          </div>
        </div>

        <div className="card logs-card">
          <img src="/images/reading.png" alt="View Logs" loading="lazy" />
          <div className="card-content">
            <h3>View Logs</h3>
            <p>
              See all the previous sessions here for a detailed view of previous
              interactions.
            </p>
            <Link to="/logs" className="card-button logs-card-button">
              Logs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
