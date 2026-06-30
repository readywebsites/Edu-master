import React from "react";
import "./Stats.css";
import { FaUsers, FaStar, FaTrophy, FaAward } from "react-icons/fa";
import CountUp from "react-countup";
import Tilt from "react-parallax-tilt";

const Stats = () => {
  return (
    <section className="stats">
      {/* Background Glowing Blobs */}
      <div className="stats-glow-blob blob-orange"></div>
      <div className="stats-glow-blob blob-blue"></div>
      <div className="stats-glow-blob blob-purple"></div>

      {/* Floating Education Icons */}
      <div className="stats-floating-icon icon-cap">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
        </svg>
      </div>
      <div className="stats-floating-icon icon-book">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      </div>
      <div className="stats-floating-icon icon-atom">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="12" rx="3" ry="9" transform="rotate(45 12 12)" />
          <ellipse cx="12" cy="12" rx="3" ry="9" transform="rotate(-45 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="3" />
          <circle cx="12" cy="12" r="1" />
        </svg>
      </div>
      <div className="stats-floating-icon icon-flask">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 3h12M8 3v7L3.6 19.2C3.1 20.2 3.8 21 5 21h14c1.2 0 1.9-.8 1.4-1.8L16 10V3" />
        </svg>
      </div>
      <div className="stats-floating-icon icon-globe">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      </div>
      <div className="stats-floating-icon icon-trophy">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34M12 2a6 6 0 0 1 6 6c0 3.6-2 6-6 6s-6-2.4-6-6a6 6 0 0 1 6-6z" />
        </svg>
      </div>

      <div className="stats-container">
        <div className="stats-header" data-aos="fade-up">
          <span className="stats-subtitle">Our Impact in Numbers</span>
          <h2>Milestones of Academic Excellence</h2>
          <p>
            Empowering thousands of students every year to crack India's toughest competitive exams.
          </p>
        </div>
        <div className="stats-grid">
        <div data-aos="fade-left" data-aos-delay="0">
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

        <div data-aos="fade-left" data-aos-delay="100">
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

        <div data-aos="fade-left" data-aos-delay="200">
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

        <div data-aos="fade-left" data-aos-delay="300">
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
    </div>
  </section>
);
};

export default Stats;
