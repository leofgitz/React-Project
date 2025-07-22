import React from "react";

const SubjectsSection = ({ subjects, selectedSubject, onSelectSubject }) => (
  <div className="w3-card-4 w3-margin w3-round-large">
    <div className="w3-container w3-text-brown w3-round-large">
      <h2>Subjects</h2>
    </div>
    <div className="w3-container w3-padding">
      {subjects.map((subject) => (
        <button
          key={subject.id}
          className="w3-button w3-border w3-border-black w3-margin-bottom w3-margin-right w3-round-xlarge w3-text-white w3-hover-khaki"
          style={{ background: "#5e403f" }}
          onClick={() => onSelectSubject(subject.id)}
        >
          <>
            <b>{subject.name}</b>
          </>
          <br />
          Year: {subject.year}
        </button>
      ))}
    </div>
  </div>
);

export default SubjectsSection;
