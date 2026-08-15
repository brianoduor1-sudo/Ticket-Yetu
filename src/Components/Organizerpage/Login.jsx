import { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // get saved users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // look for a user whose contactEmail + password match what was typed
    const matchedUser = users.find(
      (user) =>
        user.contactEmail === formData.email &&
        user.password === formData.password
    );

    if (matchedUser) {
      console.log("Login successful:", matchedUser);

      // remember who's logged in (optional, but useful for other pages)
      localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));

      alert(`Welcome back, ${matchedUser.contactName}!`);
      navigate("/"); // redirect to home page after login
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">LOGIN</h1>
        <p className="required-note">
          <span className="required-star">*</span> Required field
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="email">
              Email Address <span className="required-star">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="password">
              Password <span className="required-star">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="login-actions">
            <button type="submit" className="btn-login">
              Login
            </button>
            <a href="/" className="cancel-link">
              Cancel
            </a>
          </div>

          <div className="login-footer">
            <a href="/forgot-password">Forgot password?</a>
            <span className="divider">|</span>
            <Link to="/signup">Create an account</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;