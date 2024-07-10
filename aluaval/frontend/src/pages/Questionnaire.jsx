import React, { useState, useEffect } from "react";
import {
  selfQuestions,
  peerQuestions,
  titles,
  possibleAnswers,
  commentHeaders,
} from "../constants/Questionnaire.js";
import { useNavigate, useParams } from "react-router-dom";
import Question from "../components/Question.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import Navigation from "../components/NavigationButtons.jsx";

const Questionnaire = () => {
  const { type } = useParams();
  const isPeer = type === "peer";
  const questions = isPeer ? peerQuestions : selfQuestions;
  const commentTitles = isPeer
    ? commentHeaders
    : Array(questions.length).fill("Additional comments:");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(questions.map(() => ""));
  const [comments, setComments] = useState(Array(questions.length).fill(""));
  const [slideDirection, setSlideDirection] = useState("");
  const [question7Answered, setQuestion7Answered] = useState(false);
  const [question8Answered, setQuestion8Answered] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentQuestion === 6 && type === "self") {
      setQuestion7Answered(!!comments[currentQuestion].trim());
    } else if (currentQuestion === 7 && type === "self") {
      setQuestion8Answered(!!comments[currentQuestion].trim());
    }
  }, [currentQuestion, comments, type]);

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

  const handleSubmit = () => {
    console.log("Submitted Answers: ", answers);
    console.log("Submitted Comments: ", comments);
    // API call or further processing
    navigate("/");
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

  const answeredCount =
    answeredQuestions.length +
    (question7Answered ? 1 : 0) +
    (question8Answered ? 1 : 0);

  const progress = (answeredCount / questions.length) * 100;

  return (
    <div className="question-card w3-display-middle">
      <div className={`question-container ${slideDirection}`}>
        <div className="w3-container w3-card-4 w3-padding w3-margin-top w3-display-middle w3-round-xlarge">
          <Question
            currentQuestion={currentQuestion}
            questions={questions}
            titles={titles}
            type={type}
            comments={comments}
            setComments={setComments}
            answers={answers}
            setAnswers={setAnswers}
            commentTitles={commentTitles}
            isSkippable={isSkippable}
            possibleAnswers={possibleAnswers}
            answeredQuestions={answeredQuestions}
            setAnsweredQuestions={setAnsweredQuestions}
          />
          <Navigation
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            getButtonText={getButtonText}
            currentQuestion={currentQuestion}
            handleSubmit={handleSubmit}
            questions={questions}
          />
          <ProgressBar progress={progress} />
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
