import { useState, useEffect } from "react";
import { fetchDynamicRoute, getById } from "../services/dataFetch";
import EvaluationCard from "../components/EvaluationCard.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authProvider.jsx";
import FloatingGoBackButton from "../components/FloatingGoBack.jsx";

const EvalHistory = () => {
  const { user } = useAuth();
  const role = user.role;
  console.log("user role: " + role);
  const [evaluations, setEvaluations] = useState([]);
  const [groupNumber, setGroupNumber] = useState(0);
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
        setEvaluations(data);

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

  return (
    <div className="w3-container main-content">
      <h2 className="w3-text-brown w3-center">
        Evaluation History for Group {groupNumber}{" "}
      </h2>

      {evaluations.map((evaluation) => (
        <EvaluationCard key={evaluation.id} evaluation={evaluation} />
      ))}
      <div
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
