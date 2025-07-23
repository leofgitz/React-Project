import React, { useState, useEffect } from "react";
import { fetchDynamicRoute } from "../services/dataFetch.js";
import { useAuth } from "../context/authProvider.jsx";
import DataCard from "../components/DataCard.jsx";
import {
  AssignmentItem,
  EvaluationItem,
  AwardItem,
} from "../services/dataRender.jsx";

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
            data = await fetchDynamicRoute("teacher", [
              "assignments",
              "homepage",
            ]);
            setAssignments(data);

            data = await fetchDynamicRoute("teacher", [
              "evaluations",
              "history",
            ]);
            setEvaluations(data);

            data = await fetchDynamicRoute("teacher", ["awards", "homepage"]);
            setAwards(data);
            break;
          case "Student":
            data = await fetchDynamicRoute("student", [
              "assignments",
              "homepage",
            ]);
            setAssignments(data);

            data = await fetchDynamicRoute("student", [
              "evaluations",
              "history",
            ]);
            setEvaluations(data);

            data = await fetchDynamicRoute("student", ["awards", "homepage"]);
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
    <div className="main-content w3-animate-opacity">
      <div className="w3-card w3-round-xlarge w3-container w3-margin-top">
        <h2 className="w3-text-brown ">Homepage</h2>

        <div className="w3-card w3-padding-small w3-margin-bottom w3-round-xlarge">
          <div className="w3-container">
            <h3>Welcome, {name}.</h3>
            <UserRoleMessage />
            <p>
              Check{" "}
              <i
                className="fa fa-users w3-xlarge w3-bar-item w3-hover-none w3-button w3-card w3-round-xlarge"
                style={{
                  background: "#e4d3a4",
                  cursor: "default",
                  pointerEvents: "none",
                }}
              ></i>{" "}
              for more.
            </p>
          </div>
        </div>

        <div className="grid-container">
          {
            <DataCard
              title={"Most Recent Assignments"}
              items={assignments}
              renderItems={AssignmentItem}
            ></DataCard>
          }
          <DataCard
            title={"Most Recent Awards"}
            items={awards}
            renderItems={AwardItem}
          ></DataCard>
          <DataCard
            title={"Most Recent Evaluations"}
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
