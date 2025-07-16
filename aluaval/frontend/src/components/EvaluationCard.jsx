import React from "react";
import { titles, possibleAnswers } from "../constants/Questionnaire.js";

const EvaluationCard = ({ evaluation }) => {
  const isSelfEvaluation = evaluation.evaluator === evaluation.evaluated;

  // Filter titles based on evaluation type
  const filteredTitles = isSelfEvaluation
    ? [...titles.slice(0, 6), titles[7], titles[8]] // self-evaluation titles
    : titles.slice(0, 7); // peer evaluation titles

  // Answer section
  const answerSection = (
    <div className="w3-row w3-row-padding">
      {evaluation.answers.map((answer, idx) => (
        <div key={idx} className="w3-col s12 m6 l3 w3-margin-bottom">
          <div
            className="w3-card w3-padding w3-hover-pale-yellow"
            style={{
              background: "#fffef3",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              height: "100%",
              textAlign: "center",
              borderRadius: "8px",
              overflow: "hidden",
              paddingTop: "16px",
            }}
            title={`${filteredTitles[idx]} – Score ${answer}: ${
              possibleAnswers[idx][answer - 1]
            }`}
          >
            {/* Title */}
            <strong className="w3-small w3-text-brown">
              {filteredTitles[idx]}
            </strong>

            {/* Answer meaning */}
            <span className="w3-small" style={{ fontSize: "0.85em" }}>
              ({answer}) {possibleAnswers[idx][answer - 1]}
            </span>

            {/* Optional comment */}
            {evaluation.comments[idx] && (
              <p className="w3-small w3-text-gray" style={{ marginTop: "4px" }}>
                <i>“{evaluation.comments[idx]}”</i>
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w3-card w3-padding w3-margin w3-round-xxlarge w3-border w3-border-blue-gray">
      <header className="w3-container w3-center w3-round-xlarge w3-note w3-padding w3-border w3-border-blue-gray">
        <h4 className="w3-text-brown">
          {isSelfEvaluation ? (
            <>
              <b>{evaluation.evaluatorName}</b> self-evaluated
            </>
          ) : (
            <>
              <b>{evaluation.evaluatorName}</b> evaluated{" "}
              <b>{evaluation.evaluatedName}</b>
            </>
          )}
        </h4>
        <p className="w3-small">
          Completed on {new Date(evaluation.createdAt).toLocaleString()}
        </p>
        <p className="w3-small">
          Type: {evaluation.isFinal ? "Final Evaluation" : "Weekly Evaluation"}
        </p>
        <p className="w3-small">
          Average Score: {evaluation.averageScore.toFixed(2)}
        </p>
      </header>
      <section className="w3-container w3-padding">
        <h3 className="w3-text-brown">
          {" "}
          <b>Answers</b>
        </h3>
        {answerSection}
      </section>
    </div>
  );
};

export default EvaluationCard;
