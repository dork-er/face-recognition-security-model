// Reusable user component

import React from 'react';
import '../styles/user.css';

const User = ({ user, onEdit }) => {
  const profilePictureUrl = `data:image/jpeg;base64,${user.profileImage}`;
  console.log(user.profileImage);
  return (
    <div className="user-card">
      <img
        src={profilePictureUrl}
        alt={`${user.username}'s profile`}
        className="user-avatar"
      />
      <div className="user-info">
        <h4>{user.username}</h4>
        <p>{user.email}</p>
      </div>
      <button className="edit-button" onClick={() => onEdit(user)}>
        ✏️ Edit
      </button>
    </div>
  );
};

export default User;
