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
    <div className="w3-card-4 w3-margin w3-round-large">
      <div className="w3-container w3-text-brown w3-round-large">
        <h2>
          <i>Subject:</i> <b>{subjects[selectedSubject - 1].name} </b> -{" "}
          <i>Assignment:</i> <b>{assignments[selectedAssignment - 1].title}</b>{" "}
          - Groups
        </h2>
      </div>
      <div className="w3-container">
        <div className="w3-padding">
          {/* First render Ungrouped students (if any) */}
          {groupedByID["Ungrouped"] && (
            <div className="w3-card-4 w3-margin-top w3-margin-bottom w3-padding w3-round-large">
              <p>Selected students: {selectedStudents.length}</p>
              <h3 className="w3-container w3-center w3-sand w3-round-large">
                <b>Ungrouped Students</b>
              </h3>
              <div className="w3-row">
                {groupedByID["Ungrouped"].students.map((student) => (
                  <div
                    key={student.id}
                    className="w3-col s12 m4 l2 w3-padding-small"
                  >
                    <div className="w3-card w3-padding w3-round-large ">
                      <input
                        className="w3-check"
                        type="checkbox"
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => onSelectStudent(student.id)}
                      />
                      <label> {student.name}</label>
                    </div>
                  </div>
                ))}
              </div>
              {selectedStudents.length > 0 && (
                <div className="w3-margin-top">
                  <button
                    className="w3-button w3-olive w3-round-xxlarge w3-round w3-animate-zoom"
                    onClick={onCreateGroup}
                  >
                    Create Group {lastNumber + 1}
                  </button>
                  <button
                    className="w3-button w3-margin-left w3-olive w3-round-xxlarge w3-round w3-animate-zoom"
                    onClick
                  >
                    Add to Existing Group
                  </button>
                  <br />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Now render real groups in a grid */}
        <div className="w3-row">
          {Object.entries(groupedByID)
            .filter(([groupId]) => groupId !== "Ungrouped") // Skip Ungrouped
            .map(([groupId, { groupNumber, students }]) => (
              <div
                key={groupId}
                className="w3-col s12 m6 l4 w3-padding w3-responsive"
              >
                <div className="w3-card-4 w3-margin-bottom w3-padding w3-round-large">
                  <h3 className="w3-container w3-center w3-sand w3-round-large">
                    <b>Group {groupNumber}</b>
                  </h3>
                  <div className="w3-row w3-center">
                    {students.map((student) => (
                      <div key={student.id} className="w3-col s12">
                        <label>{student.name}</label>
                      </div>
                    ))}
                  </div>
                  <div
                    className="w3-padding w3-center "
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      className="w3-button w3-hover-khaki w3-text-white w3-round-xlarge"
                      style={{ background: "#5e403f" }}
                      onClick={() => onCheckBadges(groupId)}
                    >
                      Badges
                    </button>
                    <button
                      className="w3-button w3-hover-khaki w3-text-white w3-round-xlarge"
                      style={{ background: "#5e403f" }}
                      onClick={() => onCheckEvalHistory(groupId)}
                    >
                      Evaluation History
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="w3-padding">
          <button
            className="w3-button w3-margin-bottom w3-card w3-round-large w3-hover-pale-yellow w3-round"
            onClick={onBack}
            style={{ background: "#e4d3a4" }}
          >
            Back to{" "}
            <b>
              <i>Assignments</i>
            </b>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentsSection;
