// src/components/UserList.js
import React, { useState, useEffect } from 'react';
import User from './user';
import UserForm from './userForm';
import '../styles/userList.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch users from the backend
  useEffect(() => {
    fetch(`${backendUrl}/api/users`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setUsers(data))
      .catch((err) => console.error('Error fetching users:', err));
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user); // Open the edit modal
  };

  const handleSave = (updatedUser) => {
    // Update the user on the server
    fetch(`${backendUrl}/api/users/${updatedUser._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(() => {
        // Update the local state
        setUsers((prev) =>
          prev.map((u) => (u._id === updatedUser._id ? updatedUser : u))
        );
        setSelectedUser(null); // Close the modal
      })
      .catch((err) => console.error('Error updating user:', err));
  };

  const handleClose = () => {
    setSelectedUser(null); // Close the modal without saving
  };

  return (
    <div className="user-list-container">
      <h2>User Management</h2>
      <div className="user-list">
        {users.map((user) => (
          <User key={user._id} user={user} onEdit={handleEdit} />
        ))}
      </div>

      {/* Modal for editing a user */}
      {selectedUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <UserForm
              user={selectedUser}
              onSave={handleSave}
              onClose={handleClose}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
