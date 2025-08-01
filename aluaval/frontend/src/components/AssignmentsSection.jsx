import React, { useEffect, useState } from "react";
import { getById } from "../services/dataFetch";
import { useAuth } from "../context/authProvider";

const AssignmentsSection = ({
  subjects,
  selectedSubject,
  assignments,
  selectedAssignment,
  onSelectAssignment,
  onBack,
  onCreateAssignment,
}) => {
  const [subject, setSubject] = useState([]);

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const subjectData = await getById("subjects", selectedSubject);
        setSubject(subjectData);
      } catch (err) {
        console.error("Error fetching data: ", err);
      }
    };

    fetchSubject();
  }, [selectedSubject]);
  const { user } = useAuth();
  const role = user.role;

  return (
    <div className="w3-card-4 w3-margin w3-round-large">
      <div className="w3-container w3-text-brown w3-round-large">
        <button
          className="w3-button w3-margin w3-text-black w3-right w3-card w3-hover-pale-yellow w3-round-large"
          style={{ background: "#e4d3a4" }}
          onClick={onBack}
        >
          <i class="fa fa-arrow-left" aria-hidden="true"></i> <b>Subjects</b>
        </button>
        <h2>
          Dashboard - <b>Assignments</b>
        </h2>

        <h3>
          Subject: <b>{subject.name}</b>
        </h3>
      </div>
      <div className="w3-container w3-padding">
        {assignments.map((assignment) => (
          <button
            key={assignment.id}
            className="w3-button w3-border w3-border-black w3-margin-right w3-round-xlarge w3-text-white w3-hover-khaki"
            style={{ background: "#5e403f" }}
            onClick={() => onSelectAssignment(assignment.id)}
          >
            <b>
              <>{assignment.title}</>
            </b>{" "}
            <br /> Creation Date: {assignment.creationDate} <br /> Due Date:{" "}
            {assignment.dueDate}
          </button>
        ))}
        {assignments.length === 0 && (
          <div className="w3-center">
            <p>
              {role === "Student" &&
                "Your teacher hasn't added you to an assignment yet."}
            </p>
          </div>
        )}
        {onCreateAssignment && (
          <button
            className={`w3-button ${
              assignments.length === 0 && "w3-margin-bottom"
            } w3-round-xxlarge w3-olive w3-border w3-border-black w3-hover-pale-green w3-hover-border-green`}
            onClick={onCreateAssignment}
          >
            Create New Assignment
          </button>
        )}
        <br />
      </div>
    </div>
  );
};

export default AssignmentsSection;
