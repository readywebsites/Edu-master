import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Auth.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get selected role from previous screen
  const selectedRole = location.state?.role;

  useEffect(() => {
    // If no role selected, redirect to role selection
    if (!selectedRole && !auth.user) {
      navigate("/login");
    }
  }, [selectedRole, auth.user, navigate]);

  if (auth.user) {
    switch (auth.user.user_type) {
      case 'student':
        return <Navigate to="/dashboard/student" />;
      case 'teacher':
        return <Navigate to="/dashboard/teacher" />;
      case 'admin':
        return <Navigate to="/dashboard/admin" />;
      default:
        return <Navigate to="/" />;
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await auth.login(username, password);

      // We need to check the user type AFTER login success
      // However, auth.login is async and updates state. 
      // Ideally, login should return the user data.
      // Let's assume auth.login throws if failed.

      // Note: The actual redirect logic will be handled in AuthContext or here
      // But we need to validate role match effectively.
      // Since AuthContext handles the state update, we can rely on the user object being updated.

    } catch (err) {
      if (!err?.response) {
        setError("Network Error: Unable to connect to server");
      } else if (err.response?.status === 401) {
        setError("Invalid username or password");
      } else {
        setError("Login failed. Please try again.");
      }
      console.error("Login error:", err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{selectedRole ? `${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Login` : "Login"}</h2>
        <p className="auth-sub">Enter your credentials</p>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            className="auth-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>

        <p className="auth-switch">
          Don’t have an account?{" "}
          <Link to="/register">Create Account</Link>
        </p>

        <p className="auth-switch" style={{ marginTop: '10px' }}>
          <span style={{ cursor: 'pointer', color: '#007bff' }} onClick={() => navigate('/login')}>← Change Role</span>
        </p>
      </div>
    </div>
  );
};

export default Login;