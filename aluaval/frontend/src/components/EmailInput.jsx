import React from "react";

const EmailInput = ({ value, onChange }) => {
  return (
    <div className="w3-section">
      <input
        type="email"
        className="w3-input w3-border w3-margin-bottom w3-round"
        id="email"
        value={value}
        onChange={onChange}
        placeholder="Email"
        required
      />
    </div>
  );
};

export default EmailInput;
