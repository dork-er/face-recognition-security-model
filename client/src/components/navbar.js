// src/components/Navbar.js
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Axios for HTTP requests
import '../styles/navbar.css';

const Navbar = () => {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [profileImage, setProfileImage] = useState('/images/avatar.png'); // Default avatar path
	const dropdownRef = useRef(null);
	const navigate = useNavigate();

	// Toggle dropdown visibility
	const toggleDropdown = () => {
		setDropdownOpen(!dropdownOpen);
	};

	// Close dropdown when clicking outside
	const handleClickOutside = (e) => {
		if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
			setDropdownOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	// Fetch profile image URL from the backend on component mount
	useEffect(() => {
		const fetchProfileImage = async () => {
			try {
				const token = localStorage.getItem('token');
				const response = await axios.get('http://localhost:5000/user/profile', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				// Set the profile image URL if it exists, otherwise use default avatar
				const imageUrl = response.data.profileImage || '/images/avatar.png';
				setProfileImage(imageUrl);
			} catch (error) {
				console.error('Error fetching profile image:', error);
				// Default to avatar if there's an error
				setProfileImage('/images/avatar.png');
			}
		};

		fetchProfileImage();
	}, []);

	// Log out the user and redirect to login page
	const handleLogout = () => {
		localStorage.removeItem('token'); // Remove token to revoke session
		navigate('/login'); // Redirect to login
	};

	return (
		<nav className="navbar">
			<div className="navbar-logo">
				<Link to="/">
					<img src="/logo512.png" alt="Logo" />
				</Link>
			</div>
			<div className="navbar-profile" ref={dropdownRef}>
				<img
					src={profileImage}
					alt="Profile"
					onClick={toggleDropdown}
					className="profile-icon"
				/>
				{dropdownOpen && (
					<div className="dropdown-menu">
						<button
							onClick={() => navigate('/profile')}
							className="dropdown-item"
						>
							Profile
						</button>
						<button onClick={handleLogout} className="dropdown-item">
							Log Out
						</button>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
