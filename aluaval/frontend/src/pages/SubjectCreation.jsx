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

  const [currentStep, setCurrentStep] = useState(1);

  const [isCreatingCourse, setCreatingCourse] = useState(false);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [subject, setSubject] = useState(null);
  const [createdSubjects, setCreatedSubjects] = useState([]);

  const [selectedStudents, setSelectedStudents] = useState([]);
  const [availableStudents, setAvailableStudents] = useState([]);
  const [studentSearch, setStudentSearch] = useState("");

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
    <div className="w3-container main-content w3-w3-animate-opacity">
      {currentStep === 1 && (
        <CourseSection
          availableCourses={availableCourses}
          isCreatingCourse={isCreatingCourse}
          selectedCourse={selectedCourse}
          onCreateCourse={handleCreateCourse}
          onSelectCourse={handleCourseSelect}
          onNext={handleNext}
        />
      )}
      {currentStep === 2 && (
        <SubjectCreationSection
          createdSubjects={createdSubjects}
          subject={subject}
          onCreateSubject={handleCreateSubject}
          onBack={handleBack}
          onNext={handleNext}
        />
      )}
      {currentStep === 3 && (
        <EnrollmentSection
          selectedStudents={selectedStudents}
          availableStudents={availableStudents}
          studentSearch={studentSearch}
          onSelectStudent={handleStudentSelect}
          onEnrollStudents={handleEnrollStudents}
          onStudentSearch={handleStudentSearchChange}
          onBack={handleBack}
        />
      )}
    </div>
  );
};

export default SubjectCreation;
