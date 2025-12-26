import React from "react";
import "./UI.css";

const Select = ({ label, options }) => {
  return (
    <div className="input-box">
      <label>{label}</label>
      <select>
        {options.map((opt, i) => (
          <option key={i}>{opt}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;
