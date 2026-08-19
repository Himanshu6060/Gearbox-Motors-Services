import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useInquiry } from "../Context/InquiryContext.jsx";

// import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { openInquiry } = useInquiry();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleInquiry = () => {
    setMenuOpen(false);
    openInquiry();
  };

  return (
    <header className="navbar">

      <div className="nav-container">

        {/* Logo */}
        <div className="logo">
          <NavLink to="/" onClick={closeMenu}>
            <img
              src="/images/logo.png"
              alt="Company Logo"
            />
          </NavLink>
        </div>

        {/* Navigation */}
        <nav
          className={
            menuOpen
              ? "nav-menu active"
              : "nav-menu"
          }
        >

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
            onClick={closeMenu}
          >
            Company
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
            onClick={closeMenu}
          >
            About
          </NavLink>

          <NavLink
            to="/service"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
            onClick={closeMenu}
          >
            Services
          </NavLink>
          <NavLink
            to="/salesnetwork"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
            onClick={closeMenu}
          >
            Sales Network
          </NavLink>
          <NavLink
            to="/product"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
            onClick={closeMenu}
          >
            Products
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
            onClick={closeMenu}
          >
            Contact Us
          </NavLink>

          {/* Inquiry */}
          <button
            type="button"
            className="inquiry-btn"
            onClick={handleInquiry}
          >
            INQUIRE NOW
          </button>

        </nav>

        {/* Hamburger */}
        <div
          className={
            menuOpen
              ? "hamburger active"
              : "hamburger"
          }
          onClick={() =>
            setMenuOpen((prev) => !prev)
          }
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

      </div>

    </header>
  );
};

export default Navbar;