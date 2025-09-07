import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../../Context/AuthContext";
import "./SignUp.css";
import { useContext, useState } from "react";
import Swal from "sweetalert2";

const SignUp = () => {
  const { handleCreateUser, firebaseLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const password = formData.password;
    const email = formData.email;

    await handleCreateUser(email, password).then(() => {
      navigate("/");

      const Toast = Swal.mixin({
        toast: true,
        position: "bottom",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Signed up successfully",
      });
    });
  };

  return (
    <>
      <div className="signup-container">
        <div className="signup-card">
          <div className="signup-header">
            <h2>Create Your Account</h2>
            <p>Join us and start shopping today</p>
          </div>

          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

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
                placeholder="Create a password"
                required
              />
            </div>

            <button
              disabled={firebaseLoading}
              type="submit"
              className="signup-button"
            >
              {firebaseLoading ? "Working...." : "Create Account"}
            </button>
          </form>

          <div className="signup-footer">
            <p>
              Already have an account? <Link to="/sign-in">Sign In</Link>
            </p>
          </div>

          <div className="terms">
            <p>
              By creating an account, you agree to our{" "}
              <a href="#">Terms of Service</a> and{" "}
              <a href="#">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
