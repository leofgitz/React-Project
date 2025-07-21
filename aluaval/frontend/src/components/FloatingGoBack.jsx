import { useLocation, useNavigate } from "react-router-dom";

const FloatingGoBackButton = ({ userRole }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoBack = () => {
    if (userRole == "Student") {
      navigate("/groups-page", {
        state: {
          returningFromHist: true,
          previousState: location.state,
        },
      });
    } else if (userRole == "Teacher") {
      navigate("/group-creation", {
        state: {
          returningFromHist: true,
          previousState: location.state,
        },
      });
    } else {
      navigate("/");
    }
  };

  return (
    <button
      className="w3-small w3-border w3-border-brown w3-button w3-brown w3-round-xxlarge w3-hover-khaki"
      onClick={handleGoBack}
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 1000,
      }}
    >
      Go Back
    </button>
  );
};

export default FloatingGoBackButton;
