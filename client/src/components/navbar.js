import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => {
	const navigate = useNavigate();

	return (
		<nav className="navbar">
			<div className="navbar-logo">
				<Link to="/">
					<img src="/logo512.png" alt="Logo" />
				</Link>
			</div>
			<div className="navbar-profile">
				<img
					src="/logo512.png"
					alt="Profile"
					onClick={() => navigate('/profile')}
					style={{ cursor: 'pointer' }}
				/>
			</div>
		</nav>
	);
};

export default Navbar;
