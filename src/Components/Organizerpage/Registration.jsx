import { useState } from "react";
import "./registration.css";

function Registration() {
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    password: "",
    confirmPassword: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

    console.log("Registration saved:", formData);
    alert("Registration successful!");

    // clear the form after saving
    setFormData({
      businessName: "",
      contactName: "",
      contactPhone: "",
      contactEmail: "",
      password: "",
      confirmPassword: "",
      country: "",
    });
  };

  return (
    <section className="registration">
      <h1 className="registration-title">Register as a Promoter</h1>
      <p className="registration-subtitle">
        Create your promoter account to start listing events today.
      </p>

      <div className="registration-layout">
        {}
        <div className="registration-card">
          <form onSubmit={handleSubmit}>
            <label className="registration-label" htmlFor="businessName">
              Business Name
            </label>
            <input
              className="registration-input"
              type="text"
              id="businessName"
              name="businessName"
              placeholder="Business Name"
              value={formData.businessName}
              onChange={handleChange}
            />

            <label className="registration-label" htmlFor="contactName">
              Contact Name
            </label>
            <input
              className="registration-input"
              type="text"
              id="contactName"
              name="contactName"
              placeholder="Contact Person"
              value={formData.contactName}
              onChange={handleChange}
            />

            <label className="registration-label" htmlFor="contactPhone">
              Contact Phone
            </label>
            <input
              className="registration-input"
              type="tel"
              id="contactPhone"
              name="contactPhone"
              placeholder="Phone Number"
              value={formData.contactPhone}
              onChange={handleChange}
            />

            <label className="registration-label" htmlFor="contactEmail">
              Contact Email
            </label>
            <input
              className="registration-input"
              type="email"
              id="contactEmail"
              name="contactEmail"
              placeholder="Email Address"
              value={formData.contactEmail}
              onChange={handleChange}
            />

            <label className="registration-label" htmlFor="password">
              Password
            </label>
            <input
              className="registration-input"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

            <label className="registration-label" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className="registration-input"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <label className="registration-label" htmlFor="country">
              Country
            </label>
            <select
              className="registration-select"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
            >
              <option value="">Select your country</option>
              <option value="KE">Kenya</option>
              <option value="UG">Uganda</option>
              <option value="TZ">Tanzania</option>
              <option value="NG">Nigeria</option>
              <option value="ZA">South Africa</option>
              <option value="US">United States</option>
              <option value="GB">United Kingdom</option>
            </select>

            <button className="registration-submit" type="submit">
              Register
            </button>

            <p className="registration-login-text">
              Already have an account?{" "}
              <a className="registration-login-link" href="/login">
                Click here to log in
              </a>
            </p>
          </form>
        </div>

        <div className="registration-side">
          <div className="registration-image-wrapper">
            <img
              className="registration-image"
              src="https://app-h2eowwek47g5xx3g6kwppmndwmmna5tzrvetpjuzjnbsw2k5b7j2.makeproxy-c.figma.site/src/imports/Html%E2%86%92Body/2c1776f0e55ca038c6095d8a2bfbd23c311a0026.png"
              alt="Concert crowd at a festival stage"
            />
          </div>

          <div className="registration-featured-card">
            <p className="registration-featured-label">CURRENTLY FEATURED</p>
            <h3 className="registration-featured-title">
              Neon Nights Festival 2024
            </h3>
            <p className="registration-featured-meta">
              Desert Valley Arena · Oct 12–14
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Registration;