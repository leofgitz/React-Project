import React from "react";

const PasswordInput = ({ value, onChange }) => {
  return (
    <div className="w3-section">
      <label htmlFor="password" className="w3-text-red">
        <i className="fa fa-lock"></i> Password
      </label>
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
