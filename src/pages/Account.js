import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/account.css';

const Account = ({ setIsAuthenticated }) => {
  // Hardcoded profile data
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    profilePicture: '',
    memberSince: '2023-12-01', // Static member since date
  });

  const [membershipDuration, setMembershipDuration] = useState('');

  useEffect(() => {
    // Calculate membership duration
    const calculateMembershipDuration = () => {
      const memberSinceDate = new Date(profile.memberSince);
      const today = new Date();
      let diffYears = today.getFullYear() - memberSinceDate.getFullYear();
      let diffMonths = today.getMonth() - memberSinceDate.getMonth();

      if (diffMonths < 0) {
        diffYears--;
        diffMonths += 12;
      }

      setMembershipDuration(`${diffYears} year(s) and ${diffMonths} month(s)`);
    };
    calculateMembershipDuration();
  }, [profile.memberSince]);

  const handleProfilePictureChange = (e) => {
    // Handle profile picture change locally
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile({ ...profile, profilePicture: imageUrl });
    }
  };

  const handleLogout = () => {
    // Local logout simulation
    setIsAuthenticated(false);
    alert('Signed out successfully!');
  };

  return (
    <div className="account-page">
      <div className="profile-section">
        <div className="profile-picture">
          <img
            src={profile.profilePicture || 'https://via.placeholder.com/150'}
            alt="Profile"
          />
          <label className="upload-btn">
            Upload Picture
            <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
          </label>
        </div>
        <div className="profile-details">
          <h2>{profile.name}</h2>
          <p>Email: {profile.email}</p>
          <p>Member Since: {new Date(profile.memberSince).toDateString()}</p>
          <p>Membership Duration: {membershipDuration}</p>
        </div>
      </div>

      <div className="additional-options">
        <div className="option">
          <h3>My Services</h3>
          <p>Manage and create services.</p>
          <Link to="/myservices" className="btn">View My Services</Link>
        </div>
        <div className="option">
          <h3>Change Password</h3>
          <p>Update your account password securely.</p>
          <button className="btn">Change Password</button>
        </div>
        <div className="option">
          <h3>Notification Preferences</h3>
          <p>Manage how you receive notifications.</p>
          <button className="btn">Update Preferences</button>
        </div>
      </div>

      <div className="logout-section">
        <button className="btn btn-danger" onClick={handleLogout}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Account;
