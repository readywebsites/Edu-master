import React from "react";
import { useNavigate } from "react-router-dom"; // <-- add this
import "./ResourceInner.css";

const AssignmentsPage = () => {
  const navigate = useNavigate(); // <-- navigation hook

  const list = [
    { id: 1, title: "Assignment 1: Introduction to Coding", file: "Assignment 1 Introduction to Coding.pdf", due: "Due in 2 days" },
    { id: 2, title: "Assignment 2: Functions & Loops", file: "Assignment 2 Functions  Loops.pdf", due: "Due in 4 days" },
  ];

  return (
    <div className="inner-wrapper">



      {/* HEADER */}
      <div className="inner-header">
        <div className="inner-icon">📂</div>
        <div>
          <h2 className="inner-title">Assignments</h2>
          <p className="inner-subtitle">Download tasks and upload your response.</p>
        </div>
      </div>

      {/* ASSIGNMENTS LIST */}
      <div className="notes-grid">
        {list.map((item) => (
          <div key={item.id} className="notes-card">

            {/* ASSIGNMENT LEFT */}
            <div className="notes-info">
              <span className="notes-fileicon">📄</span>
              <div>
                <h4 className="notes-heading">{item.title}</h4>
                <p className="notes-sub">{item.file} • {item.due}</p>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="notes-actions">
              <a
                href={`/Assigment/${item.file}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn view-btn"
              >
                📎 View
              </a>

              <a
                href={`/Assigment/${item.file}`}
                download
                className="btn download-btn"
              >
                ⬇ Download
              </a>
            </div>

            {/* UPLOAD ANSWER */}
            <div className="assignment-upload">
              <label className="upload-assign-btn">
                📤 Upload Answer
                <input type="file" hidden onChange={() => alert("File attached, submit now!")} />
              </label>

              <button
                className="submit-assign-btn"
                onClick={() => alert("Assignment Submitted Successfully!")}
              >
                🚀 Submit
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* 🔙 Back Button */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>
    </div>
  );
};

export default AssignmentsPage;
