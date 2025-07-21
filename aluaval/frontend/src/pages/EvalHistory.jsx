import { useState, useEffect } from "react";
import { fetchDynamicRoute, getById } from "../services/dataFetch";
import EvaluationCard from "../components/EvaluationCard.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authProvider.jsx";
import FloatingGoBackButton from "../components/FloatingGoBack.jsx";

const EvalHistory = () => {
  const { user } = useAuth();
  const uid = user.id;
  const role = user.role;
  console.log("user role: " + role);
  const [evaluations, setEvaluations] = useState([]);
  const [groupNumber, setGroupNumber] = useState(0);
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { group } = location.state || {};

  useEffect(() => {
    if (!group) {
      navigate("/");
    }
  }, [group, navigate]);

  useEffect(() => {
    const fetchEvaluations = async () => {
      try {
        let data = await fetchDynamicRoute("evaluations", ["group", group]);
        setEvaluations(data.evaluationData);
        setAssignmentTitle(data.assignmentTitle);

        data = await getById("groups", group);
        setGroupNumber(data.number);
      } catch (error) {
        console.error("Error fetching evaluations:", error);
      }
    };

    if (group) {
      fetchEvaluations();
    }
  }, [group]);

  const filteredEvals = evaluations.filter((evaluation) =>
    role === "Teacher" ? true : evaluation.evaluator === uid
  );

  return (
    <div className="w3-container main-content">
      <h2 className="w3-text-brown w3-center">
        {role === "Student" && "Your "}Evaluation History for{" "}
        <b>Group {groupNumber}</b>, Assignment: <b>{assignmentTitle}</b>
      </h2>

      {filteredEvals.length > 0 ? (
        filteredEvals.map((evaluation) => (
          <EvaluationCard key={evaluation.id} evaluation={evaluation} />
        ))
      ) : (
        <p className="w3-center">No evaluations were submitted yet.</p>
      )}
      <div
        className="w3-border w3-border-black"
        style={{
          position: "fixed",
          bottom: "64px",
          right: "16px",
          zIndex: 1000,
          backgroundColor: "#fff",
          padding: "8px 12px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          textAlign: "center",
          fontSize: "14px",
          width: "180px",
        }}
      >
        <p style={{ margin: 0 }}>Low score = GOOD High score = BAD</p>
      </div>
      <FloatingGoBackButton userRole={role} />
    </div>
  );
};

export default EvalHistory;
