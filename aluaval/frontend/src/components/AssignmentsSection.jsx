import React from "react";

const AssignmentsSection = ({
  subjects,
  selectedSubject,
  assignments,
  selectedAssignment,
  onSelectAssignment,
  onBack,
}) => (
  <div className="w3-card-4 w3-margin w3-round-xxlarge w3-animate-opacity">
    <div className="w3-container w3-blue w3-round-xxlarge">
      <h2>
        <b>{subjects[selectedSubject - 1].name}</b> - Assignments
      </h2>
    </div>
    <div className="w3-container w3-padding">
      {assignments.map((assignment) => (
        <button
          key={assignment.id}
          className={`w3-button w3-margin-bottom w3-margin-right w3-round-xxlarge ${
            selectedAssignment === assignment.id ? "w3-green" : "w3-blue"
          }`}
          onClick={() => onSelectAssignment(assignment.id)}
        >
          {assignment.title} - {assignment.dueDate}
        </button>
      ))}
      <button
        className="w3-button w3-margin-bottom w3-margin-right w3-light-blue w3-round-xxlarge"
        onClick={onBack}
      >
        Back to Subjects
      </button>
    </div>
  </div>
);

export default AssignmentsSection;
