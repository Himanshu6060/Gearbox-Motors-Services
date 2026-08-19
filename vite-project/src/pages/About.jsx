import React from "react";
import { useNavigate } from "react-router-dom";
import AboutDetails from "../Component/AboutDetails";
const About = () => {

  const navigate = useNavigate();

  return (
    <>
    <section className="about-section">

      {/* Heading */}
      <div className="about-container">

        <div className="about-heading">
          <h1>About Us</h1>
          <p>Reliable • Trusted • Industrial Solutions</p>
        </div>

        {/* About Content */}
        <div className="about-content">

          {/* Left Image */}
          <div className="about-image">
            <img
              src="https://i-s-s.vercel.app/static/media/about-industrial.a1dbd388bea27293e994.jpg"
              alt="Industrial Sales"
            />
          </div>

          {/* Right Content */}
          <div className="about-text">

            <h2>Industrial Sales</h2>

            <p>
              Industrial Sales is a leading distributor of industrial
              equipment, power transmission products, motors, gearboxes,
              and engineering solutions. Our team provides reliable
              service, quality assurance, and long-term support for
              industries in various sectors.
            </p>

            <p>
              We deliver tailored solutions through trusted manufacturers,
              backed by strong customer relationships and efficient
              service support.
            </p>

            <button
              className="about-btn"
              onClick={() => navigate("/about/details")}
            >
              Learn More
            </button>

          </div>

        </div>

      </div>

    </section>
    </>
  );
};

export default About;