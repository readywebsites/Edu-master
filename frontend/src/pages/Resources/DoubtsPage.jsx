import React from "react";
import { useNavigate } from "react-router-dom"; // <-- add this
import "./ResourceInner.css";

const DoubtsPage = () => {
  const navigate = useNavigate(); // <-- back nav function

  const list = [
    { id: 1, title: "How to reverse a linked list?", file: "linkedlist.jpg", type: "Image" },
    { id: 2, title: "What is recursion?", file: "recursion.pdf", type: "PDF" },
  ];

  return (
    <div className="inner-wrapper">



      {/* HEADER */}
      <div className="inner-header">
        <div className="inner-icon">💬</div>
        <div>
          <h2 className="inner-title">Doubt Support</h2>
          <p className="inner-subtitle">Ask doubts anytime. Our mentors will respond soon.</p>
        </div>
      </div>

      {/* ASK DOUBT BOX */}
      <div className="doubt-box">
        <textarea placeholder="Type your doubt here... (e.g. What is DSA?)" />
        <div className="doubt-actions">
          <label className="upload-btn">
            📎 Attach
            <input type="file" hidden />
          </label>
          <button className="send-btn">🚀 Ask Doubt</button>
        </div>
      </div>

      {/* PREVIOUS DOUBTS LIST */}
      <h3 className="recent-title">Recent Asked Doubts</h3>
      <div className="notes-grid">
        {list.map((item) => (
          <div key={item.id} className="notes-card">
            <div className="notes-info">
              <span className="notes-fileicon">❓</span>
              <div>
                <h4 className="notes-heading">{item.title}</h4>
                <p className="notes-sub">{item.type} Uploaded</p>
              </div>
            </div>

            <div className="notes-actions">
              <button
                className="btn view-btn"
                onClick={() => alert("Preview feature coming soon!")}
              >
                Preview
              </button>

              <button
                className="btn download-btn"
                onClick={() => alert("Download file feature coming soon!")}
              >
                💾 Save
              </button>
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

export default DoubtsPage;
