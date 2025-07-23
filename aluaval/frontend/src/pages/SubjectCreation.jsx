import { useEffect, useState } from "react";
import { useAuth } from "../context/authProvider";
import CourseSection from "../components/CourseSection";
import SubjectCreationSection from "../components/SubjectCreationSection";
import EnrollmentSection from "../components/EnrollmentSection";
import SubjectModal from "../components/SubjectModal";
import CourseModal from "../components/CourseModal";
import { create, fetchDynamicRoute } from "../services/dataFetch";

const SubjectCreation = () => {
  const { user } = useAuth();
  const uid = user.id;

  const [currentStep, setCurrentStep] = useState(1);

  const [isCreatingCourse, setCreatingCourse] = useState(false);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState([]);

  const [selectedSubject, setSelectedSubject] = useState([]);
  const [isCreatingSubject, setCreatingSubject] = useState(false);
  const [createdSubjects, setCreatedSubjects] = useState([]);

  const [selectedStudents, setSelectedStudents] = useState([]);
  const [availableStudents, setAvailableStudents] = useState([]);
  const [studentSearch, setStudentSearch] = useState("");
  const [enrolledStudents, setEnrolledStudents] = useState([]);

  const fetchCourses = async () => {
    try {
      let courseData = await fetchDynamicRoute("teacher", "courses");
      setAvailableCourses(courseData);
    } catch (err) {
      console.error("Error fetching courses: ", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // NAVIGATION
  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  // COURSE HANDLES
  const handleCourseSelect = async (courseID) => {
    try {
      const selected = availableCourses.find((c) => c.id === courseID);
      setSelectedCourse(selected);
      let queryBody = { courseID };
      let subjectData = await fetchDynamicRoute(
        "teacher",
        "subjects",
        "POST",
        queryBody
      );
      setCreatedSubjects(subjectData);
      setCurrentStep(2);
    } catch (err) {
      console.error("Error selecting a course: ", err);
    }
  };

  const handleCreateCourse = async (name, description) => {
    try {
      let teacher = uid;
      const body = { name, description, responsibleTeacher: teacher };
      const newCourse = await create("courses", body);
      console.log("Created new course: ", JSON.stringify(newCourse));

      let courseData = await fetchDynamicRoute("teacher", "courses");
      setAvailableCourses(courseData);
    } catch (err) {
      console.error("Error creating course: ", err);
    }
  };

  // SUBJECT HANDLES
  const handleSelectSubject = async (subjectID) => {
    const selected = createdSubjects.find((s) => s.id === subjectID);
    setSelectedSubject(selected);

    const sid = selected.id;
    const queryBody1 = { subjectID: sid };
    const classe = await fetchDynamicRoute(
      "teacher",
      ["subject", "classe"],
      "POST",
      queryBody1
    );

    const cid = classe.id;
    const queryBody2 = { classeID: cid };
    const studentData = await fetchDynamicRoute(
      "teacher",
      ["students", "enrollment"],
      "POST",
      queryBody2
    );

    setAvailableStudents(studentData.available);
    setEnrolledStudents(studentData.enrolled);
    setCurrentStep(3);

    try {
    } catch (err) {
      console.error("Error selecting a subject: ", err);
    }
  };

  const handleCreateSubject = async (name, description, year) => {
    try {
      let cid = selectedCourse.id;
      const body = { name, description, course: cid, year };
      const newSubject = await create("subjects", body);
      console.log(
        `Created new subject for course ${selectedCourse.name}: `,
        JSON.stringify(newSubject)
      );

      let teacher = uid,
        nsid = newSubject.id,
        nsname = newSubject.name;
      const body2 = { subject: nsid, teacher };
      const newClasse = await create("classes", body2);
      console.log(
        `Created new classe for subject ${nsname}:`,
        JSON.stringify(newClasse)
      );

      let queryBody = { courseID: cid };
      let subjectData = await fetchDynamicRoute(
        "teacher",
        "subjects",
        "POST",
        queryBody
      );
      setCreatedSubjects(subjectData);
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
      const sid = selectedSubject.id;
      const queryBody1 = { subjectID: sid };
      const classe = await fetchDynamicRoute(
        "teacher",
        ["subject", "classe"],
        "POST",
        queryBody1
      );

      const cid = classe.id;
      const body = { classe: cid, students: selectedStudents };
      const newlyEnrolledStudents = await fetchDynamicRoute(
        "enrollments",
        "bulk-enroll",
        "POST",
        body
      );
      console.log(
        `Newly enrolled students for course ${selectedCourse.name} in the subject ${selectedSubject.name}: `,
        JSON.stringify(newlyEnrolledStudents)
      );

      setSelectedStudents([]);
      const queryBody2 = { classeID: cid };
      const studentData = await fetchDynamicRoute(
        "teacher",
        ["students", "enrollment"],
        "POST",
        queryBody2
      );

      setAvailableStudents(studentData.available);
      setEnrolledStudents(studentData.enrolled);
    } catch (err) {
      console.error("Error enrolling students: ", err);
    }
  };

  const handleStudentSearchChange = (text) => {
    setStudentSearch(text);
  };

  return (
    <div className="w3-container main-content w3-animate-opacity">
      {currentStep === 1 && (
        <CourseSection
          availableCourses={availableCourses}
          onCreateCourse={() => setCreatingCourse(true)}
          onSelectCourse={handleCourseSelect}
        />
      )}

      {currentStep === 2 && (
        <SubjectCreationSection
          selectedCourse={selectedCourse}
          createdSubjects={createdSubjects}
          onSelectSubject={handleSelectSubject}
          onCreateSubject={() => setCreatingSubject(true)}
          onBack={handleBack}
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
          availableCourses={availableCourses}
          selectedCourse={selectedCourse}
          selectedSubject={selectedSubject}
          onBack={handleBack}
        />
      )}

      {isCreatingCourse && (
        <CourseModal
          isOpen={isCreatingCourse}
          onCreate={handleCreateCourse}
          onClose={() => setCreatingCourse(false)}
        />
      )}

      {isCreatingSubject && (
        <SubjectModal
          isOpen={isCreatingSubject}
          onCreate={handleCreateSubject}
          onClose={() => setCreatingSubject(false)}
        />
      )}
    </div>
  );
};

export default SubjectCreation;
