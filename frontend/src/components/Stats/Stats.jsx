import React from "react";
import "./Stats.css";
import { FaUsers, FaStar, FaTrophy } from "react-icons/fa";

const Stats = () => {
  return (
    <section className="stats">
      <div className="stats-grid">

        <div className="stat-card">
          <FaUsers className="stat-icon" />
          <h3>10,000+</h3>
          <p>Students Trained</p>
        </div>

        <div className="stat-card">
          <FaStar className="stat-icon" />
          <h3>4.8/5</h3>
          <p>Average Rating</p>
        </div>

        <div className="stat-card">
          <FaTrophy className="stat-icon" />
          <h3>Top Ranks</h3>
          <p>Every Year</p>
        </div>

      </div>
    </section>
  );
};

export default Stats;
