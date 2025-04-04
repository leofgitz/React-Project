import React from "react";

const NameInput = ({ value, onChange }) => {
  return (
    <div className="w3-section">
      <label htmlFor="name">
        <i className="fa fa-user"></i> Name
      </label>
      <input
        type="text"
        className=" w3-input w3-border w3-margin-bottom w3-round"
        id="name"
        value={value}
        onChange={onChange}
        placeholder="Name"
        required
      />
    </div>
  );
};

export default NameInput;
