import React, { useState, useEffect } from "react";
import {
  selfQuestions,
  peerQuestions,
  titles,
  possibleAnswers,
  commentHeaders,
} from "../components/Questionnaire.js";
import { useNavigate } from "react-router-dom";

const Questionnaire = ({ evaluationType }) => {
  const isPeer = evaluationType === "peer";
  const questions = isPeer ? peerQuestions : selfQuestions;
  const commentTitles = isPeer
    ? commentHeaders
    : Array(questions.length).fill("Additional comments:");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(questions.map(() => ""));
  const [comments, setComments] = useState(Array(questions.length).fill(""));
  const [slideDirection, setSlideDirection] = useState("");
  const [question7Answered, setQuestion7Answered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentQuestion === 6 && evaluationType === "self") {
      setQuestion7Answered(!!comments[currentQuestion].trim());
    } else {
      setQuestion7Answered(false);
    }
  }, [currentQuestion, comments, evaluationType]);

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      if (!isSkippable(currentQuestion) && answers[currentQuestion] === "") {
        alert("Please select an answer before proceeding.");
        return;
      }

      setSlideDirection("slide-right");
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setSlideDirection("");
      }, 300);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setSlideDirection("slide-left");
      setTimeout(() => {
        setCurrentQuestion(currentQuestion - 1);
        setSlideDirection("");
      }, 300);
    }
  };

  const handleRadioChange = (e) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = e.target.value;
    setAnswers(updatedAnswers);
  };

  const handleCommentChange = (e) => {
    const updatedComments = [...comments];
    updatedComments[currentQuestion] = e.target.value;
    setComments(updatedComments);

    if (currentQuestion === 6 && evaluationType === "self") {
      setQuestion7Answered(!!e.target.value.trim());
    }
  };

  const handleSubmit = () => {
    console.log("Submitted Answers: ", answers);
    console.log("Submitted Comments: ", comments);
    // API call or further processing
    navigate("/");
  };

  const getTitle = (index) => {
    if (isPeer) {
      return titles[index];
    } else {
      return titles[index >= 6 ? index + 1 : index];
    }
  };

  const isSkippable = (index) => {
    return !isPeer && (index === 6 || index === 7);
  };

  const getButtonText = () => {
    if (isPeer) {
      return "Next";
    } else {
      if (currentQuestion === 6) {
        return question7Answered ? "Next" : "Skip";
      } else {
        return "Next";
      }
    }
  };

  return (
    <div className="question-card">
      <div className={`question-container ${slideDirection}`}>
        <div className="w3-container w3-card-4 w3-padding w3-margin-top w3-display-middle w3-round-xlarge">
          <h2>
            Question {currentQuestion + 1} of {questions.length}
            <span style={{ color: "red" }}>*</span>{" "}
          </h2>
          <div>
            <h3>{getTitle(currentQuestion)}</h3>
            <p>{questions[currentQuestion]}</p>

            {currentQuestion >= 6 && evaluationType === "self" ? (
              <>
                <textarea
                  className="w3-input w3-border w3-margin-top"
                  placeholder="Type your answer here"
                  value={comments[currentQuestion]}
                  onChange={handleCommentChange}
                />
              </>
            ) : (
              possibleAnswers[currentQuestion].map((option, index) => (
                <p key={index}>
                  <input
                    className="w3-radio"
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={index + 1}
                    checked={
                      parseInt(answers[currentQuestion], 10) === index + 1
                    }
                    onChange={handleRadioChange}
                  />
                  <label className="w3-margin-left">{option}</label>
                </p>
              ))
            )}

            {evaluationType === "self" && currentQuestion >= 6 ? null : (
              <div>
                <h4>{commentTitles[currentQuestion]}</h4>
                <textarea
                  className="w3-input w3-border w3-margin-top"
                  placeholder="Additional comments (optional)"
                  value={comments[currentQuestion]}
                  onChange={handleCommentChange}
                />
              </div>
            )}
            
          </div>
          <div className="w3-bar w3-margin-top">
            <button
              className="w3-button w3-left w3-blue w3-margin-right"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </button>
            {currentQuestion < questions.length - 1 ? (
              <button
                className="w3-button w3-right w3-blue"
                onClick={handleNext}
              >
                {getButtonText()}
              </button>
            ) : (
              <button
                className="w3-button w3-right w3-green"
                onClick={handleSubmit}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
