import React from "react";
import "./AchieversPreview.css";

const AchieversPreview = () => (
  <section className="achievers-preview">
    <h3>Recent Achievers</h3>
    <div className="ach-grid">
      <div className="ach-card"><strong>Aman G.</strong><p>JEE Advanced AIR 112</p></div>
      <div className="ach-card"><strong>Riya S.</strong><p>NEET AIR 78</p></div>
      <div className="ach-card"><strong>Pooja S.</strong><p>NEET 690/720</p></div>
    </div>
  </section>
);

export default AchieversPreview;
