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
      <div className="w3-modal-content">
        <div className="w3-container">
          <span className="w3-button w3-display-topright" onClick={onClose}>
            &times;
          </span>
          <h2>Create Assignment</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>
            <label>
              Due Date:
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </label>
            <button type="submit">Create Assignment</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AssignmentModal;
