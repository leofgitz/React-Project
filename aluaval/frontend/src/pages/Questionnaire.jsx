import React, { useState, useEffect } from "react";
import {
  selfQuestions,
  peerQuestions,
  titles,
  possibleAnswers,
  commentHeaders,
  answerKeys,
  commentKeys,
} from "../constants/Questionnaire.js";
import { useNavigate, useLocation } from "react-router-dom";
import Question from "../components/Question.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import Navigation from "../components/NavigationButtons.jsx";
import { useAuth } from "../context/authProvider.jsx";
import { getById, updateById, create } from "../services/dataFetch.js";

const Questionnaire = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const location = useLocation();
  const { student, group, isFinal } = location.state || {};

  useEffect(() => {
    if (!student || !group) {
      navigate("/");
    }
  }, [student, group, navigate]);

  const isPeer = student !== user.id;

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
  const [warning, setWarning] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  /* useEffect(() => {
    const fetchExistingAnswers = async () => {
      if (evaluation) {
        try {
          const existingData = await getById("evaluations", evaluation);
          setAnswers(existingData.answers);
          setComments(existingData.comments);
          setAnsweredQuestions(
            existingData.answers
              .map((answer, index) => (answer ? index : null))
              .filter((index) => index !== null)
          );
        } catch (error) {
          console.error("Error fetching existing answers:", error);
        }
      }
    };

    fetchExistingAnswers();
  }, [evaluation]); */

  useEffect(() => {
    if (currentQuestion === 6 && !isPeer) {
      setQuestion7Answered(!!comments[currentQuestion].trim());
    } else if (currentQuestion === 7 && !isPeer) {
      setQuestion8Answered(!!comments[currentQuestion].trim());
    }
  }, [currentQuestion, comments, isPeer]);

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      if (!isSkippable(currentQuestion) && answers[currentQuestion] === "") {
        setWarning("Please select an answer before proceeding.");
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

  const handleCancelClick = () => {
    setShowConfirm(true); // Show the confirmation dialog
  };

  const handleConfirmCancel = () => {
    // User confirmed - navigate away
    navigate("/groups-page", {
      state: {
        returningFromEval: true,
        previousState: location.state,
      },
    });
  };

  const handleCloseConfirm = () => {
    // User canceled the confirmation dialog
    setShowConfirm(false);
  };

  const handleSubmit = async () => {
    const evaluationData = {
      group: group,
      evaluator: user.id,
      evaluated: student,
      answers,
      comments,
      isFinal,
    };

    try {
      /* if (evaluation) {
        await updateById("evaluations", evaluation, evaluationData);
      } else { */
      await create("evaluations", evaluationData);
      /* } */
      navigate("/groups-page", {
        state: {
          returningFromEval: true,
          previousState: location.state,
        },
      });
    } catch (err) {
      console.error("Error submitting evaluation:", err);
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

  const answeredCount =
    answeredQuestions.length +
    (question7Answered ? 1 : 0) +
    (question8Answered ? 1 : 0);

  const progress = (answeredCount / questions.length) * 100;

  return (
    <div className="question-card w3-display-middle">
      <div className={`question-container ${slideDirection}`}>
        <div className="w3-container w3-card-4 w3-padding w3-margin-top w3-display-middle w3-round-xlarge">
          <h3 className="w3-center">
            {isPeer ? "Peer Evaluation" : "Self-Evaluation"}{" "}
            {isFinal && " - Final Evaluation"}
          </h3>

          <Question
            currentQuestion={currentQuestion}
            questions={questions}
            titles={titles}
            isPeer={isPeer}
            comments={comments}
            setComments={setComments}
            answers={answers}
            setAnswers={setAnswers}
            commentTitles={commentTitles}
            isSkippable={isSkippable}
            possibleAnswers={possibleAnswers}
            answeredQuestions={answeredQuestions}
            setAnsweredQuestions={setAnsweredQuestions}
            onCancelClick={handleCancelClick} // pass down cancel click handler
            showConfirm={showConfirm} // pass down showConfirm state
            onConfirmCancel={handleConfirmCancel} // pass down confirm action
            onCloseConfirm={handleCloseConfirm} // pass down cancel/close dialog
          />
          {warning && (
            <div
              className="w3-modal w3-round-xlarge w3-animate-opacity"
              style={{ display: "block", backgroundColor: "rgba(0,0,0,0.3)" }}
              onClick={() => setWarning("")}
            >
              <div
                className="w3-card-4 w3-pale-red w3-border-red w3-round-xxlarge w3-padding"
                style={{ maxWidth: "350px", margin: "15% auto" }}
                onClick={(e) => e.stopPropagation()}
              >
                <p className="w3-center w3-large">{warning}</p>
                <div className="w3-center">
                  <button
                    className="w3-small w3-border w3-border-red w3-hover-pale-red w3-button w3-red w3-round-xxlarge"
                    onClick={() => setWarning("")}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
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
