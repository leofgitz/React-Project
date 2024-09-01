import React from "react";

export const AssignmentItem = (assignments, role) => {
  return (
    <>
      {assignments.map((assignment) => (
        <button
          key={assignment.id}
          className="w3-button w3-block w3-white w3-border w3-margin-bottom w3-center"
        >
          Check {assignment.title}
        </button>
      ))}
    </>
  );
};

export const BadgeItem = (badges, role) => {
  return <></>;
};

export const EvaluationItem = (evaluations, role) => {
  return <></>;
};
