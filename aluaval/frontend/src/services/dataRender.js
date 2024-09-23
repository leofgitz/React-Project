import React from "react";

export const AssignmentItem = (assignments) => {
  return (
    <>
      {assignments.map((assignment) => (
        <button
          key={assignment.id}
          className="w3-button w3-block w3-white w3-border w3-margin-bottom w3-center"
        >
          {assignment.title} - 
        </button>
      ))}
    </>
  );
};

export const BadgeItem = (badges, role) => {
  return <></>;
};

export const ColleagueItem = (colleagues, role) => {
  let id;
  if (role == "Student") {
    const { user } = useAuth();
    id = user.id;
  }

  return (
    <>
      {colleagues.map((colleague) => (
        <>
          {colleague.name}
          {role === "Student" &&
            (id === colleague.id ? (
              <button>Self Evaluation</button>
            ) : (
              <button>Peer Evaluation</button>
            ))}
          {role === "Teacher" ? <p></p> : <p></p>}
        </>
      ))}
      <p></p>
    </>
  );
};
