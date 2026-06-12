import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import AnimatedBackground from '../../components/AnimatedBackground';
import './Signup.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const validateForm = () => {
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
    ) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
  setLoading(true);

  await axios.post(
    "http://localhost:5000/api/auth/register",
    {
      fullName,
      email,
      password,
      confirmPassword,
    }
  );

  toast.success("Account created successfully!");

  setTimeout(() => {
    navigate("/login");
  }, 1500);

} catch (error) {
  toast.error(
    error.response?.data?.message ||
    "Registration failed"
  );
} finally {
  setLoading(false);
}
  };

  return (
    <div className="signup-wrapper d-flex align-items-center justify-content-center p-3">
      <AnimatedBackground />

      <div className="portal-card container-fluid position-relative z-1">
        <div className="row h-100 align-items-stretch">
          {/* Left Branding Section */}
          <div className="col-md-5 d-flex flex-column justify-content-center p-3 p-lg-4 text-start brand-section">
            <div className="brand-logo mb-4">
              <div className="logo-icon d-flex align-items-center justify-content-center">
                <span>N</span>
              </div>
            </div>

            <h1 className="portal-title fw-bold text-uppercase mb-1">
              NexSphere
            </h1>

            <h2 className="portal-subtitle text-uppercase mb-4">
              Admin Portal
            </h2>

            <h3 className="portal-tagline fw-semibold mb-2">
              Manage. Scale. Dominate.
            </h3>

            <p className="portal-desc mb-0">
              Your secure gateway to the future of data management.
            </p>
          </div>

          {/* Divider */}
          <div className="col-md-1 d-none d-md-flex justify-content-center align-items-center position-relative">
            <div className="vertical-divider"></div>
          </div>

          {/* Signup Form */}
          <div className="col-md-6 d-flex flex-column justify-content-center p-3 p-lg-4 text-start form-section">
            <form onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="mb-3">
                <label
                  className="form-label field-label mb-2"
                  htmlFor="fullName"
                >
                  Full Name
                </label>

                <div className="input-group-custom d-flex align-items-center">
                  <span className="input-icon-left">
                    <i className="bi bi-person"></i>
                  </span>

                  <input
                    type="text"
                    id="fullName"
                    className="form-control-custom w-100"
                    placeholder="Enter your full name"
                    value={fullName}
                  onChange={(e) => {
  setFullName(e.target.value);

  if (errors.fullName) {
    setErrors(prev => ({
      ...prev,
      fullName: "",
    }));
  }
}}
required />
                </div>

                {errors.fullName && (
                  <small className="text-danger mt-1 d-block">
                    {errors.fullName}
                  </small>
                )}
              </div>

              {/* Email */}
              <div className="mb-4">
                <label
                  className="form-label field-label mb-2"
                  htmlFor="email"
                >
                  Email Address
                </label>

                <div className="input-group-custom d-flex align-items-center">
                  <span className="input-icon-left">
                    <i className="bi bi-envelope"></i>
                  </span>

                  <input
                    type="email"
                    id="email"
                    className="form-control-custom w-100"
                    placeholder="Enter your email"
                    value={email}
                   onChange={(e) => {
  setEmail(e.target.value);

  if (errors.email) {
    setErrors(prev => ({
      ...prev,
      email: "",
    }));
  }
}}
required />
                </div>

                {errors.email && (
                  <small className="text-danger mt-1 d-block">
                    {errors.email}
                  </small>
                )}
              </div>

              {/* Password */}
              <div className="mb-4">
                <label
                  className="form-label field-label mb-2"
                  htmlFor="password"
                >
                  Password
                </label>

                <div className="input-group-custom d-flex align-items-center position-relative">
                  <span className="input-icon-left">
                    <i className="bi bi-lock"></i>
                  </span>

                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className="form-control-custom w-100 pe-5"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => {
  setPassword(e.target.value);

  if (errors.password) {
    setErrors(prev => ({
      ...prev,
      password: "",
    }));
  }
}}
required />

                  <button
                    type="button"
                    className="btn-toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i
                      className={`bi ${
                        showPassword ? 'bi-eye' : 'bi-eye-slash'
                      }`}
                    ></i>
                  </button>
                </div>

                {errors.password && (
                  <small className="text-danger mt-1 d-block">
                    {errors.password}
                  </small>
                )}
              </div>

              {/* Confirm Password */}
              <div className="mb-4">
                <label
                  className="form-label field-label mb-2"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>

                <div className="input-group-custom d-flex align-items-center position-relative">
                  <span className="input-icon-left">
                    <i className="bi bi-shield-lock"></i>
                  </span>

                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    className="form-control-custom w-100 pe-5"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                   onChange={(e) => {
  setConfirmPassword(e.target.value);

  if (errors.confirmPassword) {
    setErrors(prev => ({
      ...prev,
      confirmPassword: "",
    }));
  }
}}
required />

                  <button
                    type="button"
                    className="btn-toggle-password"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                  >
                    <i
                      className={`bi ${
                        showConfirmPassword ? 'bi-eye' : 'bi-eye-slash'
                      }`}
                    ></i>
                  </button>
                </div>

                {errors.confirmPassword && (
                  <small className="text-danger mt-1 d-block">
                    {errors.confirmPassword}
                  </small>
                )}
              </div>

              {/* Create Account Button */}
                <button
                 type="submit"
                disabled={loading}
                className="btn-signup w-100 fw-semibold text-center mb-3"
                >
               {loading ? "Creating Account..." : "Create Account"}
               </button>

              {/* Login Link */}
              <div className="text-center">
                <span className="text-muted">
                  Already have an account?{' '}
                </span>

                <Link
                  to="/login"
                  className="forgot-link text-decoration-none fw-semibold"
                >
                  Sign In
                </Link>
              </div>
            </form>
          </div>
        </div>

        <div className="portal-footer text-center w-100 position-absolute bottom-0 start-0 pb-3">
          <span>&copy; 2026 NexSphere Inc. | Secure Signup</span>
        </div>
      </div>

      <div className="sparkle-icon position-fixed bottom-0 end-0 m-4">
        <i className="bi bi-sparkles"></i>
      </div>
        <ToastContainer
      position="top-right"
      autoClose={3000}
      theme="light"
    />
    </div>
  );
}

export default Signup;