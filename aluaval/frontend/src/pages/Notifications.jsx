import React, { useState, useEffect } from "react";
import { fetchDynamicRoute, getAll } from "../services/dataFetch";
import NotificationMessage from "../components/NotificationMessage";

const Notifications = ({}) => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      let response;
      response = await getAll("notifications");

      setNotifications(response);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const setAsRead = async (id) => {
    return fetchDynamicRoute("notifications", [id], "PATCH");
  };

  const setAllAsRead = async () => {
    return fetchDynamicRoute("notifications", [], "PATCH");
  };

  const handleSetAsRead = async (id) => {
    try {
      await setAsRead(id);
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === id
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  const handleSetAllAsRead = async () => {
    try {
      await setAllAsRead();
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );
    } catch (err) {
      console.error("Error marking all notifications as read:", err);
    }
  };

  const navToPage = () => {};

  return (
    <div className="main-content">
      <div className="w3-container w3-padding-32">
        <h2 className="w3-center w3-text-theme">Notifications</h2>
        <div className="w3-panel w3-round-xxlarge w3-card-4 w3-padding">
          <button
            className="w3-button w3-theme-d3 w3-margin-top"
            onClick={() => handleSetAllAsRead()}
          >
            Mark All as Read
          </button>
          {notifications.length === 0 ? (
            <p className="w3-center w3-text-grey">No notifications available</p>
          ) : (
            notifications.map((notification) => (
              <NotificationMessage
                key={notification.id}
                notification={notification}
                handleSetAsRead={handleSetAsRead}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
