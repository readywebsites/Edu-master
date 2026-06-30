import heroImg from "../../assets/hero.jpg";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Hero.css";

const Hero = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  return (
    <section className="hero">
      <div className="hero-container">

        {/* LEFT CONTENT */}
        <div className="hero-left" data-aos="fade-right">
          <div className="hero-card">
            <h1>
              India's Most Trusted <br />
              <span>Coaching Institute</span>
            </h1>

            <p>
              Preparing students for JEE & NEET with top faculties, structured
              courses, test-series & doubt support.
            </p>

            {/* Buttons */}
            <div className="hero-buttons">
              <button className="btn primary" onClick={() => navigate("/courses")}>
                Explore Courses →
              </button>
              <button className="btn outline" onClick={() => navigate("/admissions")}>
                Get Admission
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hero-right" data-aos="zoom-in">
          <img src={heroImg} alt="Students" className="hero-img" />
          
          {/* Student Count Badge */}
          <div className="student-count">
            <div className="count-number">100K+</div>
            <div className="count-text">Students Trust Us</div>
          </div>
        </div>

      </div>

      {/* Bottom wave */}
      <div className="hero-wave">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path
            className="wave-back"
            d="M-50,30 C200,70 400,10 650,45 C900,80 1100,20 1490,55 L1490,120 L-50,120 Z"
            fill="rgba(255, 255, 255, 0.15)"
          />
          <path
            className="wave-middle"
            d="M-50,60 C250,20 450,95 700,55 C950,15 1150,85 1490,45 L1490,120 L-50,120 Z"
            fill="rgba(255, 255, 255, 0.35)"
          />
          <path
            className="wave-front"
            d="M-50,90 C200,60 450,110 750,75 C1050,40 1250,95 1490,70 L1490,120 L-50,120 Z"
            fill="#f4f6fa"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;