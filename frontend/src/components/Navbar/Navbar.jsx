// src/components/Navbar.jsx
import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Bell } from "lucide-react";
import NotificationSidebar from "../NotificationSidebar/NotificationSidebar";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { user, logout } = useAuth();

  // Mock notifications state lifted from Sidebar
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Welcome to EduMaster",
      message: "We're glad to have you here! Explore our new courses.",
      time: "2 hours ago"
    },
    {
      id: 2,
      title: "New Course Added",
      message: "Advanced React Patterns is now available.",
      time: "1 day ago"
    },
    {
      id: 3,
      title: "Assignment Due",
      message: "Your physics assignment is due tomorrow.",
      time: "2 days ago"
    }
  ]);

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">

          {/* Left Logo */}
          <div className="nav-left">
            <div className="logo-box">EM</div>
            <div className="logo-text">
              <h2>EduMaster</h2>
              <span>COACHING</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/admissions">Admissions</Link></li>
            <li><Link to="/resources">Resources</Link></li>
            <li><Link to="/faculty">Faculty</Link></li>
            <li><Link to="/placements">Achievement</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>

          {/* Right Buttons */}
          <div className="nav-right">

            {/* ⭐ Dashboard Button (Only if Logged In) */}
            {user && user.user_type === 'teacher' && (
              <Link to="/teacher-admin">
                <button className="teacher-btn">Dashboard</button>
              </Link>
            )}

            {/* ⭐ Notification Bell (Only if Logged In) */}
            {user && (
              <div
                className="notification-icon-wrapper"
                onClick={() => setShowNotifications(true)}
                style={{ cursor: 'pointer', marginRight: '15px', display: 'flex', alignItems: 'center', position: 'relative' }}
              >
                <Bell size={24} color="#333" />
                {notifications.length > 0 && (
                  <span className="notification-badge"></span>
                )}
              </div>
            )}

            {/* ⭐ Login/Logout */}
            {user ? (
              <button className="login-btn" onClick={logout}>Logout</button>
            ) : (
              <Link to="/login">
                <button className="login-btn">Login</button>
              </Link>
            )}

            {/* Hamburger */}
            <div className="menu-icon" onClick={() => setMenuOpen(true)}>
              ☰
            </div>
          </div>

        </div>
      </nav>

      {/* Notification Sidebar */}
      <NotificationSidebar
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={notifications}
        onClearAll={clearAllNotifications}
        onRemove={removeNotification}
      />

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="close-btn" onClick={() => setMenuOpen(false)}>×</div>

        <Link onClick={() => setMenuOpen(false)} to="/">Home</Link>
        <Link onClick={() => setMenuOpen(false)} to="/courses">Courses</Link>
        <Link onClick={() => setMenuOpen(false)} to="/admissions">Admissions</Link>
        <Link onClick={() => setMenuOpen(false)} to="/resources">Resources</Link>
        <Link onClick={() => setMenuOpen(false)} to="/faculty">Faculty</Link>
        <Link onClick={() => setMenuOpen(false)} to="/placements">Placements</Link>
        <Link onClick={() => setMenuOpen(false)} to="/blog">Blog</Link>
        <Link onClick={() => setMenuOpen(false)} to="/contact">Contact</Link>

        {/* ⭐ Mobile Login/Logout */}
        {user ? (
          <>
            <div onClick={() => { setShowNotifications(true); setMenuOpen(false); }} className="mobile-nav-item" style={{ cursor: 'pointer', padding: '10px 0', fontSize: '1.2rem', display: 'flex', alignItems: 'center' }}>
              Notifications
              {notifications.length > 0 && (
                <span style={{ marginLeft: '10px', background: 'red', color: 'white', borderRadius: '50%', padding: '2px 8px', fontSize: '0.8rem' }}>{notifications.length}</span>
              )}
            </div>
            <Link onClick={() => { logout(); setMenuOpen(false); }} to="/login">Logout</Link>
          </>
        ) : (
          <Link onClick={() => setMenuOpen(false)} to="/login">Login</Link>
        )}
      </div>
    </>
  );
};

export default Navbar;
