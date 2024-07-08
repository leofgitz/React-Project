import React from "react";

const PasswordInput = ({ value, onChange }) => {
  return (
    <div className="w3-section">
      <input
        type="password"
        className="w3-input w3-border w3-round"
        id="password"
        value={value}
        onChange={onChange}
        placeholder="Password"
        required
      />
    </div>
  );
};

export default PasswordInput;
