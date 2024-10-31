import React, { useEffect, useState } from "react";
import { fetchDynamicRoute } from "../services/dataFetch.js";

const BadgeModal = ({ group, onClose }) => {
  const [badgesData, setBadgesData] = useState([]);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        let data = await fetchDynamicRoute("award", ["group", group]);
        setBadgesData(data);
      } catch (error) {
        console.error("Error fetching badges:", error);
      }
    };

    if (group) {
      fetchBadges();
    }
  }, [group]);

  return (
    <div className="w3-modal">
      <div className="w3-modal-content">
        <div className="w3-container">
          <h2>{`Badges for Group ${group.number}`}</h2>
          <div>
            {badgesData.map((student, index) => (
              <div key={index} className="w3-card w3-padding">
                <h4>{student.studentName}</h4>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {student.badges.map((badge, badgeIndex) => (
                    <div key={badgeIndex} style={{ padding: "10px" }}>
                      <i
                        className={`fa ${badge.badgeIcon}`}
                        aria-hidden="true"
                        title={badge.badgeName} // Use title attribute for badge name
                      ></i>
                      <span style={{ marginLeft: "5px" }}>
                        {`X ${badge.badgeCount}`} {/* Always show as X Count */}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default BadgeModal;
