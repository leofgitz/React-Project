import { useAuth } from "../context/authProvider";

export const AssignmentItem = (assignments) => {
  return (
    <>
      {assignments.map((assignment) => (
        <div className="w3-card w3-round-xlarge w3-center w3-margin-bottom">
          <div className="w3-padding">
            <p>
              <b>{assignment.title}</b>
              <br />
              Created on: {new Date(assignment.createdAt).toLocaleDateString()},
              due on: {new Date(assignment.dueDate).toLocaleDateString()}, in
              subject: <b>{assignment.Subject?.name}</b>
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export const AwardItem = (awards) => {
  const { user } = useAuth();
  const name = user.name;
  const role = user.role;
  const uid = user.id;

  return (
    <>
      {awards.map((award) => (
        <div className="w3-card w3-round-xlarge w3-center w3-margin-bottom">
          <div className="w3-padding">
            <p>
              {" "}
              <i className={`fa ${award.icon}`}></i> <b>{award.badge}</b>{" "}
              awarded to{" "}
              <b>{award.recipient === name ? "You" : award.recipient}</b> by{" "}
              <b>{award.giver === name ? "You" : award.giver}</b> in{" "}
              <b>{award.assignmentTitle}</b>
              {role == "Teacher" && (
                <>
                  {" "}
                  in the subject <b>{award.subjectName}</b>
                </>
              )}
              .
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export const EvaluationItem = (evaluations) => {
  const { user } = useAuth();
  const name = user.name;
  const role = user.role;
  const uid = user.id;

  return (
    <>
      {evaluations.map((evaluation) => (
        <div className="w3-card w3-round-xlarge w3-center w3-margin-bottom">
          <div className="w3-padding">
            <p>
              In the assignment <b>{evaluation.assignment}</b>,
              {role == "Teacher" && (
                <>
                  {" "}
                  in the subject <b>{evaluation.subjectName}</b>,
                </>
              )}{" "}
              <b>
                {evaluation.evaluator === name ? "You" : evaluation.evaluator}
              </b>{" "}
              {evaluation.evaluator === evaluation.evaluated ? (
                "self-evaluated"
              ) : (
                <>
                  evaluated{" "}
                  <b>
                    {evaluation.evaluated === name
                      ? "You"
                      : evaluation.evaluated}
                  </b>
                </>
              )}{" "}
              on {new Date(evaluation.createdAt).toLocaleDateString()} at{" "}
              {new Date(evaluation.createdAt).toLocaleTimeString()}.{" "}
              <b>{evaluation.isFinal && "It was the final evaluation"}</b>.
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
