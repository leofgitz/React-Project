import React from "react";

const StudentsSection = ({
  subjects,
  selectedSubject,
  students,
  groupedStudents,
  selectedStudents,
  onSelectStudent,
  onCreateGroup,
  onBack,
}) => (
  <div className="w3-card-4 w3-margin w3-animate-opacity w3-round-xxlarge">
    <div className="w3-container w3-blue w3-round-xxlarge">
      <h2>
        <b>{subjects[selectedSubject - 1].name} - Assignments</b> - Students
      </h2>
    </div>
    <div className="w3-container w3-padding">
      {students.map((student) => {
        let groupNumber = null;
        for (const [groupNum, studentIds] of Object.entries(groupedStudents)) {
          if (studentIds.includes(student.id)) {
            groupNumber = parseInt(groupNum);
            break;
          }
        }
        return (
          <div key={student.id} className="w3-margin-bottom">
            {groupNumber ? (
              <span className="w3-tag w3-blue w3-round">{groupNumber}</span>
            ) : (
              <input
                className="w3-check"
                type="checkbox"
                checked={selectedStudents.includes(student.id)}
                onChange={() => onSelectStudent(student.id)}
                disabled={
                  !selectedStudents.includes(student.id) &&
                  selectedStudents.length >= 5
                }
              />
            )}
            <label className="w3-margin-left">{student.name}</label>
          </div>
        );
      })}
    </div>
    <div className="w3-container w3-padding">
      <button
        className="w3-button w3-blue w3-round"
        onClick={onCreateGroup}
        disabled={selectedStudents.length === 0}
      >
        Create Group
      </button>
      <button
        className="w3-button w3-margin-left w3-light-blue w3-round"
        onClick={onBack}
      >
        Back to Assignments
      </button>
    </div>
    <div className="w3-container w3-padding">
      <p>Selected students: {selectedStudents.length}</p>
    </div>
  </div>
);

export default StudentsSection;
