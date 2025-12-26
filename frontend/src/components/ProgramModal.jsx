import React from "react";
import "./ProgramModal.css";

const ProgramModal = ({ open, onClose, data }) => {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box pop-in" onClick={(e) => e.stopPropagation()}>
        <h2>{data.title}</h2>
        <p className="modal-desc">{data.desc}</p>

        <ul className="modal-list">
          {data.points?.map((p, i) => (
            <li key={i}>• {p}</li>
          ))}
        </ul>

        <button className="modal-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ProgramModal;
