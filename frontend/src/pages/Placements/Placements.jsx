import React from "react";
import "./Placements.css";

const topAchievers = [
  {
    name: "Aman Gupta",
    exam: "JEE Advanced AIR 112",
    year: "2024",
    img: "https://i.postimg.cc/NFRJ1Jxz/t1.jpg",
  },
  {
    name: "Riya Sharma",
    exam: "NEET AIR 78",
    year: "2024",
    img: "https://i.postimg.cc/SRG0V6Th/t2.jpg",
  },
  {
    name: "Manish Verma",
    exam: "JEE Main Percentile 99.82",
    year: "2023",
    img: "https://i.postimg.cc/QCTVq8h6/t3.jpg",
  },
  {
    name: "Pooja Singh",
    exam: "NEET Score 690/720",
    year: "2023",
    img: "https://i.postimg.cc/8ztnGp6S/t4.jpg",
  },
];

const dataStats = [
  { number: "1200+", sub: "Selections in JEE", icon: "📈" },
  { number: "950+", sub: "Selections in NEET", icon: "🩺" },
  { number: "300+", sub: "Top Ranks (AIR)", icon: "🥇" },
  { number: "10,000+", sub: "Happy Students", icon: "🎓" },
];

const Placements = () => {
  return (
    <div className="placement-page">
      <div className="placement-inner">
        {/* HERO */}
        <section className="placement-hero">
          <h1>
            Our <span>Results & Achievements</span>
          </h1>
          <p>
            Year after year, our students secure top ranks in JEE & NEET
            nationwide.
          </p>
        </section>

        {/* STATS GRID */}
        <section className="stats-section">
          <div className="stats-grid">
            {dataStats.map((d, i) => (
              <div className="stat-card" key={i}>
                <div className="stat-icon">{d.icon}</div>
                <h2>{d.number}</h2>
                <p className="stat-sub">{d.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TOP ACHIEVERS */}
        <section className="achievers-section">
          <h2>Our Top Achievers</h2>

          <div className="achievers-grid">
            {topAchievers.map((s, i) => (
              <div className="achiever-card" key={i}>
                <img src={s.img} alt={s.name} className="achiever-img" />
                <h3 className="achiever-name">{s.name}</h3>
                <p className="exam">{s.exam}</p>
                <p className="year">{s.year}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <h2>Become the Next Top Ranker</h2>
          <p>Join our expert-guided courses and achieve your dream rank.</p>
          <button className="join-btn">Join Now →</button>
        </section>
      </div>
    </div>
  );
};

export default Placements;
