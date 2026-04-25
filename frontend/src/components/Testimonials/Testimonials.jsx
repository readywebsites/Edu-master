import React from "react";
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
// Import Slider and its CSS for carousel functionality
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Testimonials.css";

const testimonialsData = [
  {
    id: 1,
    name: "Aman Sharma",
    rank: "AIR 27 (JEE Adv.)",
    review: "The faculty here is incredibly supportive. The structured test series and detailed analysis helped me identify my weak points and improve them efficiently.",
    avatar: "https://ui-avatars.com/api/?name=Aman+Sharma&background=0D8ABC&color=fff&size=128",
    rating: 5,
  },
  {
    id: 2,
    name: "Rohit Verma",
    rank: "AIR 52 (NEET)",
    review: "Structured preparation and top-notch study materials helped me crack NEET easily. The mentors were always available for doubt-solving.",
    avatar: "https://ui-avatars.com/api/?name=Rohit+Verma&background=FFB600&color=fff&size=128",
    rating: 5,
  },
  {
    id: 3,
    name: "Nikita Singh",
    rank: "AIR 103 (JEE Main)",
    review: "Regular practice tests and mock exams boosted my confidence. I couldn't have achieved this rank without their comprehensive curriculum.",
    avatar: "https://ui-avatars.com/api/?name=Nikita+Singh&background=10B981&color=fff&size=128",
    rating: 5,
  },
  {
    id: 4,
    name: "Priya Desai",
    rank: "AIR 89 (NEET)",
    review: "The mentors helped me stay focused and consistent. The daily practice problems and doubt-clearing sessions were a game-changer.",
    avatar: "https://ui-avatars.com/api/?name=Priya+Desai&background=E11D48&color=fff&size=128",
    rating: 5,
  },
  {
    id: 5,
    name: "Kabir Khan",
    rank: "AIR 14 (JEE Adv.)",
    review: "An amazing environment for competitive exams. The study material is exhaustive, and the faculty's teaching methodology is brilliant.",
    avatar: "https://ui-avatars.com/api/?name=Kabir+Khan&background=8B5CF6&color=fff&size=128",
    rating: 5,
  }
];

// Custom Arrow Components for React-Slick
const NextArrow = ({ onClick }) => {
  return (
    <div className="custom-arrow custom-next" onClick={onClick}>
      <FaChevronRight />
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div className="custom-arrow custom-prev" onClick={onClick}>
      <FaChevronLeft />
    </div>
  );
};

const Testimonials = () => {
  // Configuration settings for the react-slick carousel
  const sliderSettings = {
    dots: true,               // Show dot indicators at the bottom
    infinite: true,           // Loop the testimonials
    speed: 500,               // Transition speed in ms
    slidesToShow: 3,          // Number of slides to show at once
    slidesToScroll: 1,        // Number of slides to scroll at once
    autoplay: true,
    nextArrow: <NextArrow />, // Custom right arrow
    prevArrow: <PrevArrow />, // Custom left arrow
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-header">
        <h2>Success Stories</h2>
        <p>Hear from our top achievers who made their academic dreams a reality</p>
      </div>

      {/* Increased negative margin to offset increased padding inside the cards wrapper */}
      <div className="testimonials-slider-container" style={{ margin: "0 -15px" }}>
        <Slider {...sliderSettings}>
        {testimonialsData.map((testimonial) => (
          <div key={testimonial.id} style={{ padding: "15px" }}>
            <div className="testimonial-card">
            <FaQuoteLeft className="quote-icon" />
            <p className="review-text">"{testimonial.review}"</p>
            
            <div className="rating-stars">
              {[...Array(testimonial.rating)].map((_, index) => (
                <FaStar key={index} className="star-icon" />
              ))}
            </div>

            <div className="student-profile">
              <img src={testimonial.avatar} alt={testimonial.name} className="student-avatar" />
              <div className="student-info">
                <h4 className="student-name">{testimonial.name}</h4>
                <p className="student-rank">{testimonial.rank}</p>
              </div>
            </div>
            </div>
          </div>
        ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;
