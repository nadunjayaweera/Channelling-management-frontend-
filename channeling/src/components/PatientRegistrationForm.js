import React, { useState } from "react";
import "../styles/Auth.css";

const PatientRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.mobileNo) newErrors.mobileNo = "Mobile number is required";
    if (
      formData.mobileNo &&
      !/^\d{10}$/.test(formData.mobileNo.replace(/\D/g, ""))
    ) {
      newErrors.mobileNo = "Mobile number must be 10 digits";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    console.log("Patient Registration:", formData);
    setSubmitted(true);
    // Handle registration logic here
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Patient Registration</h2>
        {submitted && (
          <div className="success-message">Registration successful!</div>
        )}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Full Name:</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your full name"
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your email"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="mobileNo">Mobile Number:</label>
            <input
              id="mobileNo"
              type="tel"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter 10-digit mobile number"
              maxLength="10"
            />
            {errors.mobileNo && (
              <span className="error-text">{errors.mobileNo}</span>
            )}
          </div>

          <button type="submit" className="btn-primary">
            Register as Patient
          </button>
        </form>
        <p className="auth-footer">
          Already have an account? <a href="#login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default PatientRegistrationForm;
