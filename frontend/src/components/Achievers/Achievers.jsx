import React from "react";
import "./Achievers.css";

const Achievers = () => {
  const achievers = [
    { name: "Aman Sharma", rank: "AIR 27 (JEE Advanced)" },
    { name: "Rohit Verma", rank: "AIR 52 (NEET)" },
    { name: "Nikita Singh", rank: "AIR 103 (JEE Main)" },
  ];

  return (
    <section className="achievers-section">

      <h2 className="achievers-title">Our Toppers</h2>

      <div className="achievers-grid">
        {achievers.map((a, i) => (
          <div key={i} className="achiever-card">
            <div className="achiever-photo"></div>
            <h3>{a.name}</h3>
            <p>{a.rank}</p>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Achievers;
