import { Link } from "react-router";
import "./SignIn.css";
import { useState } from "react";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    
  };

  return (
    <>
      <div className="signin-container">
        <div className="signin-card">
          <div className="signin-header">
            <h2>Welcome Back</h2>
            <p>Sign in to your account to continue shopping</p>
          </div>

          <form className="signin-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
              <div className="forgot-password">
                <a href="#">Forgot password?</a>
              </div>
            </div>

            <button type="submit" className="signin-button">
              Sign In
            </button>
          </form>

          <div className="social-signin">
            <div className="divider">
              <span>Or continue with</span>
            </div>
            <div className="social-buttons">
              <button className="social-btn google-btn">
                <i className="fab fa-google"></i>
                Google
              </button>
            </div>
          </div>

          <div className="signin-footer">
            <p>
              Don't have an account?{" "}
              <a href="#">
                <Link to="/sign-up">Sign Up</Link>
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;