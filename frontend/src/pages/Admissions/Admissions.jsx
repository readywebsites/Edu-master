import React, { useState, useEffect } from "react";
import "./Admissions.css";

import ProgramModal from "../../components/ProgramModal";
import SuccessPopup from "../../components/SuccessPopup";
import programsData from "../../data/programs.json";

const Admissions = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [popup, setPopup] = useState(false);
  const [modalData, setModalData] = useState({});
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const list = Object.keys(programsData).map((key) => ({
      key,
      ...programsData[key],
    }));
    setPrograms(list);
  }, []);

  const openModal = (key) => {
    setModalData(programsData[key]);
    setModalOpen(true);
  };

  const handleSubmit = () => setPopup(true);

  return (
    <div className="admission-page">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-left">
          <h1>
            Build Your Future
            <br />
            With <span>India&apos;s Leading Coaching</span>
          </h1>

          <p className="hero-sub">
            Expert Teachers • Smart Tests • Doubt Support
          </p>

          {/* ⭐ Rating Row – compact + professional */}
          <div className="hero-rating">
            <div className="hero-rating-stars">★★★★★</div>
            <span className="hero-rating-score">4.9/5 Rating</span>
            <span className="hero-rating-dot">•</span>
            <span>Trusted by 1200+ aspirants</span>
          </div>

          <div className="hero-buttons">
            <button className="btn-primary glow">Apply for Free Counselling</button>
            <button className="btn-outline">Download Prospectus</button>
          </div>
        </div>

        <div className="hero-form glass">
          <h3>Quick Apply</h3>

          <input type="text" placeholder="Full Name" />
          <input type="text" placeholder="Phone Number" />

          <select>
            <option>Select Program</option>
            {programs.map((p) => (
              <option key={p.key}>{p.title}</option>
            ))}
          </select>

          <button className="btn-primary full glow" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </section>

      {/* PROGRAMS DYNAMIC SECTION */}
      <section className="program-section">
        <h2>Programs We Offer</h2>

        <div className="program-grid">
          {programs.map((p) => (
            <div key={p.key} className="program-card fade-in">
              <h3>{p.title}</h3>
              <p>{p.subtitle}</p>
              <button className="btn-program" onClick={() => openModal(p.key)}>
                Explore →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* MODALS */}
      <ProgramModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        data={modalData}
      />
      <SuccessPopup show={popup} onClose={() => setPopup(false)} />
    </div>
  );
};

export default Admissions;
