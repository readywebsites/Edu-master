import React from "react";
import "./CourseCard.css";

const CourseCard = ({ theme, icon, title, subtitle }) => {
  return (
    <div className="course-card">

      <div className="card-left">
        <h3 className="course-title">{title}</h3>
        <p className="course-sub">{subtitle}</p>

        <button className={`course-btn ${theme}`}>
          Explore →
        </button>
      </div>

      <div className="card-right">
        <div className={`icon-circle ${theme}`}>
          {icon}
        </div>
      </div>

    </div>
  );
};

export default CourseCard;
