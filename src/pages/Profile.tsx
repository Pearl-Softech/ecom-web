import React, { useState } from 'react';
import { FaUserEdit, FaLock, FaTrash } from 'react-icons/fa';

const Profile: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '9800000000',
    image: 'https://i.pravatar.cc/150?img=56',
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
    setMessage('✅ Profile updated successfully!');
    setEditing(false);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleDeleteAccount = () => {
    setMessage('⚠️ Your account has been deleted.');
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {/* Profile Info */}
          <div className="card p-4">
            <div className="row align-items-center">
              <div className="col-md-4 text-center mb-3 mb-md-0">
                <img
                  src={formData.image}
                  alt="Profile"
                  className="rounded-circle img-fluid border border-3"
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
                {editing && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="form-control mt-3"
                  />
                )}
              </div>

              <div className="col-md-8">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="fw-bold mb-0">
                    <FaUserEdit className="me-2 text-primary" />
                    Profile Info
                  </h4>
                  {!editing && (
                    <button
                      className="btn btn-primary"
                      onClick={() => setEditing(true)}
                    >
                      Edit
                    </button>
                  )}
                </div>

                {message && (
                  <div className="alert alert-success py-2 px-3">{message}</div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-2">
                    <label className="form-label mb-1">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      disabled={!editing}
                      className="form-control"
                    />
                  </div>

                  <div className="mb-2">
                    <label className="form-label mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!editing}
                      className="form-control"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!editing}
                      className="form-control"
                    />
                  </div>

                  {editing && (
                    <div className="d-flex justify-content-end gap-2">
                      <button type="submit" className="btn btn-primary px-4">
                        Save
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={() => setEditing(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>

          {/* Change Password */}
          <div className="card mt-4 p-4">
            <h5 className="fw-bold mb-3">
              <FaLock className="me-2 text-warning" />
              Change Password
            </h5>

            <form>
              <div className="mb-2">
                <label className="form-label mb-1">Current Password</label>
                <input type="password" className="form-control" />
              </div>
              <div className="mb-2">
                <label className="form-label mb-1">New Password</label>
                <input type="password" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label mb-1">Confirm New Password</label>
                <input type="password" className="form-control" />
              </div>
              <button type="submit" className="btn btn-warning px-4">
                Change Password
              </button>
            </form>
          </div>

          {/* Delete Account */}
          <div className="card mt-4 p-4">
            <h5 className="fw-bold text-danger mb-2">
              <FaTrash className="me-2" />
              Delete Account
            </h5>
            <p className="text-danger small">
              This action is irreversible. Your data will be permanently deleted.
            </p>
            <button
              className="btn btn-danger"
              onClick={() => setShowDeleteConfirmation(true)}
            >
              Delete Account
            </button>

            {showDeleteConfirmation && (
              <div className="alert alert-danger mt-3">
                <p className="mb-2 fw-bold">Are you sure you want to delete your account?</p>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-danger"
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
