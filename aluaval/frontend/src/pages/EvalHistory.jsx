import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchDynamicRoute, getById } from "../services/dataFetch";
import EvaluationCard from "../components/EvaluationCard.jsx";

const EvalHistory = () => {
  const { group } = useParams();
  const [evaluations, setEvaluations] = useState([]);
  const [groupNumber, setGroupNumber] = useState(0);

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
    <div className="w3-container w3-padding">
      <h2>Evaluation History for Group {groupNumber} </h2>
      {evaluations.map((evaluation) => (
        <EvaluationCard key={evaluation.id} evaluation={evaluation} />
      ))}
    </div>
  );
};

export default EvalHistory;
