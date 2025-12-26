import React from "react";
import "./Categories.css";

import { FaDna, FaAtom } from "react-icons/fa";

const Categories = () => {
  return (
    <div className="categories-wrapper">
      <div className="categories-container">

        {/* NEET CATEGORY */}
        <div className="category-card">
          <div className="category-left">
            <h2>NEET</h2>

            <div className="category-tags">
              <span className="category-tag">class 11</span>
              <span className="category-tag">class 12</span>
              <span className="category-tag">Dropper</span>
            </div>

            <button className="category-btn">Explore Category →</button>
          </div>

          <div className="category-right">
            <div className="category-bg neet-bg">
              <FaDna size={60} color="#cc2d5a" />
            </div>
          </div>
        </div>

        {/* JEE CATEGORY */}
        <div className="category-card">
          <div className="category-left">
            <h2>IIT JEE</h2>

            <div className="category-tags">
              <span className="category-tag">class 11</span>
              <span className="category-tag">class 12</span>
              <span className="category-tag">Dropper</span>
            </div>

            <button className="category-btn">Explore Category →</button>
          </div>

          <div className="category-right">
            <div className="category-bg jee-bg">
              <FaAtom size={60} color="#ff7a00" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Categories;
