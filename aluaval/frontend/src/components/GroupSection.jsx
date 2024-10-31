import React, { useEffect, useState } from "react";
import { fetchDynamicRoute } from "../services/dataFetch.js";

const isDateThisWeek = (date) => {
  const today = new Date();
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay())); // Sunday
  const endOfWeek = new Date(today.setDate(startOfWeek.getDate() + 6)); // Saturday
  return date >= startOfWeek && date <= endOfWeek;
};

const GroupSection = ({
  subjects,
  assignments,
  selectedSubject,
  selectedAssignment,
  students,
  onBack,
  currentUser,
  onCheckBadges,
  onAwardStudent,
  onCheckEvalHistory,
  onEvalMember,
}) => {
  const [evaluatedStatus, setEvaluatedStatus] = useState({});

  useEffect(() => {
    const fetchEvaluatedStatus = async () => {
      const statusMap = {};
      try {
        await Promise.all(
          students.map(async (student) => {
            const studentid = student.id;
            const evaluated = await fetchDynamicRoute("student", [
              studentid,
              selectedAssignment,
            ]);
            statusMap[student.id] = evaluated;
          })
        );
      } catch (error) {
        console.error("Error fetching evaluated status:", error);
      }
      setEvaluatedStatus(statusMap);
    };

    fetchEvaluatedStatus();
  }, [students, selectedAssignment]);

  const dueDate = new Date(assignments[selectedAssignment - 1]?.dueDate);

  return (
    <div className="w3-card-4 w3-margin w3-animate-opacity w3-round-xxlarge">
      <div className="w3-container w3-blue w3-round-xxlarge">
        <h2>
          <b>
            {subjects[selectedSubject - 1].name} -{" "}
            {assignments[selectedAssignment - 1].title}
          </b>{" "}
          - Group {students[0]?.groupNumber}{" "}
          {/* Assuming all students belong to the same group */}
        </h2>
      </div>
      <div className="w3-container w3-padding">
        {students.map((student) => (
          <div key={student.id} className="w3-margin-bottom">
            <label className="w3-margin-left">{student.name}</label>
            <button
              className="w3-button w3-light-blue w3-round w3-margin-left"
              onClick={() => onAwardStudent(student.id)} // Award badge to the student
            >
              Award Badge
            </button>
            {!evaluatedStatus[student.id] && ( // Check if evaluation is not done
              <button
                className="w3-button w3-light-blue w3-round w3-margin-left"
                onClick={() => onEvalMember(student.id)} // Evaluate group members
              >
                {currentUser === student.id
                  ? "Self Evaluate"
                  : "Evaluate Member"}
                {isDateThisWeek(dueDate) && " (Final Evaluation)"}
                {/* Add "(Final Evaluation)" if due this week */}
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="w3-container">
        <button
          className="w3-button w3-light-blue w3-round"
          onClick={onCheckBadges} // Check badges for the group
        >
          Check Badges
        </button>
        <button
          className="w3-button w3-light-blue w3-round w3-margin-left"
          onClick={onCheckEvalHistory} // Check evaluation history for the group
        >
          Check Evaluation History
        </button>
      </div>
      <div className="w3-container w3-padding">
        <button
          className="w3-button w3-margin-left w3-light-blue w3-round"
          onClick={onBack} // Go back to assignments
        >
          Back to Assignments
        </button>
      </div>
    </div>
  );
};

export default GroupSection;
