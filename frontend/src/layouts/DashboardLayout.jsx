// src/layouts/DashboardLayout.jsx
import React, { useState, useEffect, useRef } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  BookOpen,
  MessageSquare,
  FileText,
  Briefcase,
  BarChart2,
  User,
  LogOut,
  Bell,
  ChevronDown,
  Lock,
  Settings
} from "lucide-react";
import "./DashboardLayout.css";
import { useAuth } from "../context/AuthContext";
import NotificationSidebar from "../components/NotificationSidebar/NotificationSidebar";

export default function DashboardLayout({ role }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationSidebarOpen, setNotificationSidebarOpen] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const profileDropdownRef = useRef(null);

  // Sample notifications (TODO: Replace with API call)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Assignment Posted',
      message: 'Data Structures Assignment 3 has been posted. Due date: Dec 20, 2024',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      title: 'Exam Schedule Updated',
      message: 'Mid-term exam for Database Management has been rescheduled to Dec 18',
      time: '5 hours ago',
      read: false
    },
    {
      id: 3,
      title: 'Grade Published',
      message: 'Your grade for Computer Networks Quiz 2 is now available',
      time: '1 day ago',
      read: true
    }
  ]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleProfileDropdown = () => setProfileDropdownOpen(!profileDropdownOpen);
  const toggleNotificationSidebar = () => setNotificationSidebarOpen(!notificationSidebarOpen);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleRemoveNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };

    if (profileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileDropdownOpen]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Define menu items based on Role
  const getMenuItems = () => {
    // 🎓 STUDENT MENU
    if (role === "student") {
      return [
        { label: "Dashboard", icon: <Home size={20} />, path: "/dashboard/student" },
        {
          category: "Learn",
          items: [
            { label: "My Courses", icon: <BookOpen size={20} />, path: "/dashboard/student/courses" },
          ]
        },
        {
          category: "Collaborate",
          items: [
            { label: "Messenger", icon: <MessageSquare size={20} />, path: "/dashboard/student/discussions" },
          ]
        },
        {
          category: "Assignments & Exams",
          items: [
            { label: "Assignments", icon: <FileText size={20} />, path: "/dashboard/student/assignments" },
            { label: "Exams", icon: <FileText size={20} />, path: "/dashboard/student/exams" }
          ]
        },
        {
          category: "Academic Activities",
          items: [
            { label: "Project", icon: <Briefcase size={20} />, path: "/dashboard/student/project" }
          ]
        },
        {
          category: "Reports",
          items: [
            { label: "Progress Report", icon: <BarChart2 size={20} />, path: "/dashboard/student/progress-report" }
          ]
        },
        {
          category: "Account Control",
          items: [
            { label: "Personal Profile", icon: <User size={20} />, path: "/dashboard/student/contact" },
            { label: "Account Settings", icon: <Settings size={20} />, path: "/dashboard/student/settings" }
          ]
        }
      ];
    }

    // 🧑‍🏫 TEACHER MENU
    if (role === "teacher") {
      return [
        { label: "Dashboard", icon: <Home size={20} />, path: "/dashboard/teacher" },
        {
          category: "Learn",
          items: [
            { label: "Courses", icon: <BookOpen size={20} />, path: "/dashboard/teacher/courses" },
          ]
        },
        {
          category: "Assignments & Exams",
          items: [
            { label: "Assignments", icon: <FileText size={20} />, path: "/dashboard/teacher/assignments" },
            { label: "Exam Builder", icon: <FileText size={20} />, path: "/dashboard/teacher/exam-builder" },
          ]
        },
        { label: "Student List", icon: <User size={20} />, path: "/dashboard/teacher/students" },
        {
          category: "Collaborate",
          items: [
            { label: "Discussion Forum", icon: <MessageSquare size={20} />, path: "/dashboard/teacher/discussions" },
            { label: "Messenger", icon: <MessageSquare size={20} />, path: "/dashboard/teacher/messenger" }
          ]
        },
        {
          category: "Academic Activities",
          items: [
            { label: "Projects", icon: <Briefcase size={20} />, path: "/dashboard/teacher/projects" },
          ]
        },
      ];
    }

    // 🛡️ ADMIN MENU
    return [
      { label: "Dashboard", icon: <Home size={20} />, path: "/dashboard/admin" },
      {
        category: "User Management",
        items: [
          { label: "Teachers", icon: <User size={20} />, path: "/dashboard/admin/teachers" },
          { label: "Students", icon: <User size={20} />, path: "/dashboard/admin/students" },
        ]
      },
      { label: "Courses", icon: <BookOpen size={20} />, path: "/dashboard/admin/courses" },
      { label: "Announcements", icon: <Bell size={20} />, path: "/dashboard/admin/announcements" },
      { label: "Settings", icon: <Settings size={20} />, path: "/dashboard/admin/settings" },
    ];
  };

  const menuStructure = getMenuItems();

  return (
    <div className="dashboard-container">
      {/* SIDEBAR */}
      <aside className={`dashboard-sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-header">
          <span>EduMaster</span>
          <button className="mobile-toggle" onClick={toggleSidebar} style={{ color: '#fff' }}>
            <X size={24} />
          </button>
        </div>

        <div className="sidebar-menu">
          {menuStructure.map((item, index) => {
            // If it's a category
            if (item.category) {
              return (
                <div key={index}>
                  <div className="menu-category">{item.category}</div>
                  {item.items.map((subItem, subIndex) => (
                    <NavLink
                      key={subIndex}
                      to={subItem.path}
                      className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}
                      onClick={() => setSidebarOpen(false)} // Close on mobile
                    >
                      {subItem.icon}
                      <span>{subItem.label}</span>
                    </NavLink>
                  ))}
                </div>
              );
            }
            // Standard Item
            return (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}
                end
                onClick={() => setSidebarOpen(false)}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>

        <div className="sidebar-footer">
          <div className="menu-item" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </div>
        </div>
      </aside>

      {/* OVERLAY for Mobile */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999
          }}
        />
      )}

      {/* MAIN CONTENT */}
      <main className="dashboard-main">
        {/* TOPBAR */}
        <header className="dashboard-topbar">
          <div className="topbar-left">
            <button className="mobile-toggle" onClick={toggleSidebar}>
              <Menu size={24} />
            </button>
            <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Dashboard</h2>
          </div>

          <div className="topbar-right">


            <div className="icon-btn" style={{ position: 'relative', cursor: 'pointer' }} onClick={toggleNotificationSidebar}>
              <Bell size={20} color="#555" />
              {unreadCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-6px',
                  width: '18px',
                  height: '18px',
                  background: '#dc3545',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.7rem',
                  color: 'white',
                  fontWeight: 'bold',
                  border: '2px solid white'
                }}>
                  {unreadCount}
                </span>
              )}
            </div>

            <div className="user-profile" style={{ position: 'relative' }} ref={profileDropdownRef}>
              <div
                className="user-profile-trigger"
                onClick={toggleProfileDropdown}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
              >
                <div className="user-avatar">
                  {user?.username ? user.username[0].toUpperCase() : "U"}
                </div>
                <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>{user?.username || "User"}</span>
                <ChevronDown size={16} style={{ transition: 'transform 0.2s', transform: profileDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
              </div>

              {/* Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="profile-dropdown">
                  <div className="profile-dropdown-header">
                    <div className="user-avatar" style={{ width: '40px', height: '40px', fontSize: '1.2rem' }}>
                      {user?.username ? user.username[0].toUpperCase() : "U"}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{user?.username || "User"}</div>
                      <div style={{ fontSize: '0.75rem', color: '#6c757d' }}>{user?.email || "user@example.com"}</div>
                    </div>
                  </div>

                  <div className="profile-dropdown-divider"></div>

                  <div className="profile-dropdown-item" onClick={() => { setProfileDropdownOpen(false); navigate('/dashboard/student/settings'); }}>
                    <Settings size={18} />
                    <span>Account Settings</span>
                  </div>

                  <div className="profile-dropdown-item" onClick={() => { setProfileDropdownOpen(false); navigate('/dashboard/student/change-password'); }}>
                    <Lock size={18} />
                    <span>Change Password</span>
                  </div>

                  <div className="profile-dropdown-divider"></div>

                  <div className="profile-dropdown-item" onClick={handleLogout} style={{ color: '#dc3545' }}>
                    <LogOut size={18} />
                    <span>Sign Out</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* CONTENT AREA */}
        <div className="dashboard-content">
          <Outlet />
        </div>
      </main>

      {/* NOTIFICATION SIDEBAR */}
      <NotificationSidebar
        isOpen={notificationSidebarOpen}
        onClose={() => setNotificationSidebarOpen(false)}
        notifications={notifications}
        onClearAll={handleClearAll}
        onRemove={handleRemoveNotification}
      />
    </div>
  );
}
