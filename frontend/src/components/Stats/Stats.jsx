import React from "react";
import "./Stats.css";
import { FaUsers, FaStar, FaTrophy, FaAward } from "react-icons/fa";
import CountUp from "react-countup";
import Tilt from "react-parallax-tilt";

const Stats = () => {
  return (
    <section className="stats">
      <div className="stats-grid">
        <div data-aos="fade-up" data-aos-delay="0">
          <Tilt tiltMaxAngleX={20} tiltMaxAngleY={20} scale={1.05} transitionSpeed={500} glareEnable={true} glareMaxOpacity={0.5}>
            <div className="stat-card">
              <div className="icon-wrapper">
                <FaUsers className="stat-icon" />
              </div>
              <h3>
                <CountUp end={10000} duration={2.5} separator="," suffix="+" enableScrollSpy scrollSpyOnce scrollSpyDelay={200} />
              </h3>
              <p>Students Trained</p>
            </div>
          </Tilt>
        </div>

        <div data-aos="fade-up" data-aos-delay="100">
          <Tilt tiltMaxAngleX={20} tiltMaxAngleY={20} scale={1.05} transitionSpeed={500} glareEnable={true} glareMaxOpacity={0.5}>
            <div className="stat-card">
              <div className="icon-wrapper">
                <FaStar className="stat-icon" />
              </div>
              <h3>
                <CountUp end={4.8} decimals={1} duration={2.5} suffix="/5" enableScrollSpy scrollSpyOnce scrollSpyDelay={300} />
              </h3>
              <p>Average Rating</p>
            </div>
          </Tilt>
        </div>

        <div data-aos="fade-up" data-aos-delay="200">
          <Tilt tiltMaxAngleX={20} tiltMaxAngleY={20} scale={1.05} transitionSpeed={500} glareEnable={true} glareMaxOpacity={0.5}>
            <div className="stat-card">
              <div className="icon-wrapper">
                <FaTrophy className="stat-icon" />
              </div>
              <h3>Top Ranks</h3>
              <p>Every Year</p>
            </div>
          </Tilt>
        </div>

        <div data-aos="fade-up" data-aos-delay="300">
          <Tilt tiltMaxAngleX={20} tiltMaxAngleY={20} scale={1.05} transitionSpeed={500} glareEnable={true} glareMaxOpacity={0.5}>
            <div className="stat-card">
              <div className="icon-wrapper">
                <FaAward className="stat-icon" />
              </div>
              <h3>
                <CountUp end={50} duration={2.5} suffix="+" enableScrollSpy scrollSpyOnce scrollSpyDelay={500} />
              </h3>
              <p>Awards Won</p>
            </div>
          </Tilt>
        </div>
      </div>
    </section>
  );
};

export default Stats;
