import React from "react";
import "./Testimonials.css";

const Testimonials = () => {
  return (
    <section className="test-section">
      <h2 className="test-title">What Students Say</h2>

      <div className="test-container">

        <div className="test-card">
          <h4>Aman Sharma</h4>
          <p className="rank">AIR 27 (JEE Adv.)</p>
          <p className="review">"Best teachers and best test series!”</p>
        </div>

        <div className="test-card">
          <h4>Rohit Verma</h4>
          <p className="rank">AIR 52 (NEET)</p>
          <p className="review">"Structured preparation helped me crack NEET easily."</p>
        </div>

        <div className="test-card">
          <h4>Nikita Singh</h4>
          <p className="rank">AIR 103 (JEE Main)</p>
          <p className="review">"Regular practice boosted my confidence."</p>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
