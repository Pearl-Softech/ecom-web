import React, { useState } from 'react';
import { FaUserEdit, FaLock, FaTrash, FaCogs } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Profile: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '9800000000',
    image: 'https://i.pravatar.cc/150?img=3', // placeholder avatar
    notifications: true,
    language: 'English',
    theme: 'Light',
  });

  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setFormData(prev => ({
        ...prev,
        image: url,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Profile updated successfully!');
    setEditing(false);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleDeleteAccount = () => {
    // Call backend API for deleting account
    setMessage('Your account has been deleted.');
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0 p-4">
            <div className="row">
              {/* Profile Picture */}
              <div className="col-md-4 text-center">
                <img
                  src={formData.image}
                  alt="Profile"
                  className="rounded-circle img-fluid mb-3"
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
                {editing && (
                  <div className="mb-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="form-control"
                    />
                  </div>
                )}
              </div>

              {/* Profile Form */}
              <div className="col-md-8">
                <h3 className="fw-bold mb-3">
                  <FaUserEdit className="me-2 text-primary" />
                  Profile Information
                </h3>

                {message && <div className="alert alert-success">{message}</div>}

                <form onSubmit={handleSubmit}>
                  {/* Full Name */}
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      className="form-control"
                      value={formData.fullName}
                      onChange={handleChange}
                      disabled={!editing}
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!editing}
                    />
                  </div>

                  {/* Phone */}
                  <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-control"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!editing}
                    />
                  </div>

                  {/* Action Buttons */}
                  {editing ? (
                    <div className="d-flex justify-content-between">
                      <button type="submit" className="btn btn-success px-4">
                        Save
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setEditing(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="text-end">
                      <button
                        type="button"
                        className="btn btn-primary px-4"
                        onClick={() => setEditing(true)}
                      >
                        Edit Profile
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>

          {/* User Preferences */}
          <div className="card shadow-sm border-0 mt-4 p-4">
            <h4 className="fw-bold mb-3">
              <FaCogs className="me-2 text-primary" />
              User Preferences
            </h4>

            <form>
              {/* Notification Preference */}
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="notifications"
                  checked={formData.notifications}
                  onChange={(e) => setFormData({ ...formData, notifications: e.target.checked })}
                />
                <label className="form-check-label" htmlFor="notifications">
                  Receive Notifications
                </label>
              </div>

              {/* Language Preference */}
              <div className="mb-3">
                <label className="form-label">Language</label>
                <select
                  name="language"
                  className="form-select"
                  value={formData.language}
                  onChange={handleChange}
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                </select>
              </div>

              {/* Theme Preference */}
              <div className="mb-3">
                <label className="form-label">Theme</label>
                <select
                  name="theme"
                  className="form-select"
                  value={formData.theme}
                  onChange={handleChange}
                >
                  <option value="Light">Light</option>
                  <option value="Dark">Dark</option>
                </select>
              </div>
            </form>
          </div>

          {/* Change Password */}
          <div className="card shadow-sm border-0 mt-4 p-4">
            <h4 className="fw-bold mb-3">
              <FaLock className="me-2 text-primary" />
              Change Password
            </h4>

            <form>
              <div className="mb-3">
                <label className="form-label">Current Password</label>
                <input type="password" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">New Password</label>
                <input type="password" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Confirm New Password</label>
                <input type="password" className="form-control" />
              </div>
              <button type="submit" className="btn btn-warning px-4">
                Change Password
              </button>
            </form>
          </div>

          {/* Delete Account */}
          <div className="card shadow-sm border-0 mt-4 p-4">
            <h4 className="fw-bold mb-3 text-danger">
              <FaTrash className="me-2" />
              Delete Account
            </h4>

            <p className="text-danger">This action is permanent and cannot be undone.</p>

            <button
              className="btn btn-danger px-4"
              onClick={() => setShowDeleteConfirmation(true)}
            >
              Delete Account
            </button>

            {showDeleteConfirmation && (
              <div className="alert alert-danger mt-3">
                <strong>Are you sure you want to delete your account?</strong>
                <div className="mt-2">
                  <button
                    className="btn btn-danger me-2"
                    onClick={handleDeleteAccount}
                  >
                    Yes, Delete
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowDeleteConfirmation(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
