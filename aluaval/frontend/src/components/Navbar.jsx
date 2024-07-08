import React from "react";
import { useLocation, NavLink } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const hiddenPaths = ["/login", "/evaluation"];

  const showNavbar = !hiddenPaths.includes(location.pathname);

  if (!showNavbar) {
    return null;
  }

  const handleClick = (event) => {
    if (event.currentTarget.getAttribute("disabled") === "true") {
      event.preventDefault();
    }
  };

  return (
    <div className="w3-top">
      <div className="w3-bar w3-padding w3-orange">
        <NavLink
          to="/"
          className={`w3-bar-item w3-button w3-card w3-round-xxlarge w3-margin-right ${
            location.pathname === "/" ? "active-link" : "w3-blue"
          }`}
          onClick={(e) => handleClick(e, "/login")}
        >
          Home
        </NavLink>
        <NavLink
          to="/login"
          className="w3-bar-item w3-button w3-card w3-blue w3-round-xxlarge w3-margin-right"
        >
          Login
        </NavLink>
        <NavLink
          to="/evaluation/peer"
          className={`w3-bar-item w3-button w3-card w3-round-xxlarge w3-margin-right ${
            location.pathname === "/evaluation/peer" ? "active-link" : "w3-blue"
          }`}
        >
          Peer Evaluation
        </NavLink>
        <NavLink
          to="/evaluation/self"
          className={`w3-bar-item w3-button w3-card w3-round-xxlarge w3-margin-right ${
            location.pathname === "/evaluation/self" ? "active-link" : "w3-blue"
          }`}
        >
          Self Evaluation
        </NavLink>
        {/* Add more links as needed */}
      </div>
    </div>
  );
};

export default Navbar;
