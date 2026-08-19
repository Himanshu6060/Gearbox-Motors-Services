import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ServicesOverview from "./ServicesOverview.jsx";


const images = [
  "/images/heating-element.jpg",
  "/images/cartridge-heater.jpg",
  "/images/tubular-heater.jpg",
  "/images/immersion-heater.jpg",
];

const AboutIntro = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleKnowMore = () => {
    navigate("/about");
  };

  return (
    <>
      <section className="about-intro">
        <div className="about-intro-container">

          {/* LEFT CONTENT */}
          <div className="about-intro-content">

            <div className="about-intro-label">
              WHO WE ARE
            </div>

            <h1>
              More Than Suppliers.
              <br />
              We Are Your
              <br />
              Engineering Backbone.
            </h1>

            {/* <p>
            Industrial Sales & Service delivers complete engineering
            solutions in <strong>industrial heating, domestic heating,
            insulation, refractory and temperature control.</strong>{" "}
            With over <strong>30+ years of industry expertise</strong>,
            we support OEMs, manufacturers, PSUs and engineering
            companies with end-to-end technical solutions.
          </p> */}
            <p>
              Industrial Sales & Service provides complete <strong> gearbox and motor solutions for industrial applications. </strong> With a strong focus on <strong> quality, performance, and reliability, </strong> we support OEMs, manufacturers, and industries across India with the right products and technical solutions for their power transmission requirements.
            </p>

            <button
              className="about-intro-btn"
              onClick={handleKnowMore}
            >
              KNOW MORE
            </button>

          </div>


          {/* RIGHT IMAGE */}
          <div className="about-intro-image-wrapper">

            <img
              key={images[currentImage]}
              src={images[currentImage]}
              alt="Industrial Heating Product"
              className="about-intro-image"
            />

          </div>

        </div>
      </section>
      <ServicesOverview />
    </>
  );
};

export default AboutIntro;