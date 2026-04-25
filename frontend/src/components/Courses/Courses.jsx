import React, { useState, useEffect } from "react";
import CourseCard from "../CourseCard/CourseCard";
import "./Courses.css";
import { useNavigate, useLocation } from "react-router-dom";
import { getCourses } from "../../services/api"; // Import the API function
import Categories, { categoryData } from "../Categories/Categories";

// Icons
import {
  FaAtom,
  FaCalculator,
  FaCogs,
  FaDraftingCompass,
  FaHeartbeat,
  FaFlask,
  FaDna
} from "react-icons/fa";

const iconMap = {
  FaAtom: <FaAtom />,
  FaCalculator: <FaCalculator />,
  FaCogs: <FaCogs />,
  FaDraftingCompass: <FaDraftingCompass />,
  FaHeartbeat: <FaHeartbeat />,
  FaFlask: <FaFlask />,
  FaDna: <FaDna />
};

const Courses = () => {
  const [filter, setFilter] = useState("all");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await getCourses();
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses =
    filter === "all"
      ? courses
      : courses.filter((course) => course.category === filter);

  const displayedCourses = location.pathname === "/courses"
    ? filteredCourses
    : filteredCourses.slice(0, 6);

  return (
    <section className="courses-section">
      <div className="courses-container">

        {/* FILTER SECTION */}
        <div className="course-filter-box">

          <div className="filter-buttons">
            <button className={`filter-btn ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            {categoryData.map((cat) => (
              <button key={cat.id} className={`filter-btn ${filter === cat.id ? "active" : ""}`}
                onClick={() => setFilter(cat.id)}
              >
                {cat.title} Courses
              </button>
            ))}
          </div>

          <div className="fade-in" key={`cat-${filter}`}>
            <Categories onCategorySelect={setFilter} currentFilter={filter} />
          </div>
        </div>

        {loading ? (
          <div className="courses-loader-wrapper">
            <div className="courses-spinner"></div>
          </div>
        ) : displayedCourses.length > 0 ? (
          <div className="course-grid fade-in" key={`grid-${filter}`}>
            {displayedCourses.map((course) => (
              <div
                key={course.id}
                onClick={() => navigate(`/courses/${course.slug}`)}
                style={{ cursor: "pointer" }}
              >
                <CourseCard
                  theme={course.category}
                  icon={iconMap[course.icon]}
                  title={course.title}
                  subtitle={course.subtitle}
                />
              </div>
            ))}
          </div>
        ) : null}

        {location.pathname !== "/courses" && (
          <div className="view-more-wrapper">
            <button className="view-more-btn" onClick={() => navigate("/courses")}>
              View More
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default Courses;
