import React from "react";
import "./PopularCourses.css";
import { FaAtom, FaHeartbeat } from "react-icons/fa";

const PopularCourses = () => {
  return (
    <section className="popular-section">

      <h2 className="popular-title">Popular Courses</h2>

      <div className="popular-grid">

        <div className="pop-card">
          <FaAtom className="pop-icon jee" />
          <h3>JEE Main + Advanced</h3>
          <p>Complete 1-Year Target Batch for IIT Aspirants.</p>
        </div>

        <div className="pop-card">
          <FaHeartbeat className="pop-icon neet" />
          <h3>NEET Full Course</h3>
          <p>Complete Medical Entrance Preparation.</p>
        </div>

      </div>

    </section>
  );
};

export default PopularCourses;
