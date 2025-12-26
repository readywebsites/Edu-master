import React from "react";
import "./BlogCard.css";

const BlogCard = ({ title, date, text }) => {
  return (
    <div className="blog-card">
      <h3>{title}</h3>
      <span className="date">{date}</span>
      <p>{text}</p>
      <button className="read-btn">Read More</button>
    </div>
  );
};

export default BlogCard;
