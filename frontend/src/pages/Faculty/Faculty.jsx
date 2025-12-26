    import React from "react";
import "./Faculty.css";

const facultyData = [
  {
    name: "Dr. Anuj Sharma",
    role: "Senior Physics Faculty",
    exp: "12+ Years Experience",
    img: "https://i.postimg.cc/Zq0bPmMx/fac1.jpg",
  },
  {
    name: "Neha Verma",
    role: "Chemistry Faculty",
    exp: "10+ Years Experience",
    img: "https://i.postimg.cc/jSPT0k3D/fac2.jpg",
  },
  {
    name: "Rohit Malhotra",
    role: "Mathematics Faculty",
    exp: "9+ Years Experience",
    img: "https://i.postimg.cc/FsD2qgdy/fac3.jpg",
  },
  {
    name: "Simran Ahuja",
    role: "Biology Faculty",
    exp: "11+ Years Experience",
    img: "https://i.postimg.cc/rFqTqRJ7/fac4.jpg",
  },
];

const Faculty = () => {
  return (
    <div className="faculty-page">

      {/* HEADER SECTION */}
      <div className="faculty-header">
        <div>
          <h1 className="faculty-title">
            Meet Our <span>Expert Faculty</span>
          </h1>
          <p className="faculty-subtitle">
            Top educators with years of teaching experience guiding students to
            success in JEE & NEET.
          </p>
        </div>
      </div>

      {/* FACULTY GRID */}
      <div className="faculty-grid">
        {facultyData.map((f, index) => (
          <div className="faculty-card" key={index}>
            <img src={f.img} alt={f.name} className="faculty-img" />
            <h3 className="faculty-name">{f.name}</h3>
            <p className="faculty-role">{f.role}</p>
            <p className="faculty-exp">{f.exp}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Faculty;
