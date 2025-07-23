import React from "react";

const EnrollmentSection = ({
  enrolledStudents,
  selectedStudents,
  availableStudents,
  studentSearch,
  onSelectStudent,
  onEnrollStudents,
  onStudentSearch,
  availableCourses,
  selectedCourse,
  createdSubjects,
  selectedSubject,
  onBack,
}) => {
  return (
    <div className="w3-card-4 w3-margin w3-round-large">
      <div className="w3-container w3-text-brown w3-round-large">
        <button
          className="w3-button w3-margin w3-text-black w3-right w3-card w3-round-large w3-hover-pale-yellow"
          style={{ background: "#e4d3a4" }}
          onClick={onBack}
        >
          <i className="fa fa-arrow-left" aria-hidden="true"></i>{" "}
          <b>Subjects</b>
        </button>
        <h2>
          Subject Creation - <b>Enrollment</b>
        </h2>
        <h3>
          Course: <b>{availableCourses[selectedCourse].name}</b>
        </h3>
        <h3>
          Subject: <b>{createdSubjects[selectedSubject].name}</b>
        </h3>
      </div>

      {/* Two-column layout */}
      <div className="w3-row-padding w3-padding">
        {/* Enrolled Students - LEFT */}
        <div className="w3-half w3-container">
          <h4>
            Enrolled Students: <b>{enrolledStudents.length}</b>
          </h4>
          <div
            className="w3-border w3-round-large w3-padding-small"
            style={{ maxHeight: "300px", overflowY: "auto" }}
          >
            {enrolledStudents.length === 0 ? (
              <p className="w3-text-grey">No students enrolled yet.</p>
            ) : (
              enrolledStudents.map((student) => (
                <div
                  key={student.id}
                  className="w3-padding-small w3-border-bottom"
                >
                  {student.name}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Available Students - RIGHT */}
        <div className="w3-half w3-container">
          <h4>Select students to enroll: </h4>

          <input
            className="w3-input w3-border w3-round-large w3-margin-bottom"
            type="text"
            placeholder="Search students..."
            value={studentSearch}
            onChange={(e) => onStudentSearch(e.target.value)}
          />

          <div
            className="w3-border w3-round-large w3-padding-small"
            style={{ maxHeight: "240px", overflowY: "auto" }}
          >
            {availableStudents.length === 0 ? (
              <p className="w3-text-grey">No available students.</p>
            ) : (
              availableStudents.map((student) => (
                <label key={student.id} className="w3-block w3-padding-small">
                  <input
                    className="w3-check w3-margin-right"
                    type="checkbox"
                    checked={selectedStudents.includes(student.id)}
                    onChange={() => onSelectStudent(student.id)}
                  />
                  {student.name}
                </label>
              ))
            )}
          </div>

          <button
            className="w3-button w3-green w3-margin-top w3-round-large w3-hover-light-green w3-border"
            onClick={onEnrollStudents}
            disabled={selectedStudents.length === 0}
          >
            Enroll Selected
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentSection;
