import React from "react";
import { useNavigate } from "react-router-dom";

const ConfirmationDialog = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel and go back?")) {
      navigate("/");
    }
  };

  return (
    <button
      className="w3-small w3-button w3-right w3-red w3-round-xxlarge"
      onClick={handleCancel}
    >
      Cancel
    </button>
  );
};

export default ConfirmationDialog;
