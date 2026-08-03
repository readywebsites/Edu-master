import React, { useState, useEffect } from "react";
import "./Courses.css";
import { useNavigate, useLocation } from "react-router-dom";
import { getCourses } from "../../services/api"; // Import the API function
import Masonry from "../Masonry/Masonry";

// Images
import biologyCover from "../../assets/biology_cover.png";
import chemistryCover from "../../assets/chemistry_cover.png";
import mathCover from "../../assets/math_cover.png";
import commerceCover from "../../assets/commerce_cover.png";

// Fallback high-quality course list representing 12th Science and 12th Commerce CBSE
const mockCourses = [
  {
    id: 1,
    title: "Class 12th Physics Masterclass",
    subtitle: "Electrostatics, Optics, and Modern Physics lectures with quick revision formula sheets.",
    category: "science",
    icon: "FaAtom",
    slug: "class-12-physics-masterclass"
  },
  {
    id: 2,
    title: "Class 12th Chemistry Advanced",
    subtitle: "Comprehensive organic reaction pathways, thermodynamics, and coordination compounds.",
    category: "science",
    icon: "FaFlask",
    slug: "class-12-chemistry-advanced"
  },
  {
    id: 3,
    title: "Class 12th Biology Explorers",
    subtitle: "Detailed guides for Genetics, Ecology, and Human Reproduction with diagrams.",
    category: "science",
    icon: "FaDna",
    slug: "class-12-biology-explorers"
  },
  {
    id: 4,
    title: "Class 12th Accountancy Ledger",
    subtitle: "Step-by-step ledger balance calculations for Partnership Accounts and Cash Flow analysis.",
    category: "commerce",
    icon: "FaCalculator",
    slug: "class-12-accountancy-ledger"
  },
  {
    id: 5,
    title: "Class 12th Business Studies",
    subtitle: "Master Principles of Management, Marketing, and Financial Markets with real case studies.",
    category: "commerce",
    icon: "FaBriefcase",
    slug: "class-12-business-studies"
  },
  {
    id: 6,
    title: "Class 12th Economics Analytics",
    subtitle: "In-depth breakdown of Macroeconomics and Indian Economic Development with schedules.",
    category: "commerce",
    icon: "FaChartLine",
    slug: "class-12-economics-analytics"
  }
];

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
        if (response && response.data && response.data.length > 0) {
          setCourses(response.data);
        } else {
          setCourses(mockCourses);
        }
      } catch (error) {
        console.warn("Backend API offline, using fallback static course catalog:", error);
        setCourses(mockCourses);
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

  // Shape courses array into masonry catalog format
  const masonryItems = displayedCourses.map((course) => {
    let coverImg = biologyCover;
    let height = 400; // default baseline

    if (course.category === "science") {
      if (course.slug.includes("physics")) {
        coverImg = mathCover; // quantum physics banner
        height = 410;
      } else if (course.slug.includes("chemistry")) {
        coverImg = chemistryCover;
        height = 380;
      } else {
        coverImg = biologyCover;
        height = 440;
      }
    } else {
      if (course.slug.includes("accountancy")) {
        coverImg = commerceCover;
        height = 455; // tall accounting card
      } else if (course.slug.includes("business")) {
        coverImg = chemistryCover;
        height = 370; // short card
      } else {
        coverImg = commerceCover;
        height = 405; // medium card
      }
    }

    return {
      id: course.id.toString(),
      img: coverImg,
      url: `/courses/${course.slug}`,
      height: height,
      title: course.title,
      subtitle: course.subtitle,
      category: course.category,
      icon: course.icon
    };
  });

  return (
    <section className="courses-section">
      <div className="courses-container">

        {/* SECTION HEADER */}
        <div className="courses-header" data-aos="fade-up">
          <span className="courses-subtitle">Academic Portfolios</span>
          <h2>Explore Our Structured Course Catalog</h2>
          <p>Choose your pathway to academic excellence. Select a domain below to filter programs.</p>
        </div>

        {/* FILTER SECTION */}
        <div className="course-filter-box">
          <div className="filter-buttons">
            <button className={`filter-btn ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button className={`filter-btn ${filter === "science" ? "active" : ""}`}
              onClick={() => setFilter("science")}
            >
              Science Courses
            </button>
            <button className={`filter-btn ${filter === "commerce" ? "active" : ""}`}
              onClick={() => setFilter("commerce")}
            >
              Commerce Courses
            </button>
          </div>
        </div>

        {loading ? (
          <div className="courses-loader-wrapper">
            <div className="courses-spinner"></div>
          </div>
        ) : displayedCourses.length > 0 ? (
          <div className="course-grid-masonry fade-in" key={`grid-${filter}`}>
            <Masonry 
              items={masonryItems} 
              animateFrom="bottom" 
              blurToFocus={true} 
              stagger={0.08}
              ease="power3.out"
            />
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
