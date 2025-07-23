import { useState } from "react";

const SubjectModal = ({ isOpen, onCreate, onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(name, description, year);
    onClose(); // Close the modal after submission
  };

  return (
    <div className={`w3-modal  ${isOpen && "w3-show"}`}>
      <div className="w3-modal-content w3-container w3card w3-round-large w3-padding">
        <span
          className="w3-button w3-border w3-border-black w3-margin w3-red w3-display-topright w3-hover-pale-yellow w3-round-large"
          onClick={onClose}
        >
          Close
        </span>
        <h2 className="w3-text-brown">Create Subject</h2>
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
                  placeholder="Name for your subject"
                  required
                />
              </label>
              <label>
                Year:
                <select
                  class="w3-select w3-border w3-border-black w3-round-large"
                  name="year"
                  onChange={(e) => setYear(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Choose the year
                  </option>
                  <option value="1">Year 1</option>
                  <option value="2">Year 2</option>
                  <option value="3">Year 3</option>
                </select>
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
                  placeholder="Short description of your subject"
                  required
                />
              </label>
            </div>
          </div>
          <button
            className="w3-button w3-padding w3-row-padding w3-text-white w3-margin w3-hover-khaki w3-round-xxlarge"
            type="submit"
            style={{ background: "#5e403f" }}
          >
            Create Subject
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubjectModal;
