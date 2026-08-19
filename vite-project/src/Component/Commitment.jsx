import {
  FaBullseye,
  FaEye,
  FaAward,
} from "react-icons/fa";

const Commitment = () => {
  const commitmentData = [
    {
      title: "Our Mission",
      icon: <FaBullseye />,
      description:
        "To provide reliable, efficient, and cost-effective gearbox and motor solutions that improve performance, productivity, and power transmission across industries.",
    },
    {
      title: "Our Vision",
      icon: <FaEye />,
      description:
        "To become one of India’s most trusted and reliable partners for industrial gearboxes, motors, and power transmission solutions.",
    },
    {
      title: "Our Values",
      icon: <FaAward />,
      description:
        "We stand for Quality, Reliability, Integrity, Innovation, and Customer Focus — delivering dependable products, timely service, and long-term solutions for our customers",
    },
  ];

  return (
    <section className="commitment-section">

      <div className="commitment-container">

        {/* Heading */}
        <div className="commitment-heading">
          <h2>Our Commitment. Our Future. Our Values.</h2>
        </div>

        {/* Cards */}
        <div className="commitment-grid">

          {commitmentData.map((item, index) => (
            <div className="commitment-card" key={index}>

              {/* Icon */}
              <div className="commitment-icon">
                {item.icon}
              </div>

              {/* Title */}
              <h3>{item.title}</h3>

              {/* Description */}
              <p>{item.description}</p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default Commitment;