import React from "react";
import "./Newsletter.css";

const Newsletter = () => {
  return (
    <section className="news-section">
      <div className="news-box">
        <h3>Join our Newsletter</h3>
        <p>Get batch updates and free resources.</p>

        <div className="news-form">
          <input placeholder="Enter email" />
          <button>Subscribe</button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
