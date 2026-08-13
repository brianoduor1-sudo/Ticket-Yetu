import { useState } from "react";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: hook this up to your auth logic / API call
    console.log("Login submitted:", formData);
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
            <a href="/register">Create an account</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
