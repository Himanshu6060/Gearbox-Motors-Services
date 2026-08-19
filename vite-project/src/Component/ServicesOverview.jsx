import { useNavigate } from "react-router-dom";
import {
  FaIndustry,
  FaBuilding,
  FaTemperatureHigh,
} from "react-icons/fa";


const services = [
  {
    title: "Custom Gearbox & Motor Solutions",
    description:
      "We provide gearbox and motor solutions tailored to your specific industrial applications, ensuring reliable performance, durability, and efficient power transmission.",
    icon: <FaIndustry />,
  },
  {
    title: "Power Transmission Solutions",
    description:
      "High-quality gearboxes, motors, and related components designed to deliver smooth operation, high torque, and long service life across demanding industrial environments.",
    icon: <FaBuilding />,
  },
  {
    title: "Technical Support & Engineering",
    description:
      "Expert guidance in gearbox and motor selection, sizing, installation, and maintenance to ensure accurate, safe, and efficient industrial operations.",
    icon: <FaTemperatureHigh />,
  },
];

const ServicesOverview = () => {
  const navigate = useNavigate();

  return (
    <section className="services-overview">
      <div className="services-overview-container">

        {/* SERVICE CARDS */}
        <div className="services-grid">

          {services.map((service, index) => (
            <div
              className={`service-card ${
                index === 1 ? "service-card-active" : ""
              }`}
              key={service.title}
            >
              {/* ICON */}
              <div className="service-icon">
                {service.icon}
              </div>

              {/* TITLE */}
              <h3>{service.title}</h3>

              {/* DESCRIPTION */}
              <p>{service.description}</p>
            </div>
          ))}


          {/* CTA CARD */}
          <div className="service-cta-card">

            <h2>
              We’re
              <br />
              providing
              <br />
              technical
              <br />
              solution
            </h2>

            <p>
              From product selection to complete power transmission solutions, we provide expert technical support backed by trusted brands, quality products, and reliable industrial service.
            </p>

            <button
              className="service-cta-btn"
              onClick={() => navigate("/product")}
            >
              VIEW ALL PRODUCTS
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ServicesOverview;