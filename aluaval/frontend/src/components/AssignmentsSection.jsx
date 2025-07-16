import React from "react";

const AssignmentsSection = ({
  subjects,
  selectedSubject,
  assignments,
  selectedAssignment,
  onSelectAssignment,
  onBack,
}) => (
  <div className="w3-card-4 w3-margin w3-round-large">
    <div className="w3-container w3-text-brown w3-round-large">
      <h2>
        <i>Subject:</i> <b>{subjects[selectedSubject - 1].name}</b> -
        Assignments
      </h2>
    </div>
    <div className="w3-container w3-padding">
      {assignments.map((assignment) => (
        <button
          key={assignment.id}
          className="w3-button w3-margin-bottom w3-margin-right w3-round-xlarge w3-text-white w3-hover-khaki"
          style={{ background: "#5e403f" }}
          onClick={() => onSelectAssignment(assignment.id)}
        >
          <i>{assignment.title}</i> <br /> Creation Date: {assignment.creationDate}{" "}
          <br /> Due Date: {assignment.dueDate}
        </button>
      ))}
      <br />
      <button
        className="w3-button w3-card w3-margin-bottom w3-margin-right w3-hover-pale-yellow w3-round-large"
        style={{ background: "#e4d3a4" }}
        onClick={onBack}
      >
        Back to{" "}
        <b>
          <i>Subjects</i>{" "}
        </b>
      </button>
    </div>
  </div>
);

export default AssignmentsSection;
