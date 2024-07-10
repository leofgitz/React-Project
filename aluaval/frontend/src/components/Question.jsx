import React from "react";
import ConfirmationDialog from "./ConfirmationDialog.jsx";

const Question = ({
  currentQuestion,
  questions,
  titles,
  type,
  comments,
  answers,
  setComments,
  setAnswers,
  commentTitles,
  isSkippable,
  possibleAnswers,
  answeredQuestions,
  setAnsweredQuestions
}) => {
  const getTitle = (index) => {
    if (type === "peer") {
      return titles[index];
    } else {
      return titles[index >= 6 ? index + 1 : index];
    }
  };

  const handleRadioChange = (e) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = e.target.value;
    setAnswers(updatedAnswers);

    if (!answeredQuestions.includes(currentQuestion)) {
      setAnsweredQuestions([...answeredQuestions, currentQuestion]);
    }
  };

  const handleCommentChange = (e) => {
    const updatedComments = [...comments];
    updatedComments[currentQuestion] = e.target.value;
    setComments(updatedComments);
  };

  return (
    <>
      <h2>
        Question {currentQuestion + 1} of {questions.length}
        {!isSkippable(currentQuestion) ? (
          <span style={{ color: "red" }}>
            {" "}
            <small>*</small>{" "}
          </span>
        ) : null}
        <ConfirmationDialog />
      </h2>
      <div>
        <h3>{getTitle(currentQuestion)}</h3>
        <p>{questions[currentQuestion]}</p>

        {currentQuestion >= 6 && type === "self" ? (
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
                checked={parseInt(answers[currentQuestion], 10) === index + 1}
                onChange={handleRadioChange}
              />
              <label className="w3-margin-left">{option}</label>
            </p>
          ))
        )}

        {type === "self" && currentQuestion >= 6 ? null : (
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
    </>
  );
};

export default Question;
