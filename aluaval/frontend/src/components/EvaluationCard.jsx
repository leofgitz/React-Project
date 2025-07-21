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
      {filteredTitles.map((title, idx) => {
        const hasScore = evaluation.answers[idx] !== undefined;
        const score = evaluation.answers[idx];
        const comment = evaluation.comments[idx];

        return (
          <div key={idx} className="w3-col s12 m6 l3 w3-margin-bottom">
            <div
              className="w3-card w3-border w3-border-brown w3-padding w3-hover-pale-yellow w3-round-xlarge"
              style={{
                background: "#fffef3",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between", // use space-between to help alignment
                gap: "6px",
                height: "150px", // optional: set a minimum height for visual consistency
                textAlign: "center",
                overflow: "hidden",
                padding: "16px 8px",
              }}
              title={
                hasScore
                  ? `${title} – Score ${score}: ${
                      possibleAnswers[idx][score - 1]
                    }`
                  : title
              }
            >
              {/* Title */}
              <strong className="w3-small w3-text-brown">{title}</strong>

              {/* Answer (if available) */}
              {hasScore && (
                <span className=" w3-small" style={{ fontSize: "0.85em" }}>
                  <b className="w3-tag w3-small w3-round w3-white w3-text-black w3-border w3-border-black">
                    {score}
                  </b>{" "}
                  <br /> {possibleAnswers[idx][score - 1]}
                </span>
              )}

              {/* Comment */}

              <p
                className="w3-small w3-text-gray"
                style={{ marginTop: "0px", textAlign: "center" }}
              >
                {comment ? (
                  <>
                    {" "}
                    Comment: <i> “{comment}”</i>{" "}
                  </>
                ) : (
                  "No comment"
                )}
              </p>
            </div>
          </div>
        );
      })}
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
          Completed on {new Date(evaluation.createdAt).toLocaleDateString()} at{" "}
          {new Date(evaluation.createdAt).toLocaleTimeString()}
        </p>
        <p className="w3-small">
          Type: {evaluation.isFinal ? "Final Evaluation" : "Weekly Evaluation"}
          {evaluation.isLate && (
            <span className="text-red-500"> - Submitted Late</span>
          )}
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
