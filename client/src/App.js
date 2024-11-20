import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';

import SignUp from './components/signUp';
import Login from './components/login';
import LandingPage from './components/landingPage';
import Logs from './components/logsPage';
import Upload from './components/upload';
import Navbar from './components/navbar';
import Capture from './components/capture';
import ProtectedRoute from './components/protectedRoute';
import Profile from './components/profile';
import Dashboard from './components/dashboard';
import UserList from './components/userList';
const App = () => {
  const location = useLocation();
  const hideNavbar =
    location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/capture" element={<Capture />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<UserList />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
