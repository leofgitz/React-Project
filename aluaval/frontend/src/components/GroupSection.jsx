import { useEffect, useState } from "react";
import { fetchDynamicRoute, getById } from "../services/dataFetch.js";

const isDateThisWeek = (date) => {
  const today = new Date();
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay())); // Sunday
  const endOfWeek = new Date(today.setDate(startOfWeek.getDate() + 6)); // Saturday
  return date >= startOfWeek && date <= endOfWeek;
};

const isLate = (date) => {
  const today = new Date();
  return today > date;
};

const GroupSection = ({
  selectedSubject,
  selectedAssignment,
  students,
  group,
  onBack,
  currentUser,
  onCheckBadges,
  onAwardStudent,
  onCheckEvalHistory,
  onEvalMember,
}) => {
  const [evaluatedStatus, setEvaluatedStatus] = useState({});
  const [subject, setSubject] = useState([]);
  const [assignment, setAssignment] = useState([]);

  useEffect(() => {
    if (
      !Array.isArray(students) ||
      students.length === 0 ||
      !group ||
      !selectedAssignment
    ) {
      return;
    }

    if (!students || students.length === 0 || !group || !selectedAssignment)
      return;

    const fetchAll = async () => {
      try {
        const subjectData = await getById("subjects", selectedSubject);
        const assignmentData = await getById("assignments", selectedAssignment);

        const reqbody = { students, group, assignment: selectedAssignment };
        const evaluatedStatusData = await fetchDynamicRoute(
          "student",
          "evalcheck",
          "POST",
          reqbody
        );
        setSubject(subjectData);
        setAssignment(assignmentData);

        setEvaluatedStatus(evaluatedStatusData);
      } catch (error) {
        console.error("Error fetching evaluated status:", error);
      }
    };

    fetchAll();
  }, [students, group, selectedAssignment]);

  const dueDate = new Date(assignment.dueDate);

  return (
    <div className="w3-card-4 w3-margin w3-round-large">
      <div className="w3-container w3-text-brown w3-round-large">
        <h2>
          <i>Subject:</i> <b>{subject.name}</b> - <i>Assignment:</i>{" "}
          <b>{assignment.title}</b> - Group {students[0]?.groupNumber}{" "}
          {/* Assuming all students belong to the same group */}
        </h2>
      </div>
      <div className="w3-container w3-margin w3-round-large">
        {students.map((student) => (
          <div
            key={student.id}
            className="w3-margin w3-card w3-padding w3-round-large"
          >
            <label>{student.name}</label>

            {currentUser !== student.id && (
              <button
                className="w3-button w3-hover-khaki w3-text-white w3-round-xlarge w3-margin-left"
                style={{ background: "#5e403f" }}
                onClick={() => onAwardStudent(student.id)} // Award badge to the student
              >
                Award Badge
              </button>
            )}

            {((!evaluatedStatus[student.id]?.complete &&
              evaluatedStatus[student.id]?.finalmissed === -1) ||
              (!evaluatedStatus[student.id]?.complete &&
                evaluatedStatus[student.id]?.finalmissed === 1 &&
                isDateThisWeek(dueDate))) && (
              <button
                className="w3-button w3-hover-khaki w3-text-white w3-round-xlarge w3-margin-left"
                style={{ background: "#5e403f" }}
                onClick={() =>
                  onEvalMember(student.id, isDateThisWeek(dueDate))
                }
              >
                {currentUser === student.id
                  ? "Self Evaluate"
                  : "Evaluate Member"}
                {isDateThisWeek(dueDate) && " (Final)"}
                {isLate(dueDate) && " - OVERDUE"}
              </button>
            )}

            {evaluatedStatus[student.id]?.complete && (
              <button
                className="w3-button w3-hover-brown w3-text-white w3-round-xlarge w3-margin-left"
                style={{ background: "#5e403f" }}
              >
                {evaluatedStatus[student.id]?.finalmissed === 0
                  ? "Final "
                  : "Weekly "}{" "}
                Evaluation Done!
              </button>
            )}

            <p style={{ color: evaluatedStatus[student.id]?.color }}>
              {evaluatedStatus[student.id]?.message}
            </p>
          </div>
        ))}
      </div>
      <div className="w3-container w3-margin-left">
        <button
          className="w3-button w3-hover-khaki w3-text-white w3-round-xlarge"
          onClick={onCheckBadges}
          style={{ background: "#5e403f" }} // Check badges for the group
        >
          Check Group Badges
        </button>
        <button
          className="w3-button w3-hover-khaki w3-text-white w3-round-xlarge w3-margin-left"
          style={{ background: "#5e403f" }}
          onClick={() => onCheckEvalHistory(group)} // Check evaluation history for the group
        >
          Check Group Evaluation History
        </button>
      </div>
      <div className="w3-padding">
        <button
          className="w3-button w3-card w3-hover-pale-yellow w3-round-large"
          style={{ background: "#e4d3a4" }}
          onClick={onBack} // Go back to assignments
        >
          Back to{" "}
          <b>
            <i>Assignments</i>
          </b>
        </button>
      </div>
    </div>
  );
};

export default GroupSection;
