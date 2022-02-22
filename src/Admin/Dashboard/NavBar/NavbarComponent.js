import { Link, NavLink } from "react-router-dom";
import "../../Stylesheets/NavBar.css";
import logo from "../../Assets/logo.png";

const NavbarComponent = () => {
  return (
    <div className="sidenav">
      <Link to="/admin/dashboard/">
        <img id="sidenav-logo" src={logo} />
      </Link>
      <NavLink to="/admin/dashboard/manage-banner" className="nav-link">
        Manage Banner
      </NavLink>
      <NavLink to="/admin/dashboard/manage-featured" className="nav-link">
        Manage Featured
      </NavLink>
      <NavLink to="/admin/dashboard/manage-post" className="nav-link">
        Manage Post
      </NavLink>
      <NavLink to="/admin/dashboard/manage-archives" className="nav-link">
        Manage Archives
      </NavLink>
      <NavLink to="/admin/dashboard/manage-comments" className="nav-link">
        Manage Comments
      </NavLink>
      <NavLink to="/admin/dashboard/manage-aboutus" className="nav-link">
        Manage About Us
      </NavLink>
      <NavLink
        exact
        to="/admin/dashboard/manage-registration"
        className="nav-link"
      >
        Manage Registration
      </NavLink>
      <NavLink to="/admin/dashboard/manage-donation" className="nav-link">
        Manage Donation
      </NavLink>
      <NavLink to="/admin/dashboard/manage-records" className="nav-link">
        Manage Records
      </NavLink>
      <NavLink to="/admin/dashboard/manage-changepassword" className="nav-link">
        Change Password
      </NavLink>
      <NavLink exact to="/admin/dashboard/manage-logout" className="nav-link">
        Log Out
      </NavLink>
    </div>
  );
};

export default NavbarComponent;
