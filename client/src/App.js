import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useLocation,
} from 'react-router-dom';
import './App.css';

import SignUp from './components/signUp';
import Login from './components/login';
import LandingPage from './components/landingPage';
import Logs from './components/logsPage';
import Upload from './components/upload';
import Navbar from './components/navbar';
import Capture from './components/capture';

const App = () => {
	const location = useLocation();
	const hideNavbar =
		location.pathname === '/login' || location.pathname === '/signup';

	return (
		<div>
			{!hideNavbar && <Navbar />}
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/landing" element={<LandingPage />} />
				<Route path="/capture" element={<Capture />} />
				<Route path="/upload" element={<Upload />} />
				<Route path="/logs" element={<Logs />} />
			</Routes>
		</div>
	);
};

export default App;
