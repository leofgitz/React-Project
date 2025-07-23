import { useEffect, useState } from "react";
import { useAuth } from "../context/authProvider";
import { useLocation } from "react-router-dom";
import CourseSection from "../components/CourseSection";
import SubjectCreationSection from "../components/SubjectCreationSection";
import EnrollmentSection from "../components/EnrollmentSection";

const SubjectCreation = () => {
  const { user } = useAuth();
  const uid = user.role;
  const location = useLocation();

  const [currentStep, setCurrentStep] = useState(3);

  const [isCreatingCourse, setCreatingCourse] = useState(false);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [subject, setSubject] = useState([]);
  const [isCreatingSubject, setCreatingSubject] = useState(false);
  const [createdSubjects, setCreatedSubjects] = useState([]);

  const [selectedStudents, setSelectedStudents] = useState([]);
  const [availableStudents, setAvailableStudents] = useState([]);
  const [studentSearch, setStudentSearch] = useState("");
  const [enrolledStudents, setEnrolledStudents] = useState([]);

  const fetchCourses = async () => {
    try {
      let data; // Write rest of code, possible need a backend
      setAvailableCourses();
    } catch (err) {
      console.error("Error fetching courses: ", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // NAVIGATION
  const handleNext = async () => {
    if (currentStep === 1) {
    } else if (currentStep === 2) {
    }
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep === 2) {
    } else if (currentStep === 3) {
    }
    setCurrentStep(currentStep - 1);
  };

  // COURSE HANDLES
  const handleCourseSelect = async (courseID) => {
    try {
    } catch (err) {
      console.error("Error selecting a course: ", err);
    }
  };

  const handleCreateCourse = async () => {
    try {
    } catch (err) {
      console.error("Error creating course: ", err);
    }
  };

  // SUBJECT HANDLES
  const handleCreateSubject = async () => {
    try {
    } catch (err) {
      console.error("Error creating subject: ", err);
    }
  };

  const handleSelectSubject = async () => {
    try {
    } catch (err) {
      console.error("Error selecting a subject: ", err);
    }
  };

  // STUDENT HANDLES
  const handleStudentSelect = (studentID) => {
    setSelectedStudents((prev) =>
      prev.includes(studentID)
        ? prev.filter((id) => id !== studentID)
        : [...prev, studentID]
    );
  };

  const handleEnrollStudents = async () => {
    try {
    } catch (err) {
      console.error("Error enrolling students: ", err);
    }
  };

  const handleStudentSearchChange = () => {
    setStudentSearch();
  };

  return (
    <div className="w3-container main-content w3-animate-opacity">
      {currentStep === 1 && (
        <CourseSection
          availableCourses={availableCourses}
          selectedCourse={selectedCourse}
          onCreateCourse={() => isCreatingCourse(true)}
          onSelectCourse={handleCourseSelect}
          onNext={handleNext}
        />
      )}
      {currentStep === 2 && (
        <SubjectCreationSection
          availableCourses={availableCourses}
          selectedCourse={selectedCourse}
          createdSubjects={createdSubjects}
          onSelectSubject={handleSelectSubject}
          onCreateSubject={() => isCreatingSubject(true)}
          onBack={handleBack}
          onNext={handleNext}
        />
      )}
      {currentStep === 3 && (
        <EnrollmentSection
          enrolledStudents={enrolledStudents}
          selectedStudents={selectedStudents}
          availableStudents={availableStudents}
          studentSearch={studentSearch}
          onSelectStudent={handleStudentSelect}
          onEnrollStudents={handleEnrollStudents}
          onStudentSearch={handleStudentSearchChange}
          availableCourses
          selectedCourse
          createdSubjects
          selectedSubject
          onBack={handleBack}
        />
      )}
    </div>
  );
};

export default SubjectCreation;
