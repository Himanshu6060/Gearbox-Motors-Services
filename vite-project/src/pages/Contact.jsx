import React, { useState } from "react";
// import "./Contact.css";

const Contact = () => {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    requirement: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const companyAddress =
    "001, Bld.06, Padmavati Estate, near Bhav Residency, Datt Mandir, Before Kasheli Toll Naka, Bhiwandi, Maharashtra 421302, India";

  // ==========================================
  // GET DIRECTIONS
  // ==========================================

  const handleGetDirection = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        const destination =
          encodeURIComponent(companyAddress);

        const url =
          `https://www.google.com/maps/dir/?api=1` +
          `&origin=${latitude},${longitude}` +
          `&destination=${destination}`;

        window.open(
          url,
          "_blank",
          "noopener,noreferrer"
        );
      },

      (error) => {
        if (
          error.code ===
          error.PERMISSION_DENIED
        ) {
          alert(
            "Location permission was denied. Please allow location access to get directions."
          );
        } else {
          alert(
            "Unable to get your current location."
          );
        }
      }
    );
  };

  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // CONTACT FORM SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/api/contact`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      // ========================================
      // BACKEND ERROR
      // ========================================

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to submit contact form."
        );
      }

      // ========================================
      // SUCCESS
      // ========================================

      setSuccess(
        data.message ||
          "Thank you! Your message has been submitted successfully."
      );

      // Reset form
      setFormData({
        name: "",
        company: "",
        phone: "",
        email: "",
        requirement: "",
        message: "",
      });

      // Remove success message after 5 seconds
      setTimeout(() => {
        setSuccess("");
      }, 5000);

    } catch (error) {
      console.error(
        "Contact form error:",
        error
      );

      setError(
        error.message ||
          "Something went wrong. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="contact-page">

      {/* =========================================
          HERO
      ========================================= */}

      <section className="contact-hero">

        <div className="contact-hero-content">

          <span>GET IN TOUCH</span>

          <h1>Contact Us</h1>

          <p>
            Have a question or need assistance?
            Our team is here to help you with
            your industrial requirements.
          </p>

        </div>

      </section>


      {/* =========================================
          ROW 1 - INFORMATION + MAP
      ========================================= */}

      <section className="contact-location-section">

        {/* =====================================
            LEFT - CONTACT INFORMATION
        ===================================== */}

        <div className="contact-info">

          <span className="contact-small-title">
            CONTACT INFORMATION
          </span>

          <h2>
            Let's Talk About
            <br />
            Your Requirement
          </h2>

          <p className="contact-info-description">
            Whether you have a product inquiry,
            service requirement or need technical
            assistance, feel free to contact
            our team.
          </p>


          {/* EMAIL */}

          <div className="contact-info-item">

            <div className="contact-icon">
              ✉
            </div>

            <div>

              <span>Email</span>

              <a
                href="mailto:issindustrialsales@gmail.com"
              >
                issindustrialsales@gmail.com
              </a>

            </div>

          </div>


          {/* PHONE */}

          <div className="contact-info-item">

            <div className="contact-icon">
              ☎
            </div>

            <div>

              <span>Mobile No.</span>

              <a href="tel:+919833158663">
                +91 98331 58663
              </a>

            </div>

          </div>


          {/* ADDRESS */}

          <div className="contact-info-item">

            <div className="contact-icon">
              📍
            </div>

            <div>

              <span>Address</span>

              <p>
                001, Bld.06, Padmavati Estate,
                near Bhav Residency,
                Datt Mandir,
                Before Kasheli Toll Naka,
                Bhiwandi,
                Maharashtra 421302,
                India
              </p>

            </div>

          </div>

        </div>


        {/* =====================================
            RIGHT - GOOGLE MAP
        ===================================== */}

        <div className="contact-map-wrapper">

          <div className="contact-map">

            <iframe
              title="Company Location"
              src="https://www.google.com/maps?q=Padmavati%20Estate%2C%20Kasheli%2C%20Bhiwandi%2C%20Maharashtra%20421302%2C%20India&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>


            <button
              type="button"
              className="direction-btn"
              onClick={handleGetDirection}
            >
              📍 Get Directions
            </button>

          </div>

        </div>

      </section>


      {/* =========================================
          ROW 2 - TEXT + CONTACT FORM
      ========================================= */}

      <section className="contact-form-section">

        {/* =====================================
            LEFT TEXT
        ===================================== */}

        <div className="contact-form-text">

          <span className="contact-small-title">
            SEND US A MESSAGE
          </span>

          <h2>
            We Would Love
            <br />
            To Hear From You
          </h2>

          <p>
            Tell us about your requirement,
            product inquiry or any other question
            you may have. Fill out the form and
            our team will get back to you as soon
            as possible.
          </p>

          <p>
            We are committed to providing reliable
            industrial solutions and professional
            support to our customers.
          </p>


          <div className="contact-highlight">

            <strong>
              Need immediate assistance?
            </strong>

            <a href="tel:+919833158663">
              Call us: +91 98331 58663
            </a>

          </div>

        </div>


        {/* =====================================
            RIGHT CONTACT FORM
        ===================================== */}

        <div className="contact-form-card">

          <form onSubmit={handleSubmit}>

            {/* NAME + COMPANY */}

            <div className="contact-form-row">

              <div className="contact-field">

                <label htmlFor="name">
                  Your Name
                  <span>*</span>
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />

              </div>


              <div className="contact-field">

                <label htmlFor="company">
                  Your Company
                </label>

                <input
                  id="company"
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Enter company name"
                />

              </div>

            </div>


            {/* PHONE + EMAIL */}

            <div className="contact-form-row">

              <div className="contact-field">

                <label htmlFor="phone">
                  Phone
                  <span>*</span>
                </label>

                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  pattern="[0-9]{10}"
                  maxLength="10"
                  required
                />

              </div>


              <div className="contact-field">

                <label htmlFor="email">
                  Email Address
                  <span>*</span>
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  required
                />

              </div>

            </div>


            {/* REQUIREMENT */}

            <div className="contact-field">

              <label htmlFor="requirement">
                Requirement
              </label>

              <input
                id="requirement"
                type="text"
                name="requirement"
                value={formData.requirement}
                onChange={handleChange}
                placeholder="What are you looking for?"
              />

            </div>


            {/* MESSAGE */}

            <div className="contact-field">

              <label htmlFor="message">
                Write Message
              </label>

              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                rows="6"
              ></textarea>

            </div>


            {/* =================================
                SUCCESS MESSAGE
            ================================= */}

            {success && (
              <div className="contact-success">
                ✓ {success}
              </div>
            )}


            {/* =================================
                ERROR MESSAGE
            ================================= */}

            {error && (
              <div className="contact-error">
                ✕ {error}
              </div>
            )}


            {/* =================================
                SUBMIT BUTTON
            ================================= */}

            <button
              type="submit"
              className="contact-submit-btn"
              disabled={loading}
            >

              {loading ? (
                <>
                  <span className="contact-loader"></span>
                  Sending...
                </>
              ) : (
                "Submit"
              )}

            </button>

          </form>

        </div>

      </section>

    </main>
  );
};

export default Contact;