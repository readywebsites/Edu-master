import React from "react";

const CategoryCard = ({ title, tags, theme, icon, onClick }) => {
  return (
    <div className="category-card">

      {/* LEFT */}
      <div className="category-left">
        <h2>{title}</h2>

        <div className="category-tags">
          {tags.map((tag, index) => (
            <span className="category-tag" key={index}>
              {tag}
            </span>
          ))}
        </div>

        <button className="category-btn" onClick={onClick}>
          Explore Category →
        </button>
      </div>

      {/* RIGHT ICON */}
      <div className="category-right">
        <div className={`category-bg ${theme}-bg`}>
          {icon}
        </div>
      </div>

    </div>
  );
};

export default CategoryCard;
