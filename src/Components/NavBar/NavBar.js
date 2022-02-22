import { Link, NavLink } from "react-router-dom";
import logo from "../Assets/logo.png";
import "../Stylesheets/NavBar.css"

import { Nav, Navbar, NavbarBrand } from "react-bootstrap";
const NavBarComponentMain = () => {
  return (
    <Nav className="navbar navbar-custom navbar-light navbar-expand-lg fixed-top">
    <Link><img
      src={logo}
      width="100"
      height="80"
    /></Link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div
      className="collapse navbar-collapse "
      id="navbarSupportedContent"
    >
      <ul className="navbar-nav ml-auto d-flex align-items-center">
        <li className="nav-item">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/blog"  className="nav-link">
            Blog
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/registration" className="nav-link">
            Partner & Volunteer
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/about" className="nav-link" >
            About Us
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/contact" className="nav-link">
            Contact Us
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/donate"
            className="btn nav-link donate-btn"
            id="donate"
          >
            Donate
          </NavLink>
        </li>
      </ul>
    </div>
  </Nav>
  );
};

export default NavBarComponentMain;
