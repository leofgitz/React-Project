import React from "react";

const SubmitButton = ({ text }) => {
  return (
    <button className="w3-button w3-block w3-text-white w3-hover-khaki w3-round-xxlarge w3-section w3-padding" style={{ background: "#5e403f" }}>
      {text}
    </button>
  );
};

export default SubmitButton;
