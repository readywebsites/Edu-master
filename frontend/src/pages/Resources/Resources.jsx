import React from "react";
import "./Resources.css";
import { Link } from "react-router-dom";

const Resources = () => {
  return (
    <div className="resources-page">

      {/* HEADER */}
      <section className="res-hero">
        <h1>Student Resources</h1>
        <p>Your complete study support hub — notes, PDFs, test series, assignments & more.</p>
      </section>

      {/* RESOURCE CARDS */}
      <section className="res-grid">
        <div className="res-card">
          <div className="res-icon">📘</div>
          <h3>Study Materials</h3>
          <p>Structured chapter notes.</p>
          <Link to="/resources/notes"><button>Download Notes →</button></Link>
        </div>

        <div className="res-card">
          <div className="res-icon">📝</div>
          <h3>Previous Year Papers</h3>
          <p>All past papers with solutions.</p>
          <Link to="/resources/papers"><button>View Papers →</button></Link>
        </div>

        <div className="res-card">
          <div className="res-icon">📊</div>
          <h3>Test Series</h3>
          <p>Adaptive test series.</p>
          <Link to="/resources/tests"><button>Attempt Test →</button></Link>
        </div>

        <div className="res-card">
          <div className="res-icon">🎧</div>
          <h3>Video Lectures</h3>
          <p>Recorded lectures for revision.</p>
          <Link to="/resources/lectures"><button>Watch Lectures →</button></Link>
        </div>

        <div className="res-card">
          <div className="res-icon">💬</div>
          <h3>Doubt Support</h3>
          <p>Ask doubts anytime.</p>
          <Link to="/resources/doubts"><button>Ask Doubts →</button></Link>
        </div>

        <div className="res-card">
          <div className="res-icon">📂</div>
          <h3>Assignments</h3>
          <p>Daily & weekly assignments.</p>
          <Link to="/resources/assignments"><button>Download Assignments →</button></Link>
        </div>
      </section>
    </div>
  );
};

export default Resources;
