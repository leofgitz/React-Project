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
import { useNavigate, useParams } from "react-router-dom";
import Question from "../components/Question.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import Navigation from "../components/NavigationButtons.jsx";
import { useAuth } from "../context/authProvider.jsx";
import { getById, updateById, create } from "../services/dataFetch.js";

const Questionnaire = () => {
  const { user } = useAuth();
  const { id, evaluation, group } = useParams();
  const isPeer = id !== user.id;
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
  }, [evaluation]);

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

  const handleSubmit = async () => {
    const evaluationData = {
      group: group,
      evaluator: user.id,
      evaluated: id,
    };

    const answerKeysToUse = isPeer ? answerKeys : answerKeys.slice(0, 6);
    const commentKeysToUse = isPeer
      ? commentKeys.slice(0, 6)
      : commentKeys.filter((key) => key !== "impressionComment");

    // Map through answerKeysToUse and commentKeysToUse to add answers and comments to evaluationData
    answerKeysToUse.forEach((key, index) => {
      evaluationData[key] = answers[index]; // Assuming answers is an array with corresponding scores
    });

    commentKeysToUse.forEach((key, index) => {
      evaluationData[key] = comments[index]; // Assuming comments is an array with corresponding comments
    });

    try {
      if (evaluation) {
        await updateById("evaluations", evaluation, evaluationData);
      } else {
        await create("evaluations", evaluationData);
      }
      navigate("/");
    } catch (err) {
      console.error("Error submitting evaluation:", error);
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
