import React, { useRef, useEffect, useState } from 'react';
import '../styles/capture.css';

const Capture = () => {
	const videoRef = useRef(null);
	const [streaming, setStreaming] = useState(false);

	const startCapture = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ video: true });
			if (videoRef.current) {
				videoRef.current.srcObject = stream;
				setStreaming(true);
			}
		} catch (error) {
			console.error('Error accessing webcam:', error);
		}
	};

	const stopCapture = () => {
		if (videoRef.current && videoRef.current.srcObject) {
			const stream = videoRef.current.srcObject;
			const tracks = stream.getTracks();
			tracks.forEach((track) => track.stop());
			videoRef.current.srcObject = null;
		}
		setStreaming(false);
	};

	useEffect(() => {
		// Stop capture when component unmounts
		return () => {
			stopCapture();
		};
	}, []);

	return (
		<div className="capture-page">
			<h1>Live Capture</h1>
			<div className="video-container">
				<video ref={videoRef} autoPlay playsInline />
			</div>
			<div className="controls">
				{streaming ? (
					<button onClick={stopCapture} className="stop-button">
						Stop
					</button>
				) : (
					<button onClick={startCapture} className="start-button">
						Start Capture
					</button>
				)}
			</div>
		</div>
	);
};

export default Capture;
