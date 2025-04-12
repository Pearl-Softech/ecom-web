import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Register.css';
import RegisterSVG from '../assets/images/register-page-img.svg'

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    terms: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.terms) newErrors.terms = 'You must accept the terms';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      alert('Registration successful!');
      navigate('/login');
    }
  };

  return (
    <div className="container-fluid py-5 bg-light">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-10 shadow rounded bg-white overflow-hidden">
          <div className="row">
            {/* Left image panel */}
            <div className="col-md-6 d-none d-md-flex bg-primary text-white align-items-center justify-content-center p-4">
              <div className="text-center">
                <h1 className="display-6 fw-bold">Join ECOM</h1>
                <p className="lead">Register and start shopping now!</p>
                <img
                  src={RegisterSVG}
                  className="img-fluid rounded mt-3"
                  alt="Register Visual"
                />
              </div>
            </div>

            {/* Register form */}
            <div className="col-md-6 p-5">
              <h2 className="mb-4 fw-bold text-center">Register</h2>
              <form onSubmit={handleSubmit}>
                {/* Full Name */}
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    className={`form-control ${errors.fullName && 'is-invalid'}`}
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter full name"
                  />
                  {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className={`form-control ${errors.email && 'is-invalid'}`}
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                {/* Phone */}
                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    className={`form-control ${errors.phone && 'is-invalid'}`}
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                  />
                  {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className={`form-control ${errors.password && 'is-invalid'}`}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>

                {/* Terms */}
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="terms"
                    id="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="terms">
                    I agree to the Terms & Conditions
                  </label>
                  {errors.terms && <div className="text-danger small">{errors.terms}</div>}
                </div>

                {/* Submit */}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary fw-bold">
                    REGISTER
                  </button>
                </div>

                {/* Link to login */}
                <p className="mt-3 text-center">
                  {"Already have account? "}
                  <Link to={'/login'}>
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
