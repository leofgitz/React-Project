import React, { useState, useEffect } from "react";
import { getById, fetchDynamicRoute } from "../services/dataFetch.js";
import { useAuth } from "../context/authProvider.jsx";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  

  /* const colleagues = [
    { name: "You", evaluationType: "Self-Evaluation" },
    { name: "John Doe", evaluationType: "Weekly Evaluation" },
    { name: "Jane Smith", evaluationType: "Weekly Evaluation" },
  ];

  const evaluationHistory = [
    { name: "John Doe", score: 4, date: "2023-07-01" },
    { name: "Jane Smith", score: 5, date: "2023-07-01" },
    { name: "Bob Johnson", score: 3, date: "2023-07-01" },
  ];

  const assignments = [
    {
      id: "assignment1",
      title: "Project 1 - Due: 2023-07-15",
      colleagues: ["John Doe", "Jane Smith"],
    },
    {
      id: "assignment2",
      title: "Assignment 2 - Due: 2023-07-20",
      colleagues: ["John Doe"],
    },
    {
      id: "assignment3",
      title: "Group Work - Due: 2023-07-25",
      colleagues: ["Jane Smith"],
    },
  ]; */

  const { user } = useAuth();
  const role = user.role;
  const name = user.name;
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [groups, setGroups] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  let params, data;
  const navigate = useNavigate();

  useEffect(() => {
    const placeholder = "placeholder";
  });

  switch (role) {
    case "Teacher":
      //Fetch Classes by teacher
      params = ["teacher", user.id];
      data = fetchDynamicRoute("classes", params);
      setClasses(data);
      break;
    case "Admin":
      //TBA
      break;
    case "Student":
      //TBA
      break;
    //case "Guest"
    default:
      //TBA
      break;
  }

  const handleAssignmentClick = (assignment) => {
    setSelectedAssignment(assignment);
  };

  const handleEvaluateMember = (member) => {};

  return (
    <div className="main-content">
      <div className="w3-container w3-margin-top">
        <h2>Dashboard</h2>
        <div className="w3-card w3-light-grey w3-padding w3-margin-bottom">
          <div className="w3-container">
            <h3>Welcome, {name}!</h3>
            <p>
              Welcome to your dashboard. Here you can manage evaluations, view
              history, and check assignments.
            </p>
          </div>
        </div>

        <div className="grid-container">
          <div className="w3-card w3-light-grey w3-padding w3-margin-bottom">
            <div className="w3-container">
              <h3>Assignments</h3>
              <ul>
                {assignments.map((assignment) => (
                  <button
                    key={assignment.id}
                    className="w3-button w3-block w3-white w3-border w3-margin-bottom w3-center"
                    onClick={() => handleAssignmentClick(assignment)}
                  >
                    {assignment.title}
                  </button>
                ))}
              </ul>
            </div>
          </div>

          <div className="w3-card w3-light-grey w3-padding w3-margin-bottom">
            <div className="w3-container">
              <h3>Colleagues in Assignment</h3>
              <ul>
                <li>
                  You{" "}
                  <button className="w3-button w3-blue w3-small w3-margin-left">
                    Self-Evaluation
                  </button>
                </li>
                {selectedAssignment &&
                  selectedAssignment.colleagues.map((colleague) => (
                    <li key={colleague}>
                      {colleague}{" "}
                      <button className="w3-button w3-blue w3-small w3-margin-left">
                        Weekly Evaluation
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="w3-card w3-light-grey w3-padding w3-margin-top w3-margin-bottom">
          <div className="w3-container">
            <h3>Evaluation History</h3>
            <ul>
              {evaluationHistory.map((history, index) => (
                <li key={index}>
                  {history.name} - Score: {history.score} - {history.date}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
