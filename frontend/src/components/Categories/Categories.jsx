import React from "react";
import "./Categories.css";
import CategoryCard from "./CategoryCard";
import { useNavigate } from "react-router-dom";

import { FaDna, FaAtom } from "react-icons/fa";

export const categoryData = [
  {
    id: "neet",
    title: "NEET",
    tags: ["class 11", "class 12", "Dropper"],
    theme: "neet",
    icon: <FaDna size={60} color="#cc2d5a" />,
    path: "/courses?filter=neet" // You can intercept this query param in your Courses component later
  },
  {
    id: "jee",
    title: "IIT JEE",
    tags: ["class 11", "class 12", "Dropper"],
    theme: "jee",
    icon: <FaAtom size={60} color="#ff7a00" />,
    path: "/courses?filter=jee"
  }
];

const Categories = ({ onCategorySelect, currentFilter }) => {
  const navigate = useNavigate();

  const displayCategories = currentFilter && currentFilter !== "all"
    ? categoryData.filter((cat) => cat.id === currentFilter)
    : categoryData;

  return (
    <div className="categories-container">
        {displayCategories.map((cat) => (
          <CategoryCard
            key={cat.id}
            title={cat.title}
            tags={cat.tags}
            theme={cat.theme}
            icon={cat.icon}
            onClick={() => {
              if (onCategorySelect) {
                onCategorySelect(cat.id);
              } else {
                navigate(cat.path);
              }
            }}
          />
        ))}
    </div>
  );
};

export default Categories;
