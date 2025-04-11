import React from "react";

const NotificationMessage = ({ notification, handleSetAsRead }) => {
  const { type, message } = notification;
  return (
    <div
      className={`w3-card-4 w3-margin w3-padding ${
        notification.isRead ? "w3-light-grey" : "w3-white"
      }`}
      style={{
        fontWeight: notification.isRead ? "normal" : "bold",
      }}
    >
      <h3 className="w3-text-theme">{type}</h3>
      <p>{message}</p>
      <p className="w3-small w3-text-grey">
        {new Date(notification.createdAt).toLocaleString()}
      </p>
      {!notification.isRead && (
        <button
          className="w3-button w3-theme-d3 w3-margin-top"
          onClick={() => handleSetAsRead(notification.id)}
        >
          Mark as Read
        </button>
      )}
    </div>
  );
};

export default NotificationMessage;
