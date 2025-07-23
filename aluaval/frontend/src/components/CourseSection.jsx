const CourseSection = ({
  availableCourses,
  selectedCourse,
  onCreateCourse,
  onSelectCourse,
}) => {
  return (
    <div className="w3-card-4 w3-margin w3-round-large">
      <div className="w3-container w3-text-brown w3-round-large">
        <h2>
          Subject Creation - <b>Courses</b>
        </h2>
      </div>
      <p className="w3-margin-left">
        Select an existing course or create a new one:
      </p>
      <div className="w3-container w3-padding">
        {availableCourses.map((course) => (
          <button
            key={course.id}
            className="w3-button w3-border w3-border-black w3-margin-bottom w3"
            onClick={() => onSelectCourse(course.id)}
            title={course.description}
          >
            <b>{course.name}</b>
          </button>
        ))}
        <button
          className={`w3-button ${
            availableCourses.length === 0 ? "w3-margin-bottom" : ""
          } w3-round-xxlarge w3-olive w3-border w3-border-black w3-hover-pale-green w3-hover-border-green`}
          onClick={onCreateCourse}
        >
          Create New Course
        </button>
      </div>
    </div>
  );
};

export default CourseSection;
