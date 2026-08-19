import React from "react";
import { useNavigate } from "react-router-dom";
import CTASection from "./CTASection";


const CompanyInfo = () => {
  const navigate = useNavigate();

  const handleContact = () => {
    navigate("/contact");
  };

  return (
    <>
    <section className="company-info">
      <div className="company-info-container">

        {/* LEFT SIDE */}
        <div className="company-info-logos">

          {/* <div className="company-logo">
            <img
              src="/images/mgm-logo.png"
              alt="MGM Motori Elettrici"
            />
          </div> */}

          <div className="company-logo">
            <img
              src="/images/varvel-logo.png"
              alt="Varvel"
            />
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="company-info-content">

          <h2>
            MGM SpA and Varvel SpA: joint venture in India to
            support Italian manufacturing
          </h2>

          <p>
            MGM-VARVEL Power Transmission Pvt. Ltd. has been supplying
            top quality, high precision, Italian made, mechanical
            engineering products to Indian manufacturers since 2011.
            The joint venture can rely on the combined expertise of the
            two leading Italian companies behind it: Varvel SpA and MGM
            Motori Elettrici SpA, specialists in power transmission
            systems and electric motors (especially self-braking)
            respectively.
          </p>

          <p>
            MGM-VARVEL's base in Chennai, a large industrial town in the
            south east of India, serves both as assembly centre for the
            gearboxes and motors imported from Italy and as a strategic
            logistic centre for the distribution of products throughout
            India.
          </p>

          <p>
            In order to integrate Italian products into the Indian
            economy as effectively as possible, local professionals
            have been employed to run the joint venture's functions
            since its formation. The company's management, technical
            office, accounts and sales force are rigorously Indian.
          </p>

          <button
            type="button"
            className="company-contact-btn"
            onClick={handleContact}
          >
            CONTACT US
          </button>

        </div>

      </div>
    </section>
    <CTASection/>
    </>
  );
};

export default CompanyInfo;