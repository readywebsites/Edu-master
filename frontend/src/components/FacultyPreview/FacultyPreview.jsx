import React from "react";
import "./FacultyPreview.css";

const sample = [
  { name: "Dr. Anuj Sharma", role: "Physics", img: "https://i.postimg.cc/Zq0bPmMx/fac1.jpg" },
  { name: "Neha Verma", role: "Chemistry", img: "https://i.postimg.cc/jSPT0k3D/fac2.jpg" },
  { name: "Rohit Malhotra", role: "Mathematics", img: "https://i.postimg.cc/FsD2qgdy/fac3.jpg" },
];

const FacultyPreview = () => (
  <section className="faculty-preview">
    <h3>Featured Faculty</h3>
    <div className="fp-grid">
      {sample.map((f, i) => (
        <div key={i} className="fp-card">
          <img src={f.img} alt={f.name} />
          <h4>{f.name}</h4>
          <p>{f.role}</p>
        </div>
      ))}
    </div>
  </section>
);

export default FacultyPreview;
