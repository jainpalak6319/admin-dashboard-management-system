import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import './Login.css';
import AnimatedBackground from '../../components/AnimatedBackground'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [view, setView] = useState('login'); // 'login' or 'forgot'
  const [forgotEmail, setForgotEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Add this line
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      setLoading(true);

      // Future Backend Integration
      // const response = await axios.post(
      //   "http://localhost:5000/api/auth/login",
      //   { email, password }
      // );

      const response = await axios.post(
  "http://localhost:5000/api/auth/login",
  {
    email,
    password,
  }
);

const { token, user } = response.data;

    if (rememberMe) {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
} else {
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("user", JSON.stringify(user));
}

      toast.success("Login successful!");

      setTimeout(() => {
        navigate("/home");
      }, 1500);
    } catch (error) {
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async (e) => {
  e.preventDefault();

  if (!forgotEmail.trim()) {
    toast.error("Please enter your email address");
    return;
  }

  try {
    // Backend API Later

    setIsSubmitted(true);
    toast.success("Reset link sent!");
  } catch (error) {
    toast.error("Failed to send reset link");
  }
};

  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center p-3">
      
      {/* 1. Luxury moving ribbon canvas animation */}
      <AnimatedBackground />

      {/* 2. Main Glass Portal Card */}
      <div className="portal-card container-fluid position-relative z-1">
        <div className="row h-100 align-items-stretch">
          
          {/* Left Column: Branding */}
          <div className="col-md-5 d-flex flex-column justify-content-center p-4 p-lg-5 text-start brand-section">
            <div className="brand-logo mb-4">
              <div className="logo-icon d-flex align-items-center justify-content-center">
                <span>N</span>
              </div>
            </div>
            <h1 className="portal-title fw-bold text-uppercase mb-1">NexSphere</h1>
            <h2 className="portal-subtitle text-uppercase mb-4">Admin Portal</h2>
            <h3 className="portal-tagline fw-semibold mb-2">Manage. Scale. Dominate.</h3>
            <p className="portal-desc mb-0">
              Your secure gateway to the future of data management.
            </p>
          </div>

          {/* Middle Vertical Divider */}
          <div className="col-md-1 d-none d-md-flex justify-content-center align-items-center position-relative">
            <div className="vertical-divider"></div>
          </div>

          {/* Right Column: Dynamic Form Section */}
          <div className="col-md-6 d-flex flex-column justify-content-center p-4 p-lg-5 text-start form-section">
            {view === 'login' ? (
              /* --- LOGIN VIEW --- */
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label field-label mb-2" htmlFor="adminEmail">
                    Admin Email Address
                  </label>
                  <div className="input-group-custom d-flex align-items-center">
                    <span className="input-icon-left"><i className="bi bi-envelope"></i></span>
                    <input
                      type="email"
                      id="adminEmail"
                      className="form-control-custom w-100"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);

                        if (errors.email) {
                          setErrors((prev) => ({
                            ...prev,
                            email: "",
                          }));
                        }
                      }}
                      required
                    />
                  </div>
                  {errors.email && (
                    <small className="text-danger d-block mt-2">
                      {errors.email}
                    </small>
                  )}
                </div>

                <div className="mb-4">
                  <label className="form-label field-label mb-2" htmlFor="securePassword">
                    Secure Password
                  </label>
                  <div className="input-group-custom d-flex align-items-center position-relative">
                    <span className="input-icon-left"><i className="bi bi-lock"></i></span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="securePassword"
                      className="form-control-custom w-100 pe-5"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);

                        if (errors.password) {
                          setErrors((prev) => ({
                            ...prev,
                            password: "",
                          }));
                        }
                      }}
                      required
                    />
                    <button
                      type="button"
                      className="btn-toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i className={`bi ${showPassword ? 'bi-eye' : 'bi-eye-slash'}`}></i>
                    </button>
                  </div>
                  {errors.password && (
                    <small className="text-danger d-block mt-2">
                      {errors.password}
                    </small>
                  )}
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4 options-text">
                  <div className="form-check d-flex align-items-center gap-2">
                    <input
                      type="checkbox"
                      className="form-check-input-custom"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="rememberMe">Remember for 30 days</label>
                  </div>
                  <button 
                    type="button" 
                    className="forgot-link text-decoration-none bg-transparent border-0 p-0"
                    onClick={() => { setView('forgot'); setIsSubmitted(false); }}
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-signin w-100 fw-semibold text-center mb-2"
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>
                <div className="text-center mt-3 auth-switch-text">
                  <span>
                    Don't have an account?{' '}
                  </span>

                  <Link
                    to="/signup"
                    className="forgot-link text-decoration-none fw-semibold"
                  >
                    Create Account
                  </Link>
                </div>
              </form>
            ) : (
              /* --- FORGOT PASSWORD VIEW --- */
              <div className="forgot-password-flow">
                <h2 className="portal-tagline fw-bold mb-2">Forgot Password?</h2>
                <p className="portal-desc mb-4" style={{ color: '#6B7280' }}>
                  {isSubmitted 
                    ? "Closely watch your inbox. We've sent a recovery link to your email address."
                    : "Enter your email address below and we'll send you a link to reset your password."}
                </p>

                {!isSubmitted ? (
                  <form onSubmit={handleForgotSubmit}>
                    <div className="mb-4">
                      <label className="form-label field-label mb-2" htmlFor="forgotEmail">
                        Email Address
                      </label>
                      <div className="input-group-custom d-flex align-items-center">
                        <span className="input-icon-left"><i className="bi bi-envelope"></i></span>
                        <input
                          type="email"
                          id="forgotEmail"
                          className="form-control-custom w-100"
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <button type="submit" className="btn-signin w-100 fw-semibold text-center mb-4">
                      Send Reset Link
                    </button>
                  </form>
                ) : (
                  <button 
                    onClick={() => setIsSubmitted(false)} 
                    className="btn-signin w-100 fw-semibold text-center mb-4 structural-secondary"
                    style={{background: 'transparent',border: '1px solid #14B8A6',color: '#0F766E'}}>
                    Resend Email
                  </button>
                )}

                <div className="text-center">
                  <button 
                    type="button" 
                    className="forgot-link text-decoration-none bg-transparent border-0 p-0"
                    onClick={() => setView('login')}
                  >
                    <i className="bi bi-arrow-left me-2"></i>Back to Login
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

        <div className="portal-footer text-center w-100 position-absolute bottom-0 start-0 pb-3">
          <span>&copy; 2026 NexSphere Inc. | Secure Login</span>
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

export default Login;