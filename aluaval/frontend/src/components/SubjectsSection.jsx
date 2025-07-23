const SubjectsSection = ({
  subjects,
  selectedSubject,
  onSelectSubject,
  role,
}) => (
  <div className="w3-card-4  w3-margin w3-round-large">
    <div className="w3-container w3-text-brown w3-round-large">
      <h2>
        Dashboard - <b>Subjects</b>
      </h2>
    </div>
    <div className="w3-container w3-padding">
      {subjects.map((subject) => (
        <button
          key={subject.id}
          className="w3-button w3-border w3-border-black w3-margin-right w3-round-xlarge w3-text-white w3-hover-khaki"
          style={{ background: "#5e403f" }}
          onClick={() => onSelectSubject(subject.id)}
        >
          <>
            <b>{subject.name}</b>
          </>
          <br />
          Course: {subject.courseName}
          <br />
          Year: {subject.year}
        </button>
      ))}
      {role && (
        <p>
          To create new subjects, please visit{" "}
          <i
            className="fa fa-chalkboard-teacher w3-xlarge w3-bar-item w3-button w3-card w3-round-xlarge"
            style={{
              background: "#e4d3a4",
              cursor: "default",
              pointerEvents: "none",
            }}
          ></i>
          .
        </p>
      )}
    </div>
  </div>
);

export default SubjectsSection;
