import React from "react";
import "./Contact.css";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="contact-page">

      {/* HERO SECTION */}
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>We're here to help! Reach out for admissions, courses, or any queries.</p>
      </section>

      {/* CONTACT GRID */}
      <div className="contact-grid">

        {/* LEFT: CONTACT INFO */}
        <div className="contact-info">
          <h2>Get in Touch</h2>

          <div className="info-box">
            <FaPhoneAlt className="info-icon" />
            <p>+91 98765 43210</p>
          </div>

          <div className="info-box">
            <FaEnvelope className="info-icon" />
            <p>support@edumaster.com</p>
          </div>

          <div className="info-box">
            <FaMapMarkerAlt className="info-icon" />
            <p>EduMaster Coaching, Near City Center, New Delhi</p>
          </div>
        </div>

        {/* RIGHT: CONTACT FORM */}
        <div className="contact-form">
          <h2>Send a Message</h2>

          <form>
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email Address" required />
            <input type="text" placeholder="Phone Number" required />

            <textarea rows="5" placeholder="Your Message..." required></textarea>

            <button type="submit">Send Message →</button>
          </form>
        </div>

      </div>

      {/* LOCATIONS */}
      <h2 className="location-title">Our Centers</h2>
      <div className="location-grid">

        <div className="location-card">
          <h3>New Delhi</h3>
          <p>Near Metro Station, Connaught Place</p>
        </div>

        <div className="location-card">
          <h3>Mumbai</h3>
          <p>Sector 14, Andheri West</p>
        </div>

        <div className="location-card">
          <h3>Jaipur</h3>
          <p>Raja Park, Main Market</p>
        </div>

      </div>

    </div>
  );
};

export default Contact;
