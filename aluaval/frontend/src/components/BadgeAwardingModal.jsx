import { useEffect, useState, useRef } from "react";
import { fetchDynamicRoute, getById } from "../services/dataFetch.js";

const BadgeAwardingModal = ({ student, group, onCreate, onClose, isOpen }) => {
  const [unawardedBadges, setUnawardedBadges] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const modalRef = useRef();

  useEffect(() => {
    const fetchUnawardedBadges = async () => {
      try {
        let data = await fetchDynamicRoute("awards", ["unawarded", group]);
        setUnawardedBadges(data);
      } catch (error) {
        console.error("Error fetching unawarded badges:", error);
      }
    };
    const fetchStudent = async () => {
      try {
        let data = await getById("users", student);
        setStudentData(data);
      } catch (error) {
        console.error("Error fetching necessary student data: ", error);
      }
    };
    if (student) {
      fetchUnawardedBadges();
      fetchStudent();
    }
  }, [student, group]);

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
    <div className={`w3-modal  ${isOpen ? "w3-show" : ""} `}>
      <div
        className="w3-modal-content w3-container w3-card w3-round-large w3-padding"
        style={{ background: "#fffef3" }}
        ref={modalRef}
      >
        <span
          className="w3-button w3-border w3-border-black w3-margin w3-red w3-display-topright w3-hover-pale-yellow w3-round-large"
          onClick={onClose}
        >
          Close
        </span>
        <div className="w3-container w3-row w3-row-padding w3-margin-bottom">
          <h2 className="w3-text-brown">
            {`Award Badge to`} <b> {`${studentData.name}`}</b>
          </h2>
          <div>
            {unawardedBadges.length === 0 ? (
              <p>No unawarded badges available for this student.</p>
            ) : (
              unawardedBadges.map((badge, index) => (
                <div key={index} className="w3-col s12 m6 l3 w3-margin-bottom">
                  <button
                    className="w3-button w3-hover-khaki w3-text-white w3-card w3-padding "
                    onClick={() => handleAwardBadge(badge.id)} // Award badge when clicked
                    style={{
                      background: "#5e403f",
                      display: "flex",
                      flexDirection: "column",
                      margin: "auto",
                      width: "90%",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "4px",
                      position: "relative",
                    }}
                    title={`${badge.name}, ${badge.awardCount} awarded in group`}
                  >
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        textAlign: "center",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                      }}
                    >
                      {/* Badge Icon */}
                      <i
                        className={`fa ${badge.icon}`}
                        aria-hidden="true"
                        style={{ fontSize: "24px" }}
                      ></i>

                      {/* Badge Name with Ellipsis */}
                      <span
                        style={{
                          maxWidth: "100%",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          padding: "0 6px",
                        }}
                        title={`${badge.name}, ${badge.awardCount} awarded in group`}
                      >
                        {badge.name}
                      </span>
                      <span
                        className="w3-tag w3-small w3-round w3-text-black"
                        style={{
                          position: "absolute",
                          top: "0px",
                          right: "0px",
                          backgroundColor: "rgba(255,255,255,0.3)",
                          fontWeight: "bold",
                        }}
                        title={`${badge.name}, ${badge.awardCount} awarded in group`}
                      >
                        {badge.awardCount}
                      </span>
                    </div>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgeAwardingModal;
