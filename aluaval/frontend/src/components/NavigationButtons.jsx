import React from "react";

const Navigation = ({
  handlePrevious,
  handleNext,
  getButtonText,
  currentQuestion,
  handleSubmit,
  questions,
}) => {
  return (
    <div className="w3-bar w3-margin-top">
      <button
        className="w3-button w3-left w3-blue w3-margin-right w3-round-xxlarge"
        onClick={handlePrevious}
        disabled={currentQuestion === 0}
      >
        Previous
      </button>
      {currentQuestion < questions.length - 1 ? (
        <button
          className="w3-button w3-right w3-blue w3-round-xxlarge"
          onClick={handleNext}
        >
          {getButtonText()}
        </button>
      ) : (
        <button
          className="w3-button w3-right w3-green w3-round-xxlarge"
          onClick={handleSubmit}
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default Navigation;
