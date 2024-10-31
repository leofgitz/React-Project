import React, { useEffect, useState } from "react";
import { fetchDynamicRoute } from "../services/dataFetch.js";

const BadgeAwardingModal = ({ student, group, onCreate, onClose }) => {
  const [unawardedBadges, setUnawardedBadges] = useState([]);

  useEffect(() => {
    const fetchUnawardedBadges = async () => {
      try {
        let data = await fetchDynamicRoute("awards", ["unawarded", group]);
        setUnawardedBadges(data);
      } catch (error) {
        console.error("Error fetching unawarded badges:", error);
      }
    };
    if (student) {
      fetchUnawardedBadges();
    }
  }, [student, group]);

  const handleAwardBadge = async (badge) => {
    try {
      // Call the onCreate function to award the badge
      await onCreate(badge, student);
      onClose(); // Close the modal after awarding
    } catch (error) {
      console.error("Error awarding badge:", error);
    }
  };

  return (
    <div className="w3-modal">
      <div className="w3-modal-content">
        <div className="w3-container">
          <h2>{`Award Badge to ${student.name}`}</h2>
          <div>
            {unawardedBadges.length === 0 ? (
              <p>No unawarded badges available for this student.</p>
            ) : (
              unawardedBadges.map((badge, index) => (
                <div
                  key={index}
                  className="w3-card w3-padding"
                  style={{ margin: "10px 0", display: "inline-block" }} // Display inline-block for better layout
                >
                  <button
                    className="w3-button w3-green"
                    onClick={() => handleAwardBadge(badge.id)} // Award badge when clicked
                    style={{
                      border: "none",
                      background: "transparent",
                      padding: "0",
                    }} // Style to make it look like an icon
                  >
                    <i
                      className={`fa ${badge.icon}`}
                      aria-hidden="true"
                      title={badge.name}
                      style={{ fontSize: "24px" }} // Adjust icon size if needed
                    ></i>
                  </button>
                </div>
              ))
            )}
          </div>
          <button className="w3-button w3-red" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BadgeAwardingModal;
