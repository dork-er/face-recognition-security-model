// src/components/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/landingPage.css';

const LandingPage = () => {
	return (
		<div className="landing-page">
			<img
				src="/images/backgroundSignup.jpg"
				alt="background"
				className="background-cover"
			/>
			<div className="card-container">
				<div className="card live-capture-card">
					<img src="/images/bionicRobot.png" alt="Live Capture" />
					<div className="card-content">
						<h3>Live Capture</h3>
						<p>
							This is where you can interact with the face recognition model in
							real-time.
						</p>
						<Link
							to="/capture"
							className="card-button live-capture-card-button"
						>
							Go
						</Link>
					</div>
				</div>

				<div className="card upload-card">
					<img src="/images/robot.png" alt="Upload" />
					<div className="card-content">
						<h3>Upload</h3>
						<p>Upload images or videos for forensic analysis.</p>
						<Link to="/upload" className="card-button upload-card-button">
							Upload
						</Link>
					</div>
				</div>

				<div className="card logs-card">
					<img src="/images/reading.png" alt="View Logs" />
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
