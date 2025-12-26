import React from "react";
import "./UI.css";

const Button = ({ text, type = "primary" }) => {
  return <button className={`btn ${type}`}>{text}</button>;
};

export default Button;
