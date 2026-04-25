import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { getCourse } from "../../services/api"; // You will need to create this in your api.js
import "./CourseDetails.css";

const CourseDetails = () => {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        setLoading(true);
        const response = await getCourse(slug);
        setCourse(response.data);
      } catch (error) {
        console.error("Error fetching course details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseDetail();
  }, [slug]);

  if (loading) return <h2 style={{ textAlign: "center", padding: "50px" }}>Loading course details...</h2>;
  if (!course) return <h2 className="not-found">Course not found</h2>;

  return (
    <div className="course-detail-page">

      {/* HEADER */}
      <div className="detail-hero" style={{ background: course.gradient }}>
        <h1>{course.title}</h1>
        <p>{course.subtitle}</p>
      </div>

      {/* FEATURES */}
      <section className="detail-section">
        <h2>Why Choose This Course?</h2>

        <div className="feature-grid">
          {course.features?.map((f, i) => (
            <div className="feature-box" key={i}>
              <FaCheckCircle className="icon" />
              <p>{f}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SYLLABUS */}
      <section className="detail-section">
        <h2>Syllabus Overview</h2>

        <div className="syllabus-list">
          {course.syllabus?.map((mod, i) => (
            <div className="syllabus-box" key={i}>
              <h3>{mod.module}</h3>
              <ul>
                {mod.topics?.map((t, j) => (
                  <li key={j}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default CourseDetails;
