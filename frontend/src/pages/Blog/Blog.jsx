import React from "react";
import "./Blog.css";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "How to Score 650+ in NEET 2025",
    desc: "A complete strategy guide for NEET aspirants — time management, subjects, mock tests and revision plans.",
    img: "https://i.postimg.cc/tgqfq2dY/b1.jpg",
    tag: "NEET",
    date: "Jan 2025",
    full: `NEET me 650+ score karna bilkul possible hai agar aap discipline se yeh strategy follow karo...
    
    • Biology NCERT — 100%  
    • Physics — PYQs + Mock Tests  
    • Chemistry — Notes + Reactions Revision  
    • Time Management  
    • Weekly Mock Tests`
  },
  {
    id: 2,
    title: "Crack JEE Advanced: Daily Study Routine",
    desc: "Toppers’ daily study habits and how you can follow them.",
    img: "https://i.postimg.cc/fWjh5RLm/b2.jpg",
    tag: "JEE",
    date: "Feb 2025",
    full: `JEE Advanced crack karne ka secret toppers ke daily routine me hota hai...

    • 2 hrs Physics  
    • 2 hrs Maths  
    • 2 hrs Chemistry  
    • 3 hrs PYQs & Mock Tests  
    • Error Book Maintain Karo`
  },
  {
    id: 3,
    title: "Best Reference Books for Class 11 & 12",
    desc: "A curated list of Physics, Chemistry, Maths & Biology books recommended by toppers.",
    img: "https://i.postimg.cc/RVv6XqJ4/b3.jpg",
    tag: "Books",
    date: "Mar 2025",
    full: `Best books for JEE + NEET + Boards:

    Physics: HCV, DC Pandey  
    Chemistry: OP Tandon, RC Mukherjee  
    Maths: RD Sharma, Cengage  
    Biology: NCERT, MTG Fingertips`
  },
  // Full list continue...
];

const Blog = () => {
  return (
    <div className="blog-page">

      {/* HERO SECTION */}
      <section className="blog-hero">
        <h1>EduMaster Blog</h1>
        <p>Your daily dose of exam tips, study hacks, guides & motivation.</p>
      </section>

      {/* BLOG GRID */}
      <section className="blog-grid">
        {blogPosts.map((post) => (
          <div className="blog-card" key={post.id}>
            <img src={post.img} alt={post.title} className="blog-img" />

            <div className="blog-content">
              <div className="blog-meta">
                <span className="tag">{post.tag}</span>
                <span className="date">{post.date}</span>
              </div>

              <h3 className="blog-title">{post.title}</h3>
              <p className="blog-desc">{post.desc}</p>

              <Link
                to={`/blog/${post.id}`}
                state={post}
              >
                <button className="read-btn">Read More →</button>
              </Link>

            </div>
          </div>
        ))}
      </section>

    </div>
  );
};

export default Blog;
