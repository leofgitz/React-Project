import React, { useState, useEffect } from "react";
import SubjectsSection from "../components/SubjectsSection.jsx";
import AssignmentsSection from "../components/AssignmentsSection.jsx";
import StudentsSection from "../components/StudentsSection.jsx";
import AssignmentModal from "../components/AssignmentModal.jsx";
import BadgeModal from "../components/BadgeModal.jsx";
import { create, fetchDynamicRoute } from "../services/dataFetch.js";
import { useAuth } from "../context/authProvider.jsx";
import { useNavigate, useLocation } from "react-router-dom";

const GroupCreation = () => {
  const { user } = useAuth();
  const location = useLocation();
  const uid = user.id;
  const role = user.role;
  const isTeacher = role === "Teacher";

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
  const navigate = useNavigate();

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

  useEffect(() => {
    const { state } = location;

    if (state?.returningFromHist && state?.previousState) {
      const prev = state.previousState;

      setSelectedSubject(prev.selectedSubject);
      setSelectedAssignment(prev.selectedAssignment);
      setStudents(prev.students);
      setCurrentStep(prev.currentStep);
      setAssignments(prev.assignments);
    }
  }, [location]);

  const handleSubjectSelect = async (subjectID) => {
    setSelectedSubject(subjectID);
    setCurrentStep("assignments");
    setSelectedAssignment(null);
    setSelectedStudents([]);

    try {
      let params = ["classe", subjectID, "classe"];
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
      const params = ["assignment", selectedSubject, assignmentID];
      let data = await fetchDynamicRoute("teacher", params);
      setStudents(data);

      let groupdata = await fetchDynamicRoute(
        "teacher",
        ["lastgroupno", classe, assignmentID],
        "GET"
      );
      console.log("groupdata: ", JSON.stringify(groupdata));
      setLastNumber(groupdata);
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
      console.log("Created new assignment: ", JSON.stringify(newAssignment));

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
      let newGroupID = newGroup.id;
      const newMembers = await fetchDynamicRoute(
        "memberships",
        "addmembers",
        "POST",
        {
          group: newGroupID,
          students: selectedStudents,
        }
      );

      console.log("Created new group: ", newGroup);
      console.log("Group created with students:", selectedStudents);
      console.log("New members added: ", newMembers);
      setSelectedStudents([]);

      const params = ["assignment", selectedSubject, selectedAssignment];
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

  const handleAddToGroup = async (groupID) => {
    try {
      const addedMembers = await fetchDynamicRoute(
        "memberships",
        "addmembers",
        "POST",
        {
          group: groupID,
          students: selectedStudents,
        }
      );

      console.log("Added to group:", groupID);
      console.log("Students added:", selectedStudents);
      console.log("Membership result:", addedMembers);

      setSelectedStudents([]);

      const params = ["assignment", selectedSubject, selectedAssignment];
      const updatedData = await fetchDynamicRoute("teacher", params);
      setStudents(updatedData);
    } catch (err) {
      console.error("Error adding to group: ", err);
    }
  };

  const handleBack = () => {
    if (currentStep === "assignments") {
      setSelectedSubject(null);
      setAssignments([]);
      setCurrentStep("subjects");
    } else if (currentStep === "students") {
      setStudents([]);
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
    navigate("/eval-history", {
      state: {
        group,
        selectedSubject,
        selectedAssignment,
        currentStep,
        students,
        assignments,
      },
    });
  };

  return (
    <div className="w3-container main-content w3-animate-opacity">
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
          onCreateAssignment={() => setIsAssignmentModalOpen(true)}
          onBack={handleBack}
          {...(role === "Teacher" && {
            onCreateAssignment: () => setIsAssignmentModalOpen(true),
          })}
        />
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
          onAddToGroup={handleAddToGroup}
          onBack={handleBack}
          onCheckBadges={handleCheckBadges}
          onCheckEvalHistory={handleCheckEvalHistory}
          studentSetter={setSelectedStudents}
        />
      )}

      {isAssignmentModalOpen && (
        <AssignmentModal
          onClose={() => setIsAssignmentModalOpen(false)}
          onCreate={handleCreateAssignment}
          isOpen={isAssignmentModalOpen}
        />
      )}

      {isBadgeModalOpen && (
        <BadgeModal
          group={selectedGroup}
          onClose={() => {
            setIsBadgeModalOpen(false);
            setSelectedGroup(null);
          }}
          isOpen={isBadgeModalOpen}
        />
      )}
    </div>
  );
};

export default GroupCreation;
