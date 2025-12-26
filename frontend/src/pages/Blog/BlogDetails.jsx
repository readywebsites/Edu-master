import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./BlogDetails.css";

const BlogDetails = () => {
  const { state } = useLocation();  // id removed to avoid eslint warning

  // If state not found (user opened URL directly)
  if (!state) {
    return (
      <div className="blog-details-page">
        <h1>Blog Not Found</h1>
        <Link to="/blog">
          <button className="back-btn">← Back to Blog</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="blog-details-page">

      <img src={state.img} alt={state.title} className="details-img" />

      <div className="details-content">

        <span className="details-tag">{state.tag}</span>
        <span className="details-date">{state.date}</span>

        <h1>{state.title}</h1>

        {/* FULL CONTENT */}
        <p className="details-full">{state.full}</p>

        <Link to="/blog">
          <button className="back-btn">← Back to Blog</button>
        </Link>

      </div>
    </div>
  );
};

export default BlogDetails;
