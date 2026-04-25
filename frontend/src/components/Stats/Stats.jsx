import React from "react";
import "./Stats.css";
import { FaUsers, FaStar, FaTrophy, FaAward } from "react-icons/fa";
import CountUp from "react-countup";

const Stats = () => {
  return (
    <section className="stats">
      <div className="stats-grid">

        <div className="stat-card">
          <div className="icon-wrapper">
            <FaUsers className="stat-icon" />
          </div>
          <h3>
            <CountUp end={10000} duration={2.5} separator="," suffix="+" enableScrollSpy scrollSpyOnce />
          </h3>
          <p>Students Trained</p>
        </div>

        <div className="stat-card">
          <div className="icon-wrapper">
            <FaStar className="stat-icon" />
          </div>
          <h3>
            <CountUp end={4.8} decimals={1} duration={2.5} suffix="/5" enableScrollSpy scrollSpyOnce />
          </h3>
          <p>Average Rating</p>
        </div>

        <div className="stat-card">
          <div className="icon-wrapper">
            <FaTrophy className="stat-icon" />
          </div>
          <h3>Top Ranks</h3>
          <p>Every Year</p>
        </div>

        <div className="stat-card">
          <div className="icon-wrapper">
            <FaAward className="stat-icon" />
          </div>
          <h3>
            <CountUp end={50} duration={2.5} suffix="+" enableScrollSpy scrollSpyOnce />
          </h3>
          <p>Awards Won</p>
        </div>

      </div>
    </section>
  );
};

export default Stats;
