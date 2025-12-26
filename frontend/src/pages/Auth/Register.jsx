import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../services/api";
import "./Auth.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    user_type: "student" // Default role
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(formData);
      // On success, redirect to Login
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err);
      // Improve error handling: check for specific field errors from Django
      if (err.response && err.response.data) {
        // If the backend returns { username: ["Exists"] }
        const msg = Object.values(err.response.data).flat().join(", ");
        setError(msg || "Registration failed. Please try again.");
      } else {
        setError("Registration failed. Server might be down.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create Account</h2>
        <p className="auth-sub">Join EduMaster today</p>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="auth-input"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="auth-input"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="auth-input"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <select
            name="user_type"
            className="auth-input"
            value={formData.user_type}
            onChange={handleChange}
            style={{ backgroundColor: '#fff' }}
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>

          {error && <p className="error-message" style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>}

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
