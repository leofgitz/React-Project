import React from "react";

const SubmitButton = ({ text }) => {
  return (
    <button className="w3-button w3-block w3-orange w3-round-xxlarge w3-section w3-padding">
      {text}
    </button>
  );
};

export default SubmitButton;
