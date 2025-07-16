import React from "react";

export const AssignmentItem = (assignments) => {
  return (
    <>
      {assignments.map((assignment) => (
        <div key={assignment.id} className="w3-card w3-round-xlarge w3-center">
          <h4>Title: {assignment.title}</h4>
          <h5>Subject: {assignment.Subject?.name}</h5>
        </div>
      ))}
    </>
  );
};

export const AwardItem = (awards) => {
  return (
    <>
      {awards.map((award) => (
        <div key={award.id} className="w3-card w3-round-xlarge w3-center">
          <h4>Awarded Badge: {award.badge}</h4>
          <div className="w3-padding">
            <p>
              Giver: {award.giver} <br />
              Recipient: {award.recipient} <br />
              Group Number: {award.groupNumber} <br />
              Assignment Title: {award.assignmentTitle} <br />
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export const EvaluationItem = (evaluations) => {
  return (
    <>
      {evaluations.map((evaluation) => (
        <div key={evaluation.id} className="w3-card w3-round-xlarge  w3-center">
          <h4>Assignment: {evaluation.assignment}</h4>
          <div className="w3-padding">
            <p>
              Evaluator: {evaluation.evaluator} <br />
              Evaluated: {evaluation.evaluated} <br />
              Group Number: {evaluation.groupNumber} <br />
              Created At: {evaluation.createdAt} <br />
              {evaluation.updatedAt && (
                <>
                  Updated At: {evaluation.updatedAt} <br />
                </>
              )}
              Is Final: {evaluation.isFinal ? "Yes" : "No"} <br />
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
