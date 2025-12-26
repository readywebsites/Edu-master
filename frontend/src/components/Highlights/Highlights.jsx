import React from "react";
import "./Highlights.css";
import { FaChalkboardTeacher, FaClipboardList, FaBook } from "react-icons/fa";

const Highlights = () => {
  return (
    <section className="highlights">
      <div className="highlights-grid">

        {/* CARD 1 */}
        <div className="highlight-card">
          <FaChalkboardTeacher className="highlight-icon" />
          <h3>Expert Faculty</h3>
          <p>Highly qualified mentors for JEE & NEET.</p>
        </div>

        {/* CARD 2 */}
        <div className="highlight-card">
          <FaClipboardList className="highlight-icon" />
          <h3>Smart Test Series</h3>
          <p>Adaptive tests with detailed analysis.</p>
        </div>

        {/* CARD 3 */}
        <div className="highlight-card">
          <FaBook className="highlight-icon" />
          <h3>Quality Study Material</h3>
          <p>Updated notes & easy-to-understand modules.</p>
        </div>

      </div>
    </section>
  );
};

export default Highlights;
