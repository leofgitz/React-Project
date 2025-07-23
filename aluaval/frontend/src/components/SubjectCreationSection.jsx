import { createSearchParams } from "react-router-dom";

const SubjectCreationSection = ({
  availableCourses,
  selectedCourse,
  createdSubjects,
  onSelectSubject,
  onCreateSubject,
  onBack,
}) => {
  return (
    <div className="w3-card-4 w3-margin w3-round-large">
      <div className="w3-container w3-text-brown w3-round-large">
        <button
          className="w3-button w3-margin w3-text-black w3-right w3-card w3-round-large w3-hover-pale-yellow"
          style={{ background: "#e4d3a4" }}
          onClick={onBack}
        >
          <i class="fa fa-arrow-left" aria-hidden="true"></i> <b>Courses</b>
        </button>
        <h2>
          Subject Creation - <b>Subjects</b>
        </h2>
        <h3>
          Course: <b>{availableCourses[selectedCourse].name}</b>
        </h3>
      </div>

      <div className="w3-container w3-padding">
        <h4>Created subjects: {createdSubjects.length}</h4>
        <p>Select a subject to enroll more students or create a new one:</p>

        {createdSubjects.map((subject) => (
          <button
            key={subject.id}
            className="w3-button w3-border w3-border-black w3-margin-right w3-round-large w3-text-white w3-hover-khaki"
            style={{ background: "#5e403f" }}
            onClick={() => onSelectSubject(subject.id)}
            title={subject.description}
          >
            <b>{subject.name}</b>
            <br />
            Year: {subject.year}
          </button>
        ))}

        <button
          className={`w3-button ${
            createdSubjects.length === 0 && "w3-margin-bottom"
          } w3-round-xxlarge w3-olive w3-border w3-border-black w3-hover-pale-green w3-hover-border-green`}
          onClick={onCreateSubject}
        >
          Create New Subject
        </button>
      </div>
    </div>
  );
};

export default SubjectCreationSection;
