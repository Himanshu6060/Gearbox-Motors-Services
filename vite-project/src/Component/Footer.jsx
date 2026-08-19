import React from "react";
import { Link } from "react-router-dom";
import {
  FaTwitter,
  FaFacebookF,
  FaPinterestP,
  FaInstagram,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">

      {/* =========================
          MAIN FOOTER
      ========================== */}

      <div className="footer-container">

        {/* Company */}
        <div className="footer-company">

          <Link to="/" className="footer-logo">
            <img
              src="/images/logo.png"
              alt="Industrial Sales & Service"
            />
          </Link>

          <p>
            India’s trusted partner in industrial motors, brake motors, gearboxes, and complete power transmission solutions..
          </p>

          {/* Social Icons */}
          <div className="footer-social">

            <a href="#" aria-label="Twitter">
              <FaTwitter />
            </a>

            <a href="#" aria-label="Facebook">
              <FaFacebookF />
            </a>

            <a href="#" aria-label="Pinterest">
              <FaPinterestP />
            </a>

            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>

          </div>

        </div>


        {/* Explore */}
        <div className="footer-column">

          <h3>Explore</h3>

          <Link to="/">Industries</Link>
          <Link to="/about">About</Link>
          <Link to="/service">Services</Link>
          <Link to="/salesnetwork">Sales Network</Link>
          <Link to="/product">Products</Link>
          <Link to="/contact">Contact</Link>

        </div>


        {/* Products */}
        <div className="footer-column">

          <h3>Products</h3>

          <Link to="/product">Industrial Gearboxes</Link>
          <Link to="/product">Brake Motors</Link>
          <Link to="/product">Electric Motors</Link>
          <Link to="/product">Industrial Couplings</Link>
          <Link to="/electric-motors">
            Single-Phase Motors
          </Link>
          <Link to="/product">C-series Brake motors</Link>

        </div>


        {/* Contact */}
        <div className="footer-contact">

          <h3>Contact Details</h3>

          <div className="contact-item">

            <FaMapMarkerAlt />

            <p>
              001, Bld.06, Padmavati Estate, near Bhav Residency, Datt Mandir, Before Kasheli Toll Naka, Bhiwandi, Maharashtra – 421302, India
            </p>

          </div>


          <div className="contact-item">

            <FaEnvelope />

            <p>
              issindustrialsales@gmail.com
            </p>

          </div>


          <div className="contact-item">

            <FaPhoneAlt />

            <p>
              +91-98331 58663
            </p>

          </div>

        </div>

      </div>


      {/* =========================
          COPYRIGHT
      ========================== */}

      <div className="footer-bottom">

        <div className="footer-bottom-container">

          <p>
            Copyright © {new Date().getFullYear()} Industrial Sales & Service
            All Rights Reserved.
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;