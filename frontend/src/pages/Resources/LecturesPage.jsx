import React from "react";
import { Link, useNavigate } from "react-router-dom"; // <-- added
import "./ResourceInner.css";

const LecturesPage = () => {
  const navigate = useNavigate();

  const lectures = [
    { id: 1, title: "Lecture 1 — Introduction to Programming", duration: "15:42", file: "01 - Introduction.mp4" },
    { id: 2, title: "Lecture 2 — Operators Explained", duration: "22:10", file: "02 - Oprators explained.mp4" },
    { id: 3, title: "Lecture 3 — Loop Control & Flow", duration: "18:55", file: "03 - Loop control and flow.mp4" },
    { id: 4, title: "Lecture 4 — Functions & Scope", duration: "26:32", file: "04 - Function.mp4" },
  ];

  return (
    <div className="inner-wrapper">



      {/* PAGE HEADER */}
      <div className="inner-header">
        <span className="inner-icon">🎧</span>
        <div>
          <h2 className="inner-title">Video Lectures</h2>
          <p className="inner-subtitle">Watch recorded lectures anytime.</p>
        </div>
      </div>

      {/* LECTURE GRID */}
      <div className="notes-grid">
        {lectures.map((lec) => (
          <div key={lec.id} className="notes-card">
            <div className="notes-info">
              <span className="notes-fileicon">🎥</span>
              <div>
                <h3 className="notes-heading">{lec.title}</h3>
                <p className="notes-sub">{lec.duration} • {lec.file}</p>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="notes-actions">
              <Link
                to={`/resources/preview/${lec.id}`}
                state={lec}
                className="btn view-btn"
              >
                ▶ Watch
              </Link>

              <a
                href={`/Lectires video/${lec.file}`}
                download
                className="btn download-btn"
              >
                ⬇ Download
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* 🔙 BACK BUTTON */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>
    </div>
  );
};

export default LecturesPage;
