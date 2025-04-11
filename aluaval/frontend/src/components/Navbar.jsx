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

  const isNotificationsPage = location.pathname === "/notifications";

  const hiddenPaths = ["/login", "/register", "/evaluation/"];
  const showNavbar = !hiddenPaths.some((path) =>
    location.pathname.startsWith(path)
  );
  const [notifs, setNotifs] = useState([]);

  const fetchNotifs = async () => {
    try {
      let data = await fetchDynamicRoute("notifications", "three");
      setNotifs(data);
    } catch (error) {
      console.error("Error fetching notifications:" + error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchNotifs();
    }
  }, [user]);

  const handleLogout = async (event) => {
    event.preventDefault();

    try {
      await logout();
      console.log("Logging out...");
      navigate("/login");
    } catch (error) {
      console.error(err.message);
    }
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
        {role === "Teacher" ? (
          <NavLink
            to="/group-creation"
            className={`w3-bar-item w3-button w3-card w3-round-xxlarge w3-margin-right ${
              location.pathname === "/group-creation"
                ? "w3-disabled"
                : "w3-blue"
            }`}
          >
            <i className="fa fa-users"></i> Assignments and Groups
          </NavLink>
        ) : (
          <NavLink
            to="/groups-page"
            className={`w3-bar-item w3-button w3-card w3-round-xxlarge w3-margin-right ${
              location.pathname === "/groups-page" ? "w3-disabled" : "w3-blue"
            }`}
          >
            <i className="fa fa-users"></i> Assignments, Badges and Evaluations
          </NavLink>
        )}

        <button
          className="w3-bar-item w3-button w3-card w3-blue w3-round-xxlarge w3-margin-left w3-right"
          onClick={handleLogout}
        >
          <i className="fa fa-sign-out-alt"></i> Logout
        </button>

        <div
          className={`w3-dropdown-hover w3-right w3-round-large ${
            isNotificationsPage ? "w3-disabled" : ""
          }`}
        >
          <button
            className="w3-button w3-card w3-blue w3-round-xxlarge w3-margin-left"
            disabled={isNotificationsPage} // Disable button if on the notifications page
          >
            <i className="fa fa-bell"></i> Notifications
          </button>
          <div
            className="w3-dropdown-content w3-bar-block w3-card-4 w3-round-large"
            style={{ position: "fixed" }}
          >
            {notifs.length > 0 &&
              !isNotificationsPage &&
              notifs.map((notif) => (
                <NotificationMessage key={notif.id} notification={notif} />
              ))}
            {!isNotificationsPage && (
              <NavLink
                to="/notifications"
                className={`w3-bar-item w3-button w3-blue w3-round-large`}
              >
                View All
              </NavLink>
            )}
          </div>
        </div>

        <button
          className="w3-small w3-display-middle w3-card w3-light-blue w3-round-xxlarge w3-margin-left w3-right"
          style={{ cursor: "default" }}
        >
          <i className="fa fa-user"></i> {name}
        </button>
      </div>
    </div>
  );
};

const NotificationMessage = ({ notification }) => {
  const { type, message } = notification;
  return (
    <div
      className={"w3-bar-item w3-button w3-round-large w3-white"}
      style={{
        fontWeight: "bold",
      }}
    >
      <h3 className="w3-text-theme">{type}</h3>
      <p>{message}</p>
    </div>
  );
};

export default Navbar;
