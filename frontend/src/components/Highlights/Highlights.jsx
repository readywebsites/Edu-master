import React from "react";
import { useNavigate } from "react-router-dom";
import "./Highlights.css";
import { FaChalkboardTeacher, FaClipboardList, FaBook } from "react-icons/fa";

const Highlights = () => {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  const handleCardKeyDown = (e, path) => {
    // Allows keyboard users to activate the card using Enter or Space key
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navigate(path);
    }
  };

  return (
    <section className="highlights">
      <div className="highlights-container">
        
        <div className="highlights-header">
          <h2>Why Choose Us?</h2>
          <p>Empowering students to achieve their academic dreams</p>
        </div>

        <div className="highlights-grid">
          {/* CARD 1 */}
          <div 
            className="highlight-card"
            role="button"
            tabIndex={0}
            onClick={() => handleCardClick("/faculty")}
            onKeyDown={(e) => handleCardKeyDown(e, "/faculty")}
          >
            <div className="icon-wrapper">
              <FaChalkboardTeacher className="highlight-icon" />
            </div>
            <h3>Expert Faculty</h3>
            <p>Highly qualified mentors for JEE & NEET.</p>
          </div>

          {/* CARD 2 */}
          <div 
            className="highlight-card"
            role="button"
            tabIndex={0}
            onClick={() => handleCardClick("/resources/tests")}
            onKeyDown={(e) => handleCardKeyDown(e, "/resources/tests")}
          >
            <div className="icon-wrapper">
              <FaClipboardList className="highlight-icon" />
            </div>
            <h3>Smart Test Series</h3>
            <p>Adaptive tests with detailed analysis.</p>
          </div>

          {/* CARD 3 */}
          <div 
            className="highlight-card card-3"
            role="button"
            tabIndex={0}
            onClick={() => handleCardClick("/resources/notes")}
            onKeyDown={(e) => handleCardKeyDown(e, "/resources/notes")}
          >
            <div className="icon-wrapper">
              <FaBook className="highlight-icon" />
            </div>
            <h3>Quality Study Material</h3>
            <p>Updated notes & easy-to-understand modules.</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Highlights;
