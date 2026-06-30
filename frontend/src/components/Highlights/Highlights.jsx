import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Highlights.css";
import facultyImg from "../../assets/faculty_highlight.png";
import testSeriesImg from "../../assets/test_series_highlight.png";
import studyMaterialImg from "../../assets/study_material_highlight.png";

const highlightsData = [
  {
    id: 0,
    num: "01",
    tag: "ACADEMIC LEADERSHIP",
    title: "Expert Faculty",
    description: "Learn from the finest minds in India. Our highly qualified mentors bring years of experience in coaching students for JEE & NEET, using structured methodologies, personalized attention, and proven shortcuts to ensure concept clarity and exam success.",
    image: facultyImg,
    path: "/faculty",
    btnText: "Meet Our Faculty Profiles",
  },
  {
    id: 1,
    num: "02",
    tag: "ADAPTIVE LEARNING",
    title: "Smart Test Series",
    description: "Measure your progress with precision. Our smart test platform provides adaptive mock tests modeled after the latest JEE & NEET patterns, accompanied by instant detailed performance analytics, weak-area identification, and national rank prediction.",
    image: testSeriesImg,
    path: "/resources/tests",
    btnText: "Start Free Practice Test",
  },
  {
    id: 2,
    num: "03",
    tag: "PREMIUM RESOURCES",
    title: "Quality Study Material",
    description: "Accelerate your preparation with curated resources. Access comprehensive, well-researched study modules, quick-revision notes, mind maps, and chapter-wise question banks designed by top subject matter experts to optimize your self-study hours.",
    image: studyMaterialImg,
    path: "/resources/notes",
    btnText: "Explore Study Guides",
  }
];

const Highlights = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [frontData, setFrontData] = useState(highlightsData[0]);
  const [backData, setBackData] = useState(highlightsData[1]);
  const [progress, setProgress] = useState(0);
  
  const progressIntervalRef = useRef(null);
  const SLIDE_DURATION = 6000; // 6 seconds per slide

  const transitionTo = (nextIndex) => {
    if (nextIndex === activeIndex || isAnimating) return;

    setIsAnimating(true);
    const nextData = highlightsData[nextIndex];
    if (flipped) {
      // Currently Back face is visible, flip to Front face
      setFrontData(nextData);
      setFlipped(false);
    } else {
      // Currently Front face is visible, flip to Back face
      setBackData(nextData);
      setFlipped(true);
    }
    setActiveIndex(nextIndex);
    setProgress(0);

    setTimeout(() => {
      setIsAnimating(false);
    }, 850); // Matches the 0.85s transition duration
  };

  const startTimer = () => {
    clearInterval(progressIntervalRef.current);
    const startTime = Date.now();
    
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const percentage = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(percentage);
      
      if (elapsed >= SLIDE_DURATION) {
        const nextIndex = (activeIndex + 1) % highlightsData.length;
        transitionTo(nextIndex);
      }
    }, 30);
  };

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(progressIntervalRef.current);
    };
  }, [activeIndex, flipped, isAnimating]);

  const handleTabClick = (index) => {
    transitionTo(index);
  };

  return (
    <section className="highlights">
      <div className="highlights-container">
        
        {/* SECTION HEADER */}
        <div className="highlights-header" data-aos="fade-up">
          <span className="highlights-subtitle">Why Choose Us?</span>
          <h2>Milestones of Academic Growth</h2>
          <p>We provide a comprehensive, result-oriented ecosystem designed to unlock your true potential.</p>
        </div>

        {/* TWO PANEL GRID (Windows Live Tiles Style) */}
        <div className="highlights-panels">
          
          {/* LEFT PANEL: WINDOWS TILE IMAGE (Y-axis Flip) */}
          <div className="highlights-left" data-aos="fade-right">
            <div className={`tile-viewport tile-image-viewport ${flipped ? "flipped" : ""} ${isAnimating ? "is-animating" : ""}`}>
              <div className="tile-inner">
                
                {/* Front Image Face */}
                <div className="tile-face tile-front">
                  <img src={frontData.image} alt={frontData.title} className="highlight-img" />
                  <div className="image-overlay"></div>
                  <div className="decor-accent decor-tl"></div>
                  <div className="decor-accent decor-br"></div>
                </div>

                {/* Back Image Face */}
                <div className="tile-face tile-back">
                  <img src={backData.image} alt={backData.title} className="highlight-img" />
                  <div className="image-overlay"></div>
                  <div className="decor-accent decor-tl"></div>
                  <div className="decor-accent decor-br"></div>
                </div>

              </div>
            </div>
          </div>

          {/* RIGHT PANEL: WINDOWS TILE TEXT (X-axis Flip) */}
          <div className="highlights-right" data-aos="fade-left">
            <div className={`tile-viewport tile-text-viewport ${flipped ? "flipped" : ""} ${isAnimating ? "is-animating" : ""}`}>
              <div className="tile-inner">
                
                {/* Front Text Face */}
                <div className={`tile-face tile-front face-text face-${frontData.id}`}>
                  <span className="text-num-watermark">{frontData.num}</span>
                  <span className="text-tag">{frontData.tag}</span>
                  <h3>{frontData.title}</h3>
                  <p className="text-description">{frontData.description}</p>
                  <button 
                    className="highlight-cta-btn" 
                    onClick={() => navigate(frontData.path)}
                  >
                    {frontData.btnText} <span className="arrow">→</span>
                  </button>
                </div>

                {/* Back Text Face */}
                <div className={`tile-face tile-back face-text face-${backData.id}`}>
                  <span className="text-num-watermark">{backData.num}</span>
                  <span className="text-tag">{backData.tag}</span>
                  <h3>{backData.title}</h3>
                  <p className="text-description">{backData.description}</p>
                  <button 
                    className="highlight-cta-btn" 
                    onClick={() => navigate(backData.path)}
                  >
                    {backData.btnText} <span className="arrow">→</span>
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* CENTERED NAVIGATION TABS WITH PROGRESS BARS */}
        <div className="highlights-nav-tabs" data-aos="fade-up">
          {highlightsData.map((item, index) => (
            <button 
              key={item.id} 
              className={`nav-tab-btn ${activeIndex === index ? "active" : ""}`}
              onClick={() => handleTabClick(index)}
            >
              <span className="tab-num">{item.num}</span>
              <span className="tab-title">{item.title}</span>
              <div className="tab-progress-bg">
                <div 
                  className="tab-progress-fill" 
                  style={{ width: activeIndex === index ? `${progress}%` : "0%" }}
                />
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Highlights;
