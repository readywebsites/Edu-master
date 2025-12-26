import React from "react";
import "./Footer.css";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* LOGO AREA */}
        <div className="footer-col">
          <h2 className="footer-logo">EduMaster</h2>
          <p>India’s Most Trusted Coaching Institute for JEE & NEET.</p>

          <div className="footer-social">
            <FaFacebook />
            <FaInstagram />
            <FaYoutube />
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-col">
          <h3>Quick Links</h3>
          <a href="/courses">Courses</a>
          <a href="/admissions">Admissions</a>
          <a href="/resources">Resources</a>
          <a href="/faculty">Faculty</a>
        </div>

        {/* COURSES */}
        <div className="footer-col">
          <h3>Our Programs</h3>
          <p>JEE Main + Advanced</p>
          <p>NEET Full Year</p>
          <p>Foundation (9th–10th)</p>
          <p>Crash Courses</p>
        </div>

        {/* CONTACT */}
        <div className="footer-col">
          <h3>Contact Us</h3>
          <p>📍 New Delhi, India</p>
          <p>📞 +91 98765 43210</p>
          <p>📧 support@edumaster.com</p>
        </div>

      </div>

      <div className="footer-bottom">
        © 2025 EduMaster — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
