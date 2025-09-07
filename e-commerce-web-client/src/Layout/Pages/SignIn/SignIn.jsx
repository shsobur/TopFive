import "./SignIn.css";
import { Link, useNavigate } from "react-router";
import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../../Context/AuthContext";
import Swal from "sweetalert2";

const SignIn = () => {
  const navigate = useNavigate();
  const { handleLoginUser, handleGoogleSignIn, firebaseLoading } =
    useContext(AuthContext);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = formData.email;
    const password = formData.password;

    await handleLoginUser(email, password).then(() => {
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
        title: "Signed in successfully",
      });
    });
  };

  // Handle google sign in__
  const googleSignIn = async () => {
    await handleGoogleSignIn().then(() => {
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
        title: "Signed in successfully",
      });
    });
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

            <button
              disabled={firebaseLoading}
              type="submit"
              className="signin-button"
            >
              {firebaseLoading ? "Working...." : "Sign In"}
            </button>
          </form>

          <div className="social-signin">
            <div className="divider">
              <span>Or continue with</span>
            </div>
            <div className="social-buttons">
              <button onClick={googleSignIn} className="social-btn google-btn">
                <i className="fab fa-google"></i>
                <FcGoogle size={25} />
                Google
              </button>
            </div>
          </div>

          <div className="signin-footer">
            <p>
              Don't have an account?
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
