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

function isPastFinalWeek(dueDate) {
  const due = new Date(dueDate);
  // Find Monday of due date's week
  const weekStart = new Date(due);
  weekStart.setDate(due.getDate() - ((due.getDay() + 6) % 7));
  weekStart.setHours(0, 0, 0, 0);

  // Find Sunday of due date's week
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  weekEnd.setHours(23, 59, 59, 999);

  const now = new Date();

  return now > weekEnd; // true only after the entire final week is over
}

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

  const renderEvaluationStatus = (studentId) => {
    const status = evaluatedStatus[studentId];
    if (!status) return null;

    const { finalmissed: finalMissed, complete } = status;
    const pastFinal = isPastFinalWeek(dueDate);

    if (pastFinal) {
      // After final week ended
      if (finalMissed === 0 || finalMissed === 2) {
        // Final evaluation was done on time or late during final week
        return (
          <button
            className="w3-button w3-hover-brown w3-text-white w3-round-xlarge w3-margin-left"
            style={{ background: "#5e403f", cursor: "default" }}
          >
            Final Evaluation Done!
          </button>
        );
      }
      if (finalMissed === 1) {
        // Missed final evaluation entirely
        return (
          <button
            className="w3-button w3-red w3-hover-red w3-border w3-hover-border-red w3-text-white w3-round-xlarge w3-margin-left"
            style={{ cursor: "default" }}
          >
            Final Evaluation Missed!
          </button>
        );
      }
      // If finalMissed === -1 (final week not started or ongoing), fall through to next block
    }

    // Before or during final week: show either Final or Weekly if evaluation complete this week
    if (complete) {
      const isFinalEvalDone = [0, 2].includes(finalMissed);
      return (
        <button
          className="w3-button w3-hover-brown w3-text-white w3-round-xlarge w3-margin-left"
          style={{ background: "#5e403f", cursor: "default" }}
        >
          {isFinalEvalDone ? "Final" : "Weekly"} Evaluation Done!
        </button>
      );
    }

    return null;
  };

  return (
    <div className="w3-card-4 w3-margin w3-round-large">
      <div className="w3-container w3-text-brown w3-round-large">
        <button
          className="w3-button w3-text-black w3-margin w3-right w3-card w3-round-large w3-hover-pale-yellow"
          onClick={onBack}
          style={{ background: "#e4d3a4" }}
        >
          <i class="fa fa-arrow-left" aria-hidden="true"></i> <b>Assignments</b>
        </button>
        <h2>
          <i>Subject:</i> <b>{subject.name}</b> - <i>Assignment:</i>{" "}
          <b>{assignment.title}</b> - Group {students[0]?.groupNumber}{" "}
          {/* Assuming all students belong to the same group */}
        </h2>
      </div>
      <div className="w3-container w3-margin-top w3-margin-left">
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
          Check Evaluation History
        </button>
      </div>
      <div className="w3-container w3-margin-left w3-margin-right w3-round-large">
        {students.map((student) => (
          <div
            key={student.id}
            className="w3-margin w3-card w3-border w3-border-black w3-padding w3-round-large"
          >
            <label>{student.name}</label>

            {currentUser !== student.id && !isPastFinalWeek(dueDate) && (
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

            {renderEvaluationStatus(student.id)}

            {/* <p style={{ color: evaluatedStatus[student.id]?.color }}>
              {evaluatedStatus[student.id]?.message}
            </p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupSection;
