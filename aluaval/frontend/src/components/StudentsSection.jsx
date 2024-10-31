import React from "react";

const StudentsSection = ({
  subjects,
  assignments,
  selectedSubject,
  selectedAssignment,
  students,
  lastNumber,
  selectedStudents,
  onSelectStudent,
  onCreateGroup,
  onBack,
  onCheckBadges,
  onCheckEvalHistory,
}) => {
  // Group students by their group ID
  const groupedByID = students.reduce((acc, student) => {
    const groupID = student.groupID || "Ungrouped"; // Use groupID from the controller
    if (!acc[groupID]) {
      acc[groupID] = {
        groupNumber: student.groupNumber || "Ungrouped",
        students: [],
      };
    }
    acc[groupID].students.push(student);
    return acc;
  }, {});

  return (
    <div className="w3-card-4 w3-margin w3-animate-opacity w3-round-xxlarge">
      <div className="w3-container w3-blue w3-round-xxlarge">
        <h2>
          <b>
            {subjects[selectedSubject - 1].name} -{" "}
            {assignments[selectedAssignment - 1].title}
          </b>{" "}
          - Students
        </h2>
      </div>
      <div className="w3-container w3-padding">
        {Object.entries(groupedByID).map(
          ([groupId, { groupNumber, students }]) => (
            <div
              key={groupId} // Use the unique group ID as the key
              className="w3-card-4 w3-margin-bottom w3-padding"
            >
              <div className="w3-container w3-blue w3-round-xxlarge">
                <h3>
                  {groupNumber === "Ungrouped"
                    ? "Ungrouped Students"
                    : `Group ${groupNumber}`}
                </h3>
              </div>
              <div className="w3-container">
                {students.map((student) => (
                  <div key={student.id} className="w3-margin-bottom">
                    {groupNumber === "Ungrouped" ? (
                      <input
                        className="w3-check"
                        type="checkbox"
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => onSelectStudent(student.id)}
                      />
                    ) : null}
                    <label className="w3-margin-left">{student.name}</label>
                  </div>
                ))}
              </div>
              <div className="w3-container">
                <button
                  className="w3-button w3-light-blue w3-round"
                  onClick={() => onCheckBadges(groupId)} // Call the function with groupId
                >
                  Check Badges
                </button>
                <button
                  className="w3-button w3-light-blue w3-round w3-margin-left"
                  onClick={() => onCheckEvalHistory(groupId)} // Call the function with groupId
                >
                  Check Evaluation History
                </button>
              </div>
            </div>
          )
        )}
      </div>
      <div className="w3-container w3-padding">
        <button
          className="w3-button w3-blue w3-round"
          onClick={onCreateGroup}
          disabled={selectedStudents.length === 0}
        >
          Create Group {lastNumber + 1}
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
};

export default StudentsSection;
