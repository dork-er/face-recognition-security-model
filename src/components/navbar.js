// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => {
	return (
		<nav className="navbar">
			<div className="navbar-logo">
				<Link to="/">
					<img src="/logo512.png" alt="Logo" />
				</Link>
			</div>
			<div className="navbar-profile">
				<img src="/logo512.png" alt="Profile" />
			</div>
		</nav>
	);
};

export default Navbar;
