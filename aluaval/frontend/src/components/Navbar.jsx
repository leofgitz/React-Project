import React, { useEffect, useState } from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { fetchDynamicRoute } from "../services/dataFetch.js";
import { useAuth } from "../context/authProvider.jsx";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const role = user?.role;
  const name = user?.name;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const hiddenPaths = ["/login", "/register", "/eval"];
  const showNavbar = !hiddenPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  const handleLogout = async (event) => {
    event.preventDefault();

    try {
      logout();
      console.log("Logging out...");
      navigate("/login");
    } catch (error) {
      console.error(err.message);
    }
  };

  const showDropdown = () => {
    let x = document.getElementById("user");
    const isOpen = x.className.indexOf("w3-show") !== -1;

    if (isOpen) {
      x.className = x.className.replace(" w3-show", "");
      setDropdownOpen(false);
    } else {
      x.className += " w3-show";
      setDropdownOpen(true);
    }
  };

  const handleClickOutside = (event) => {
    const dropdown = document.getElementById("user");
    const button = document.getElementById("dropdown-button");
    if (
      dropdown &&
      !dropdown.contains(event.target) &&
      button &&
      !button.contains(event.target)
    ) {
      dropdown.classList.remove("w3-show");
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    // Set up the event listener when the component mounts
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  if (!showNavbar) {
    return null;
  }

  return (
    <div className="w3-top">
      <div
        className="w3-card w3-bar w3-padding"
        style={{ background: "#fcf8ee" }}
      >
        <NavLink
          to="/"
          className={`w3-bar-item w3-button w3-card w3-round-xlarge w3-hover-pale-yellow w3-margin-right ${
            location.pathname === "/" ? "w3-disabled" : ""
          }`}
          title="Control Panel"
          style={{ background: "#e4d3a4" }}
        >
          <i className="fa fa-home w3-xlarge"></i>
        </NavLink>

        {role === "Teacher" ? (
          <>
            <NavLink
              to="/group-creation"
              className={`w3-bar-item w3-button w3-card w3-round-xlarge w3-hover-pale-yellow w3-margin-right ${
                location.pathname === "/group-creation" ? "w3-disabled" : ""
              }`}
              title="Dashboard"
              style={{ background: "#e4d3a4" }}
            >
              <i className="fa fa-users w3-xlarge"></i>{" "}
            </NavLink>

            <NavLink
              to="/subject-creation"
              className={`w3-bar-item w3-button w3-card w3-round-xlarge w3-hover-pale-yellow w3-margin-right ${
                location.pathname === "/subject-creation" ? "w3-disabled" : ""
              }`}
              title="Subject Creation"
              style={{ background: "#e4d3a4" }}
            >
              <i className="fa fa-chalkboard-teacher w3-xlarge"></i>{" "}
            </NavLink>
          </>
        ) : (
          <NavLink
            to="/groups-page"
            className={`w3-bar-item w3-button w3-card w3-round-xlarge w3-hover-pale-yellow w3-margin-right ${
              location.pathname === "/groups-page" ? "w3-disabled" : ""
            }`}
            title="Dashboard"
            style={{ background: "#e4d3a4" }}
          >
            <i className="fa fa-users w3-xlarge"></i>
          </NavLink>
        )}

        {/* <button
          className="w3-bar-item w3-button w3-card w3-round-xlarge w3-margin-left w3-right"
          onClick={handleLogout}
          title="Logout"
          style={{ background: "#e4d3a4" }}
        >
          <i className="fa fa-sign-out-alt"></i>
        </button>

        <NavLink
          to="/notifications"
          className={`w3-bar-item w3-button w3-round-xlarge w3-right ${
            location.pathname === "/notifications" ? "w3-disabled" : ""
          }`}
          title="Notifications"
          style={{ background: "#f2e032" }}
        >
          <i className="fa fa-bell"></i>
        </NavLink> */}
        <div
          style={{
            position: "absolute",
            right: 0,
          }}
          className="w3-card w3-dropdown-click w3-margin-right w3-round-xlarge w3-right"
        >
          <button
            className="w3-button w3-hover-pale-yellow"
            id="dropdown-button"
            style={{
              background: "#e4d3a4",
              display: "flex",
              marginLeft: "auto",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
              position: "relative",
            }}
            title={`Current user: ` + name}
            onClick={showDropdown}
          >
            {name}{" "}
            <i
              className="fas fa-caret-down w3-xlarge"
              style={{
                transform: dropdownOpen ? "rotate(-180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease",
              }}
            ></i>
          </button>
          <div
            id="user"
            className="w3-dropdown-content w3-bar-block w3-round-large w3-white w3-border"
            style={{ right: 0 }}
          >
            <NavLink
              to="/notifications"
              onClick={
                location.pathname === "/notifications" ? null : showDropdown
              }
              className={`w3-bar-item w3-hover-text-black w3-round-xlarge w3-right ${
                location.pathname === "/notifications" ? "w3-disabled" : ""
              }`}
              title="Notifications"
            >
              <i className="fa fa-bell"></i> Notifications
            </NavLink>
            <button
              className="w3-bar-item w3-round-xlarge  w3-white w3-right"
              onClick={handleLogout}
              title="Logout"
            >
              <i className="fa fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
