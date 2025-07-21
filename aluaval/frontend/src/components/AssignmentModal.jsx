import React, { useState } from "react";

const AssignmentModal = ({ onClose, onCreate, isOpen }) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(title, dueDate);
    onClose(); // Close the modal after submission
  };

  return (
    <div className={`w3-modal ${isOpen ? "w3-show" : ""}`}>
      <div className="w3-modal-content w3-container w3-card w3-round-large w3-padding">
        <span
          className="w3-button w3-border w3-border-black w3-margin w3-red w3-display-topright w3-hover-pale-yellow w3-round-large"
          onClick={onClose}
        >
          Close
        </span>
        <h2 className="w3-text-brown">Create Assignment</h2>
        <form onSubmit={handleSubmit}>
          <div className="w3-section">
            <label>
              Title:
              <input
                className="w3-input w3-border w3-border-black w3-round-large"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="w3-section">
            <label>
              Due Date:
              <input
                className="w3-input w3-border w3-border-black w3-round-large"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </label>
          </div>
          <button
            className="w3-button w3-text-white w3-margin w3-hover-khaki w3-round-xxlarge"
            type="submit"
            style={{ background: "#5e403f" }}
          >
            Create Assignment
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssignmentModal;
