import React, { useState, useEffect } from "react";
import SubjectsSection from "../components/SubjectsSection.jsx";
import AssignmentsSection from "../components/AssignmentsSection.jsx";
import StudentsSection from "../components/StudentsSection.jsx";
import AssignmentModal from "../components/AssignmentModal.jsx";
import BadgeModal from "../components/BadgeModal.jsx";
import { create, fetchDynamicRoute } from "../services/dataFetch.js";
import { useAuth } from "../context/authProvider.jsx";

const GroupCreation = () => {
  const { user } = useAuth();
  const uid = user.id;
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [students, setStudents] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(-1);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [currentStep, setCurrentStep] = useState("subjects");
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);
  const [lastNumber, setLastNumber] = useState(0);
  const [classe, setClasse] = useState(0);

  const fetchSubjects = async () => {
    try {
      let data = await fetchDynamicRoute("teacher", "subjects");
      setSubjects(data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleSubjectSelect = async (subjectID) => {
    setSelectedSubject(subjectID);
    setCurrentStep("assignments");
    setSelectedAssignment(null);
    setSelectedStudents([]);

    try {
      let params = [subjectID, "classe"];
      let data = await fetchDynamicRoute("teacher", params);
      setClasse(data.id);

      params = ["subjects", subjectID, "assignments"];
      data = await fetchDynamicRoute("teacher", params);
      setAssignments(data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  const handleAssignmentSelect = async (assignmentID) => {
    setSelectedAssignment(assignmentID);
    setCurrentStep("students");

    try {
      const params = [selectedSubject, assignmentID];
      let data = await fetchDynamicRoute("teacher", params);
      setStudents(data);

      data = await fetchDynamicRoute(
        "teacher",
        ["lastgroupno", classe, assignmentID],
        "GET"
      );
      setLastNumber(data.groupNumber);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleCreateAssignment = async (title, duedate) => {
    try {
      let teacher = uid;
      const body = {
        title,
        dueDate: duedate,
        subject: selectedSubject,
        teacher,
      };
      const newAssignment = await create("assignments", body);
      console.log("Created new assignment: " + newAssignment);

      const params = ["subjects", selectedSubject, "assignments"];
      let data = await fetchDynamicRoute("teacher", params);
      setAssignments(data);
    } catch (error) {
      console.error("Error creating assignment:", error);
    }
  };

  const handleStudentSelect = (studentID) => {
    setSelectedStudents((prev) =>
      prev.includes(studentID)
        ? prev.filter((id) => id !== studentID)
        : [...prev, studentID]
    );
  };

  const handleCreateGroup = async () => {
    try {
      const newGroup = await create("groups", {
        classe,
        assignment: selectedAssignment,
      });
      let group = newGroup.id;
      await fetchDynamicRoute("memberships", "addmembers", "POST", {
        group,
        students: selectedStudents,
      });

      console.log("Created new group: ", newGroup);
      console.log("Group created with students:", selectedStudents);
      setSelectedStudents([]);

      const params = [selectedSubject, selectedAssignment];
      let data = await fetchDynamicRoute("teacher", params);
      console.log("Before updating students:", students);
      setStudents(data);
      console.log("After updating students:", data);

      data = await fetchDynamicRoute(
        "teacher",
        ["lastgroupno", classe, selectedAssignment],
        "GET"
      );
      console.log("lastgroupno data:", data);
      setLastNumber(data.groupNumber);
    } catch (err) {
      console.error("Error creating group:", err);
    }
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

  const handleCheckBadges = async (group) => {
    setSelectedGroup(group);
    setIsBadgeModalOpen(true);
  };

  const handleCheckEvalHistory = async (group) => {
    history.push(`/evaluation-history/${group}`);
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
        <>
          <AssignmentsSection
            subjects={subjects}
            selectedSubject={selectedSubject}
            assignments={assignments}
            selectedAssignment={selectedAssignment}
            onSelectAssignment={handleAssignmentSelect}
            onBack={handleBack}
          />
          <button onClick={() => setIsAssignmentModalOpen(true)}>
            Create Assignment
          </button>
        </>
      )}

      {currentStep === "students" && selectedAssignment && (
        <StudentsSection
          subjects={subjects}
          assignments={assignments}
          selectedSubject={selectedSubject}
          selectedAssignment={selectedAssignment}
          students={students}
          selectedStudents={selectedStudents}
          onSelectStudent={handleStudentSelect}
          lastNumber={lastNumber}
          onCreateGroup={handleCreateGroup}
          onBack={handleBack}
          onCheckBadges={handleCheckBadges}
          onCheckEvalHistory={handleCheckEvalHistory}
        />
      )}

      {isAssignmentModalOpen && (
        <AssignmentModal
          onClose={() => setIsAssignmentModalOpen(false)}
          onCreate={handleCreateAssignment}
          isOpen={true}
        />
      )}

      {isBadgeModalOpen && (
        <BadgeModal
          group={selectedGroup}
          onClose={() => {
            setIsBadgeModalOpen(false);
            setSelectedGroup(null);
          }}
        />
      )}
    </div>
  );
};

export default GroupCreation;
