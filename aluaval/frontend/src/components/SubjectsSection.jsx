import React from "react";

const SubjectsSection = ({ subjects, selectedSubject, onSelectSubject }) => (
  <div className="w3-card-4 w3-margin w3-round-xxlarge w3-animate-opacity">
    <div className="w3-container w3-blue w3-round-xxlarge">
      <h2>Subjects</h2>
    </div>
    <div className="w3-container w3-padding">
      {subjects.map((subject) => (
        <button
          key={subject.id}
          className={`w3-button w3-margin-bottom w3-margin-right w3-round-xxlarge ${
            selectedSubject === subject.id ? "w3-green" : "w3-blue"
          }`}
          onClick={() => onSelectSubject(subject.id)}
        >
          {subject.name}
        </button>
      ))}
    </div>
  </div>
);

export default SubjectsSection;
