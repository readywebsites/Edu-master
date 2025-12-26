import React from "react";
import "./UI.css";

const Input = ({ label, placeholder }) => {
  return (
    <div className="input-box">
      <label>{label}</label>
      <input placeholder={placeholder} />
    </div>
  );
};

export default Input;
