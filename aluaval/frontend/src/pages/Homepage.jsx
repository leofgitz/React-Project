import React, { useState, useEffect } from "react";
import { fetchDynamicRoute } from "../services/dataFetch.js";
import { useAuth } from "../context/authProvider.jsx";
import { useNavigate } from "react-router-dom";
import DataCard from "../components/DataCard.jsx";

const Homepage = () => {
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
  const [badges, setBadges] = useState([]);
  const [selectedAssignment, selectAssignment] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      let params, data;

      switch (role) {
        case "Teacher":
          params = ["teacher", user.id];
          data = fetchDynamicRoute("classes", params);
          setClasses(data);

          params = [user.id, "assignments"];
          data = fetchDynamicRoute("teacher", params);
          setAssignments(data);

          params = [user.id, "groups"];
          data = fetchDynamicRoute("teacher", params);
          setGroups(data);

          params = [user.id, "subjects"];
          data = fetchDynamicRoute("teacher", params);
          setSubjects(data);

          params = [user.id, "evaluations"];
          data = fetchDynamicRoute("teacher", params);
          setEvaluations(data);

          params = [user.id, "badges"];
          data = fetchDynamicRoute("teacher", params);
          setBadges(data);
          break;
        case "Student":
          params = [user.id, "assignments"];
          data = fetchDynamicRoute("student", params);
          setAssignments(data);

          params = [user.id, "groups"];
          data = fetchDynamicRoute("student", params);
          setGroups(data);

          params = [user.id, "courses"];
          data = fetchDynamicRoute("student", params);
          setCourses(data);

          params = [user.id, "evaluations"];
          data = fetchDynamicRoute("student", params);
          setEvaluations(data);

          params = [user.id, "badges"];
          data = fetchDynamicRoute("student", params);
          setBadges(data);
          break;
        case "Admin":
          //TBA
          break;
        //case "Guest"
        default:
          //TBA
          break;
      }
    };
    fetchData();
  }, [role, user.id]);

  const UserRoleMessage = () => {
    const roleMessages = {
      Admin:
        "Here you can check the most recent developments regarding the platform.",
      Teacher:
        "Here you can check the most recent developments regarding your classes and created assignments.",
      Student:
        "Here you can check the most recent developments regarding evaluations, assignments and badges!",
      Guest:
        "Here you can see what the platform is all about through demos and more!",
    };

    return (
      <p>
        {roleMessages[role] ||
          "Please sign in to enjoy the most of the platform!"}
      </p>
    );
  };

  const handleAssignmentClick = (assignment) => {
    selectAssignment(assignment);
  };

  return (
    <div className="main-content">
      <div className="w3-container w3-margin-top">
        <h2>Control Panel</h2>
        <div className="w3-card w3-light-grey w3-padding w3-margin-bottom">
          <div className="w3-container">
            <h3>Welcome, {name}.</h3>
            <UserRoleMessage />
          </div>
        </div>

        <div className="grid-container">
          <DataCard></DataCard>
          <DataCard></DataCard>
          <DataCard></DataCard>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
