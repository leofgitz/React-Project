// ProgressBar.jsx
import React from "react";

const ProgressBar = ({ progress }) => {
  return (
    <div className="w3-light-grey w3-round-xlarge w3-margin-top">
      <div
        className="w3-container w3-center w3-blue w3-round-xlarge"
        style={{ width: `${progress}%` }}
      >
        {`${Math.round(progress)}%`}
      </div>
    </div>
  );
};

export default ProgressBar;
