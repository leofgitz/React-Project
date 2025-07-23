import { useState } from "react";

const CourseModal = ({ isOpen, onCreate, onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(name, description);
    onClose(); // Close the modal after submission
  };

  return (
    <div className={`w3-modal ${isOpen && "w3-show"}`}>
      <div className="w3-modal-content w3-container w3card w3-round-large w3-padding">
        <span
          className="w3-button w3-border w3-border-black w3-margin w3-red w3-display-topright w3-hover-pale-yellow w3-round-large"
          onClick={onClose}
        >
          Close
        </span>
        <h2 className="w3-text-brown">Create Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="w3-row-padding w3-padding">
            <div className="w3-half w3-container w3-section">
              <label>
                Name:
                <input
                  className="w3-input w3-border w3-border-black w3-round-large"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name for your course"
                  required
                />
              </label>
            </div>
            <div className="w3-half w3-container w3-section">
              <label>
                Description:
                <input
                  className="w3-input w3-border w3-border-black w3-round-large"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short description of your course"
                  required
                />
              </label>
            </div>
            <button
              className="w3-button w3-text-white w3-margin w3-hover-khaki w3-round-xxlarge"
              type="submit"
              style={{ background: "#5e403f" }}
            >
              Create Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseModal;
