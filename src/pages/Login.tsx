import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import LoginSVG from '../assets/images/login-page-img.svg'

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
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
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      alert('Login successful!');
      navigate('/');
    }
  };

  return (
    <div className="container-fluid py-5 bg-light">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-10 shadow rounded bg-white overflow-hidden">
          <div className="row">
            {/* Image */}
            <div className="col-md-6 d-none d-md-flex bg-primary text-white align-items-center justify-content-center p-4">
              <div className="text-center">
                <h1 className="display-6 fw-bold">Welcome Back</h1>
                <p className="lead">Login to access your ECOM account.</p>
                <img
                  src={LoginSVG}
                  className="img-fluid rounded mt-3"
                  alt="Login Visual"
                />
              </div>
            </div>

            {/* Form */}
            <div className="col-md-6 p-5">
              <h2 className="mb-4 fw-bold text-center">Login</h2>
              <form onSubmit={handleSubmit}>
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

                {/* Remember Me */}
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="remember"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="remember">
                    Remember me
                  </label>
                </div>

                {/* Submit */}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary fw-bold">
                    LOGIN
                  </button>
                </div>

                {/* Link to signup */}
                <p className="mt-3 text-center">
                  {"Don't have an account? "}
                  <Link to={'/register'}>
                    Register
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

export default Login;
