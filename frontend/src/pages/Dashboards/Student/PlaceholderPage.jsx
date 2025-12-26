// src/pages/Dashboards/Student/PlaceholderPage.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

export default function PlaceholderPage({ title }) {
  const location = useLocation();
  const pageTitle = title || location.pathname.split('/').pop().replace(/-/g, ' ').toUpperCase();

  return (
    <div className="fade-in" style={{ textAlign: "center", padding: "3rem", background: "white", borderRadius: "10px" }}>
      <h2>{pageTitle}</h2>
      <p style={{ color: "#6c757d", marginTop: "1rem" }}>This feature is under development.</p>
      <img
        src="https://cdni.iconscout.com/illustration/premium/thumb/web-development-2974925-2477356.png"
        alt="Under Construction"
        style={{ maxWidth: "300px", marginTop: "2rem", opacity: 0.8 }}
      />
    </div>
  );
}
