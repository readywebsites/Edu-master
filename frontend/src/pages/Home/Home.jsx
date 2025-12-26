import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AOS from "aos";
import "aos/dist/aos.css";

import Hero from "../../components/Hero/Hero";
import Categories from "../../components/Categories/Categories";
import Courses from "../../components/Courses/Courses";
import Stats from "../../components/Stats/Stats";
import Highlights from "../../components/Highlights/Highlights";
import Testimonials from "../../components/Testimonials/Testimonials";
import Newsletter from "../../components/Newsletter/Newsletter";
import Footer from "../../components/Footer/Footer";

import "./Home.css";

const Home = () => {
  const { user } = useAuth();

  useEffect(() => {
    AOS.init({
      duration: 900,
      delay: 100,
      once: true,
      easing: "ease-out",
    });
  }, []);

  // Redirect Teachers to Dashboard
  if (user && user.user_type === 'teacher') {
    return <Navigate to="/dashboard/teacher" replace />;
  }

  return (
    <>
      <Hero />

      <div className="page-container">

        <div data-aos="fade-up">
          <Stats />
        </div>

        <div data-aos="fade-up">
          <Highlights />
        </div>

        <div data-aos="fade-up">
          <Categories />
        </div>

        <div data-aos="fade-up">
          <Courses />
        </div>

        <div data-aos="fade-up">
          <Testimonials />
        </div>

        <div data-aos="fade-up">
          <Newsletter />
        </div>

      </div>

      <Footer />
    </>
  );
};

export default Home;
