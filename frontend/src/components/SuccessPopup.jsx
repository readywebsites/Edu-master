import React from "react";
import "./SuccessPopup.css";

const SuccessPopup = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-box zoom-in" onClick={(e) => e.stopPropagation()}>
        <h2>🎉 Submitted Successfully!</h2>
        <p>Our counsellor will contact you shortly.</p>

        <button onClick={onClose} className="popup-btn">Okay</button>
      </div>
    </div>
  );
};

export default SuccessPopup;
