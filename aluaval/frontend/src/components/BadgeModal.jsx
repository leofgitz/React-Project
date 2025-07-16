import { useEffect, useState, useRef } from "react";
import { fetchDynamicRoute, getById } from "../services/dataFetch.js";

const BadgeModal = ({ group, onClose, isOpen }) => {
  const [badgesData, setBadgesData] = useState([]);
  const [groupNo, setGroupNo] = useState(0);
  const modalRef = useRef();

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        let data = await fetchDynamicRoute("awards", ["group", group]);
        setBadgesData(data);
        let num = await getById("groups", group);
        setGroupNo(num.number);
      } catch (error) {
        console.error("Error fetching badges:", error);
      }
    };

    if (group) {
      fetchBadges();
    }
  }, [group]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div className={`w3-modal ${isOpen ? "w3-show" : ""}`}>
      <div
        className="w3-modal-content  w3-round-large w3-container"
        style={{ background: "#fffef3" }}
        ref={modalRef}
      >
        <span
          className="w3-button w3-border w3-red w3-display-topright w3-hover-pale-yellow w3-round-large"
          onClick={onClose}
        >
          Close
        </span>
        <h2 className="w3-text-brown">
          {`Badges Awarded in `}
          <b>{`Group ${groupNo}`}</b>
        </h2>
        <div className="w3-container w3-padding w3-margin-bottom">
          {badgesData.length > 0 ? (
            badgesData.map((student, index) => (
              <div
                key={index}
                className="w3-card w3-padding w3-round-large w3-padding w3-margin-bottom"
              >
                <h4>{student.studentName}</h4>
                <div className="w3-row w3-row-padding">
                  {student.badges.map((badge, badgeIndex) => (
                    <div
                      key={badgeIndex}
                      className="w3-col s12 m6 l3 w3-margin-bottom"
                    >
                      <div
                        className="w3-card w3-padding w3-hover-brown w3-text-white"
                        style={{
                          background: "#5e403f",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "6px",
                          height: "100%",
                          textAlign: "center",
                          borderRadius: "8px",
                          overflow: "hidden",
                          position: "relative", // IMPORTANT for absolute child
                          paddingTop: "32px", // Room for badge count
                        }}
                        title={`${badge.badgeName} awarded ${
                          badge.badgeCount
                        } ${badge.badgeCount === 1 ? "time" : "times"}`}
                      >
                        {/* Top-right count */}
                        <span
                          className="w3-tag w3-small w3-round w3-text-black"
                          style={{
                            position: "absolute",
                            top: "6px",
                            right: "8px",
                            backgroundColor: "rgba(255,255,255,0.3)",
                            fontWeight: "bold",
                          }}
                        >
                          {badge.badgeCount}
                        </span>

                        {/* Badge icon */}
                        <i
                          className={`fa ${badge.badgeIcon}`}
                          aria-hidden="true"
                          style={{ fontSize: "24px" }}
                        ></i>

                        {/* Badge name */}
                        <span
                          style={{
                            padding: "0 4px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "100%", // Ensures it doesn't overflow the card
                          }}
                          title={`${badge.badgeName} awarded ${
                            badge.badgeCount
                          } ${badge.badgeCount === 1 ? "time" : "times"}`} // Tooltip for full name
                        >
                          {badge.badgeName}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="w3-center">No badges have been awarded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BadgeModal;
