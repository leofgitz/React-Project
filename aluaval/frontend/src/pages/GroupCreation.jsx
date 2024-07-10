import React, { useState, useEffect } from "react";
import SubjectsSection from "../components/SubjectsSection.jsx";
import AssignmentsSection from "../components/AssignmentsSection.jsx";
import StudentsSection from "../components/StudentsSection.jsx";

const GroupCreation = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [groupedStudents, setGroupedStudents] = useState({});
  const [currentStep, setCurrentStep] = useState("subjects");

  useEffect(() => {
    const fetchSubjects = async () => {
      const data = [
        { id: 1, name: "Math" },
        { id: 2, name: "Science" },
      ];
      setSubjects(data);
    };

    const fetchAssignments = async () => {
      const data = [
        { id: 1, name: "Pythagorean Theorem", subjectId: 1 },
        { id: 2, name: "Non-Euclidean Geometry", subjectId: 1 },
        { id: 3, name: "Hawking Radiation", subjectId: 2 },
      ];
      setAssignments(data);
    };

    const fetchStudents = async () => {
      const data = [
        { id: 1, name: "Pablo Picasso" },
        { id: 2, name: "Susan Sarandon" },
        { id: 3, name: "Michael Jackson" },
        { id: 4, name: "Alan Turing" },
        { id: 5, name: "Elvis Presley" },
        { id: 6, name: "Fernando Almeida" },
      ];
      setStudents(data);
    };

    fetchSubjects();
    fetchAssignments();
    fetchStudents();
  }, []);

  const handleSubjectSelect = (subjectId) => {
    setSelectedSubject(subjectId);
    setCurrentStep("assignments");
    setSelectedAssignment(null);
    setSelectedStudents([]);
    setGroupedStudents({});
  };

  const handleAssignmentSelect = (assignmentId) => {
    setSelectedAssignment(assignmentId);
    setCurrentStep("students");
    const groupedData = {
      1: {
        1: [1, 2], // Example: Assignment 1 has Group 1 with Student 1 and Student 2
        2: [3, 4], // Example: Assignment 1 has Group 2 with Student 3 and Student 4
      },
      2: {
        1: [5, 6], // Example: Assignment 2 has Group 1 with Student 5 and Student 6
      },
    };
    setGroupedStudents(groupedData[assignmentId] || {});
  };

  const handleStudentSelect = (studentId) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : prev.length < 5
        ? [...prev, studentId]
        : prev
    );
  };

  const handleCreateGroup = () => {
    console.log("Group created with students:", selectedStudents);
    setSelectedStudents([]);
  };

  const handleCreateAssignment = () => {
    console.log("Create new assignment");
  };

  const handleBack = () => {
    if (currentStep === "assignments") {
      setSelectedSubject(null);
      setCurrentStep("subjects");
    } else if (currentStep === "students") {
      setSelectedAssignment(null);
      setCurrentStep("assignments");
      setSelectedStudents([]);
    }
  };

  return (
    <div className="w3-container main-content">
      {currentStep === "subjects" && (
        <SubjectsSection
          subjects={subjects}
          selectedSubject={selectedSubject}
          onSelectSubject={handleSubjectSelect}
        />
      )}

      {currentStep === "assignments" && selectedSubject && (
        <AssignmentsSection
          subjects={subjects}
          selectedSubject={selectedSubject}
          assignments={assignments}
          selectedAssignment={selectedAssignment}
          onSelectAssignment={handleAssignmentSelect}
          onCreateAssignment={handleCreateAssignment}
          onBack={handleBack}
        />
      )}

      {currentStep === "students" && selectedAssignment && (
        <StudentsSection
          subjects={subjects}
          selectedSubject={selectedSubject}
          students={students}
          groupedStudents={groupedStudents}
          selectedStudents={selectedStudents}
          onSelectStudent={handleStudentSelect}
          onCreateGroup={handleCreateGroup}
          onBack={handleBack}
        />
      )}
    </div>
  );
};

export default GroupCreation;
