import {
  FaUserTie,
  FaHandshake,
  FaIndustry,
  FaHeadset,
  FaPhoneAlt,
} from "react-icons/fa";
import ProductionPlant from "./ProductionPlant";
// import SalesNetwork from "./SalesNetwork";


const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaUserTie />,
      title: "30+ Years of Experience",
      description:
        "Over three decades of experience delivering reliable industrial motors, gearboxes and power transmission solutions to industries across India.",
    },
    {
      icon: <FaHandshake />,
      title: "OEM Authorized Partner",
      description:
        "Authorized partnerships with trusted manufacturers ensure genuine, high-quality motors, gearboxes and industrial components.",
    },
    {
      icon: <FaIndustry />,
      title: "Repair & Maintenance Services",
      description:
        "Professional motor and gearbox inspection, repair, maintenance and replacement services to minimize downtime and keep your operations running.",
    },
    {
      icon: <FaHeadset />,
      title: "Pan-India Support",
      description:
        "Fast product supply, technical assistance and responsive after-sales support for industries across India.",
    },
  ];

  return (
    <section className="why-section">

      <div className="why-container">

        {/* ================= LEFT ================= */}

        <div className="why-left">

          {features.map((item, index) => (
            <div className="why-feature" key={index}>

              <div className="why-icon">
                {item.icon}
              </div>

              <div className="why-feature-content">

                <h3>{item.title}</h3>

                <p>{item.description}</p>

              </div>

            </div>
          ))}

        </div>


        {/* ================= RIGHT ================= */}

        <div className="why-right">

          <div className="why-small-title">
            INDUSTRIAL MOTORS. POWERING PERFORMANCE.
          </div>

          <h2>
            Why Choose Us
          </h2>

          {/* <p className="why-description">
            At <strong>Industrial Sales & Service</strong>, we go beyond
            supplying products — we deliver{" "}
            <strong>
              reliable partnerships and end-to-end heating,
              insulation, and temperature control solutions
            </strong>{" "}
            that keep industries running safely and efficiently.
          </p> */}
         <p className="why-description">We go beyond supplying <strong> industrial motors and gearboxes.</strong> We provide complete <strong>power transmission solutions, technical expertise and reliable </strong>{" "}after-sales service to help industries achieve maximum performance, efficiency and uptime.</p> 

          {/* Product Image */}

          <div className="why-image-wrapper">

            <img
              src="/images/why-choose-us.jpg"
              alt="Industrial Heating Products"
            />

            {/* Phone Box */}

            <div className="why-phone">

              <FaPhoneAlt />

              <span>+91 98331 58663</span>

            </div>

          </div>

        </div>

      </div>
          {/* <SalesNetwork/> */}
          <ProductionPlant/>
    </section>
  );
};

export default WhyChooseUs;