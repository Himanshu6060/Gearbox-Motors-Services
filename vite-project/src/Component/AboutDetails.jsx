import React from "react";
import Commitment from "./Commitment";


const AboutDetails = () => {
  const companyInfo = [
    {
      title: "Manufacturer",
      description:
        "We design and manufacture high-performance gearboxes and motors engineered to meet specific OEM and industrial power transmission requirements.",
    },
    {
      title: "Distributor",
      description:
        "We are a trusted distributor of leading gearbox and motor brands, providing reliable, high-quality power transmission solutions to industries across India.",
    },
    {
      title: "Importer",
      description:
        "We source premium gearboxes, motors, and power transmission components from trusted global manufacturers, maintaining consistent quality and supply.",
    },
    {
      title: "PSU Contractor",
      description:
        "We supply reliable gearbox and motor solutions for industrial applications, supporting manufacturers, OEMs, and engineering companies with quality products and technical expertise",
    },
  ];

  return (
    <>
    <section className="about-details-section">

      <div className="about-details-container">

        <div className="about-details-grid">

          {companyInfo.map((item, index) => (
            <div className="about-details-card" key={index}>

              <h2>{item.title}</h2>

              <p>{item.description}</p>

            </div>
          ))}

        </div>

      </div>

    </section>
    <Commitment/>
    </>
  );
};

export default AboutDetails;