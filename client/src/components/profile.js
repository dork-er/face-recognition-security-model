import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/profile.css';

const Profile = () => {
	const navigate = useNavigate();

	return (
		<div className="profile-container">
			<div className="profile-header">
				<button onClick={() => navigate(-1)} className="back-button">
					←
				</button>
				<h2>User Profile</h2>
			</div>
			<div className="profile-card cards">
				<img
					src="/images/bionicRobot.png"
					alt="Profile"
					className="profile-avatar"
				/>
				<div>
					<h3>Jessica Fox</h3>
					<p>jessica@gmail.com</p>
				</div>
				<button className="edit-button">Change Picture ✎</button>
			</div>
			<div className="profile-info-section">
				<div className="profile-info cards">
					<form>
						<h4>Personal Information</h4>
						<label>
							<h5>Username:</h5>
							<input type="text" placeholder="Jessica Fox" />
						</label>
						<label>
							<h5>Email:</h5>
							<input type="email" placeholder="jessica@gmai.com"></input>
						</label>
						<button className="update-button">Update ✎</button>
					</form>
				</div>
				<div className="security-info cards">
					<form>
						<h4>Security</h4>
						<label>
							<h5>Password:</h5>
							<input type="password" placeholder="password"></input>
						</label>
						<label>
							<h5>Confirm Password:</h5>
							<input type="password" placeholder="password"></input>
						</label>
					</form>
					<button className="update-button">Update ✎</button>
				</div>
			</div>
		</div>
	);
};

export default Profile;
