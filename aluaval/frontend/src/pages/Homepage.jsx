import React, { useState, useEffect } from "react";
import { fetchDynamicRoute } from "../services/dataFetch.js";
import { useAuth } from "../context/authProvider.jsx";
import DataCard from "../components/DataCard.jsx";
import {
  AssignmentItem,
  EvaluationItem,
  AwardItem,
} from "../services/dataRender.js";

const Homepage = () => {
  const { user } = useAuth();
  const uid = user.id;
  const role = user.role;
  const name = user.name;
  const [assignments, setAssignments] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [awards, setAwards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let data;

      try {
        switch (role) {
          case "Teacher":
            data = fetchDynamicRoute("teacher", "assignments/homepage");
            setAssignments(data);

            data = fetchDynamicRoute("teacher", "evaluations/homepage");
            setEvaluations(data);

            data = fetchDynamicRoute("teacher", "awards/homepage");
            setAwards(data);
            break;
          case "Student":
            data = fetchDynamicRoute("student", "assignments/homepage");
            setAssignments(data);

            data = fetchDynamicRoute("student", "evaluations/homepage");
            setEvaluations(data);

            data = fetchDynamicRoute("student", "awards/homepage");
            setAwards(data);
            break;
          default:
            break;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [role, uid]);

  const UserRoleMessage = () => {
    const roleMessages = {
      Teacher:
        "Here you can check the most recent developments regarding your classes and created assignments.",
      Student:
        "Here you can check the most recent developments regarding evaluations, assignments and badges!",
    };

    return (
      <p>
        {roleMessages[role] ||
          "Please sign in to enjoy the most of the platform!"}
      </p>
    );
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
          <DataCard
            title={"Assignments"}
            items={assignments}
            renderItems={AssignmentItem}
          ></DataCard>
          <DataCard
            title={"Awards"}
            items={awards}
            renderItems={AwardItem}
          ></DataCard>
          <DataCard
            title={"Evaluation History"}
            items={evaluations}
            renderItems={EvaluationItem}
          ></DataCard>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
