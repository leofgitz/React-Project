import React from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const hiddenPaths = ["/login", "/evaluation/self", "/evaluation/peer"];
  const showNavbar = !hiddenPaths.includes(location.pathname);

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
    // Redirect to login page after logout
    navigate("/login");
  };

  if (!showNavbar) {
    return null;
  }

  return (
    <div className="w3-top">
      <div
        className="w3-bar w3-padding w3-orange"
        style={{ position: "relative" }}
      >
        <NavLink
          to="/"
          className={`w3-bar-item w3-button w3-card w3-round-xxlarge w3-margin-right ${
            location.pathname === "/" ? "w3-disabled" : "w3-blue"
          }`}
        >
          <i className="fa fa-home"></i> Home
        </NavLink>
        <NavLink
          to="/evaluation/peer"
          className={`w3-bar-item w3-button w3-card w3-round-xxlarge w3-margin-right ${
            location.pathname === "/evaluation/peer" ? "w3-disabled" : "w3-blue"
          }`}
        >
          <i className="fa fa-edit"></i> Peer Evaluation
        </NavLink>
        <NavLink
          to="/evaluation/self"
          className={`w3-bar-item w3-button w3-card w3-round-xxlarge w3-margin-right ${
            location.pathname === "/evaluation/self" ? "w3-disabled" : "w3-blue"
          }`}
        >
          <i className="fa fa-edit"></i> Self Evaluation
        </NavLink>
        <NavLink
          to="/group-creation"
          className={`w3-bar-item w3-button w3-card w3-round-xxlarge w3-margin-right ${
            location.pathname === "/group-creation" ? "w3-disabled" : "w3-blue"
          }`}
        >
          <i className="fa fa-users"></i> Group Creation
        </NavLink>

        <button
          className="w3-bar-item w3-button w3-card w3-blue w3-round-xxlarge w3-margin-left w3-right"
          onClick={handleLogout}
        >
          <i className="fa fa-sign-out-alt"></i> Logout
        </button>

        <div className="w3-dropdown-hover w3-right w3-round-large">
          <button className="w3-button w3-card w3-blue w3-round-xxlarge w3-margin-left">
            <i className="fa fa-bell"></i> Notifications
          </button>
          <div
            className="w3-dropdown-content w3-bar-block w3-card-4 w3-round-large"
            style={{ position: "fixed" }}
          >
            <NavLink to="#" className="w3-bar-item w3-button w3-round-large">
              Notification 1
            </NavLink>
            <NavLink to="#" className="w3-bar-item w3-button w3-round-large">
              Notification 2
            </NavLink>
            <NavLink to="#" className="w3-bar-item w3-button w3-round-large">
              Notification 3
            </NavLink>
            <NavLink
              to="/notifications"
              className="w3-bar-item w3-button w3-blue w3-round-large"
            >
              View All
            </NavLink>
          </div>
        </div>

        <button
          className="w3-small w3-display-middle w3-card w3-light-blue w3-round-xxlarge w3-margin-left w3-right"
          style={{ cursor: "default" }}
        >
          <i className="fa fa-user"></i> John Doe
        </button>
      </div>
    </div>
  );
};

export default Navbar;
