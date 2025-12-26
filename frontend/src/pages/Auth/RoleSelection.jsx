import React from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    navigate("/authenticate", { state: { role } });
  };

  return (
    <div className="auth-container">
      <div className="auth-box role-selection-box">
        <h2>Select Your Role</h2>
        <p className="auth-sub">Choose your account type to login</p>

        <div className="role-cards">
          <div className="role-card" onClick={() => handleRoleSelect("student")}>
            <div className="role-icon">🎓</div>
            <h3>Student</h3>
            <p>Access courses & resources</p>
          </div>

          <div className="role-card" onClick={() => handleRoleSelect("teacher")}>
            <div className="role-icon">👨‍🏫</div>
            <h3>Teacher</h3>
            <p>Manage courses & students</p>
          </div>

          <div className="role-card" onClick={() => handleRoleSelect("admin")}>
            <div className="role-icon">🛡️</div>
            <h3>Admin</h3>
            <p>System control center</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
