import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'; // Import toast for alerts
import '../styles/profile.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Profile = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    profileImage: '/images/avatar.png',
  });
  const [passwordData, setPasswordData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [originalData, setOriginalData] = useState({}); // Store original data
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${backendUrl}/user/profile`, {
          headers: { Authorization: token ? `Bearer ${token}` : '' },
        });
        setUserData(response.data);
        setOriginalData(response.data); // Initialize original data
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', event.target.files[0]);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.put(
          `${backendUrl}/user/profile/uploadImage`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success('Profile picture updated successfully!');
        setUserData((prevData) => ({
          ...prevData,
          profileImage: response.data.profileImage, // Update image in state
        }));
      } catch (error) {
        console.error('Error uploading image:', error);
        console.log(error);
        alert('Failed to upload image.');
      }
    }
  };

  const handleUpdatePersonalInfo = async (e) => {
    e.preventDefault();

    // Filter out unchanged fields
    const updatedFields = {};
    Object.keys(userData).forEach((key) => {
      if (userData[key] !== originalData[key]) {
        updatedFields[key] = userData[key];
      }
    });

    if (Object.keys(updatedFields).length === 0) {
      return toast('No changes detected', { icon: '⚠️' });
    }

    try {
      const token = localStorage.getItem('token');
      console.log(updatedFields);
      // Check for unique email and username
      const uniqueCheckResponse = await axios.post(
        `${import.meta.env.backendUrl}/user/validate`,
        updatedFields,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(uniqueCheckResponse);

      if (!uniqueCheckResponse.data.isUnique) {
        return toast.error('Username or email is already in use');
      }

      // Proceed to update only the changed fields
      await axios.put(
        `${import.meta.env.backendUrl}/user/profile/update`,
        updatedFields,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Profile updated successfully!');
      setOriginalData(userData); // Update original data
    } catch (error) {
      console.error('Error updating profile info:', error);
      toast.error('Failed to update profile info');
    }
  };

  const handleUpdateSecurityInfo = async (e) => {
    e.preventDefault();

    if (passwordData.password.length < 6) {
      return toast.error('Password should be at least 6 characters long');
    }
    if (passwordData.password !== passwordData.confirmPassword) {
      return toast.error('Passwords do not match!');
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${import.meta.env.backendUrl}/user/profile/security`,
        { password: passwordData.password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Password updated successfully!');
      setPasswordData({ password: '', confirmPassword: '' });
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error('Failed to update password');
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <button onClick={() => navigate(-1)} className="back-button">
          <img src="/icons/back_icon.png" alt="Back" className="back-icon" />
        </button>
        <h2>User Profile</h2>
      </div>
      <div className="profile-card cards">
        <img
          src={userData.profileImage}
          alt="Profile"
          className="profile-avatar"
        />
        <div className="profile-summary">
          <h3>{userData.username}</h3>
          <p>{userData.email}</p>
        </div>
        <button
          type="button"
          className="edit-button"
          onClick={() => document.getElementById('fileInput').click()}
        >
          Change Picture ✎
        </button>
        <input
          type="file"
          id="fileInput"
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>
      <div className="profile-info-section">
        <div className="profile-info cards">
          <form onSubmit={handleUpdatePersonalInfo}>
            <h4>Personal Information</h4>
            <label>
              <h5>Username:</h5>
              <input
                type="text"
                value={userData.username}
                onChange={(e) =>
                  setUserData({ ...userData, username: e.target.value })
                }
              />
            </label>
            <label>
              <h5>Email:</h5>
              <input
                type="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </label>
            <button type="submit" className="update-button">
              Update ✎
            </button>
          </form>
        </div>
        <div className="security-info cards">
          <form onSubmit={handleUpdateSecurityInfo}>
            <h4>Security</h4>
            <label>
              <h5>Password:</h5>
              <input
                type="password"
                placeholder="New password"
                value={passwordData.password}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, password: e.target.value })
                }
              />
            </label>
            <label>
              <h5>Confirm Password:</h5>
              <input
                type="password"
                placeholder="Confirm password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </label>
            <button type="submit" className="update-button">
              Update ✎
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
