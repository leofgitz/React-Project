import React from "react";
import { titles, possibleAnswers } from "../constants/Questionnaire.js";
import "w3-css/w3.css";

const EvaluationCard = ({ evaluation }) => {
  const isSelfEvaluation = evaluation.evaluator === evaluation.evaluated;

  // Filter titles based on evaluation type
  const filteredTitles = isSelfEvaluation
    ? [...titles.slice(0, 6), titles[7], titles[8]] // self-evaluation titles
    : titles.slice(0, 7); // peer evaluation titles

  // Answer section
  const answerSection = evaluation.answers.map((answer, idx) => (
    <div key={idx} className="w3-margin-bottom">
      <h3 className="w3-text-blue-gray w3-large">{filteredTitles[idx]}</h3>
      <p className="w3-text-blue-gray w3-large">
        {answer} - {possibleAnswers[idx][answer - 1]}
      </p>
      {evaluation.comments[idx] && (
        <p className="w3-text-blue-gray w3-large">
          Comment: {evaluation.comments[idx]}
        </p>
      )}
    </div>
  ));

  return (
    <div className="w3-card w3-padding w3-margin w3-round-large w3-border w3-border-blue-gray">
      <header className="w3-container w3-light-grey w3-padding">
        <h2 className="w3-text-indigo">
          {isSelfEvaluation
            ? `Evaluator/Evaluated: ${evaluation.evaluatorName}`
            : `Evaluator: ${evaluation.evaluatorName} | Evaluated: ${evaluation.evaluatedName}`}
        </h2>
        <p className="w3-small">
          {new Date(evaluation.createdAt).toLocaleString()}
        </p>
        <p className="w3-small w3-text-gray">
          {evaluation.isFinal ? "Final Evaluation" : "Weekly Evaluation"}
        </p>
        <p className="w3-small w3-text-gray">
          Average Score: {evaluation.averageScore.toFixed(2)}
        </p>
      </header>
      <section className="w3-container w3-padding">
        <h3 className="w3-text-teal">Scores</h3>
        {answerSection}
      </section>
    </div>
  );
};

export default EvaluationCard;
