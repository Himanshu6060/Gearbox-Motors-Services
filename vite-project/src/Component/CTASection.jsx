import React from "react";
import { useNavigate } from "react-router-dom";
import {useInquiry} from "../Context/InquiryContext.jsx";

const CTASection = () => {
  const navigate = useNavigate();
  const {openInquiry} = useInquiry();

  const handleContact = () => {
    navigate("/contact");
  };

  const handleInquiry = () => {
    navigate("/inquiry");
  };

  return (
    <section className="cta-section">
      <div className="cta-overlay"></div>

      <div className="cta-container">
        <div className="cta-content">

          <div className="cta-label">
            INDUSTRIAL SALES & SERVICES
          </div>

          <h2>
            Partner with India’s Most
            <br />
            Trusted Industrial
            <br />
            Supplier.
          </h2>

          <div className="cta-buttons">

            <button
              className="cta-btn"
              onClick={handleContact}
            >
              GET IN TOUCH
            </button>

            <button
              className="cta-btn"
              onClick={()=> openInquiry()}
            >
              REQUEST PRODUCT CATALOGUE
            </button>

          </div>

        </div>
      </div>
    </section>
  );
};

export default CTASection;