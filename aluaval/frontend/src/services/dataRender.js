import React from "react";

export const AssignmentItem = (assignments) => {
  return (
    <>
      {assignments.map((assignment) => (
        <div key={assignment.id} className="w3-card w3-padding">
          <h4>
            {assignment.title} - Subject: {assignment.subject.name}
          </h4>
          <div key={assignment.Groups.id} className="w3-padding">
            <p>
              Group Number: {assignment.Groups[0].number} <br />
              Due Date: {assignment.duedate} <br />
              {assignment.Groups[0].submissionDate && (
                <>Submission Date: {assignment.Groups[0].submissionDate} </>
              )}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export const AwardItem = ({ awards }) => {
  return (
    <>
      {awards.map((award) => (
        <div key={award.id} className="w3-card w3-padding">
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
        <div key={evaluation.id} className="w3-card w3-padding">
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
