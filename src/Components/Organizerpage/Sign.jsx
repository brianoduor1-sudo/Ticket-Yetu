import { useState } from "react";
import { Link } from "react-router-dom";
import "./Sign.css";

function Sign() {
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    password: "",
    confirmPassword: "",
    country: "Kenya",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // basic check so passwords match before saving
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // 1. get existing users (or start with an empty array)
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // 2. add the new one
    const updatedUsers = [...existingUsers, formData];

    // 3. save back to localStorage
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    console.log("Sign up saved:", formData);
    alert("Registration successful!");

    // clear the form after saving
    setFormData({
      businessName: "",
      contactName: "",
      contactPhone: "",
      contactEmail: "",
      password: "",
      confirmPassword: "",
      country: "Kenya",
    });
  };

  return (
    <div className="sign-page">
      <div className="sign-form-side">
        <h1 className="sign-title">Create an Account</h1>

        <form onSubmit={handleSubmit}>
          <div className="sign-field">
            <label htmlFor="businessName">Business Name :</label>
            <div className="sign-input-wrapper">
              <span className="sign-icon" aria-hidden="true">
                🏢
              </span>
              <input
                type="text"
                id="businessName"
                name="businessName"
                placeholder="Business Name"
                value={formData.businessName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="sign-field">
            <label htmlFor="contactName">Contact Name :</label>
            <div className="sign-input-wrapper">
              <span className="sign-icon" aria-hidden="true">
                👤
              </span>
              <input
                type="text"
                id="contactName"
                name="contactName"
                placeholder="Contact Person"
                value={formData.contactName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="sign-field">
            <label htmlFor="contactPhone">Contact Phone :</label>
            <div className="sign-input-wrapper">
              <span className="sign-icon" aria-hidden="true">
                📞
              </span>
              <input
                type="tel"
                id="contactPhone"
                name="contactPhone"
                placeholder="Phone Number"
                value={formData.contactPhone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="sign-field">
            <label htmlFor="contactEmail">Contact Email :</label>
            <div className="sign-input-wrapper">
              <span className="sign-icon" aria-hidden="true">
                ✉️
              </span>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                placeholder="Email Address"
                value={formData.contactEmail}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="sign-field">
            <label htmlFor="password">Password :</label>
            <div className="sign-input-wrapper">
              <span className="sign-icon" aria-hidden="true">
                🔒
              </span>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="sign-toggle-visibility"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div className="sign-field">
            <label htmlFor="confirmPassword">Confirm Password :</label>
            <div className="sign-input-wrapper">
              <span className="sign-icon" aria-hidden="true">
                🔒
              </span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="sign-toggle-visibility"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div className="sign-field">
            <label htmlFor="country">Country :</label>
            <div className="sign-input-wrapper">
              <span className="sign-icon" aria-hidden="true">
                📍
              </span>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
              >
                <option value="Kenya">Kenya</option>
                <option value="Uganda">Uganda</option>
                <option value="Tanzania">Tanzania</option>
                <option value="Rwanda">Rwanda</option>
                <option value="Nigeria">Nigeria</option>
                <option value="South Africa">South Africa</option>
              </select>
            </div>
          </div>

          <button type="submit" className="sign-register-btn">
            Register
          </button>

          <p className="sign-login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>

      <div className="sign-image-side">
        <div className="sign-image-overlay-text">
          <span>EVENTS</span>
          <span>HOLIDAYS</span>
          <span>FLIGHTS</span>
          <span>HOTELS</span>
        </div>

        <div className="sign-image-collage">
          <div className="sign-collage-card card-1">
            <img src="https://picsum.photos/seed/holidays/400/600" alt="" />
          </div>
          <div className="sign-collage-card card-2">
            <img src="https://picsum.photos/seed/events/400/600" alt="" />
          </div>
          <div className="sign-collage-card card-3">
            <img src="https://picsum.photos/seed/flights/400/600" alt="" />
          </div>
          <div className="sign-collage-card card-4">
            <img src="https://picsum.photos/seed/hotels/400/600" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sign;