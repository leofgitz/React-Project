import React, { useState, useEffect } from "react";
import AssignmentsSection from "../components/AssignmentsSection.jsx";
import GroupSection from "../components/GroupSection.jsx";
import { create, fetchDynamicRoute } from "../services/dataFetch.js";
import { useAuth } from "../context/authProvider.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import SubjectsSection from "../components/SubjectsSection.jsx";
import BadgeModal from "../components/BadgeModal.jsx";
import BadgeAwardingModal from "../components/BadgeAwardingModal.jsx";

const GroupsPage = () => {
  const { user } = useAuth();
  const location = useLocation();
  const uid = user.id;
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(-1);
  const [group, setGroup] = useState([]); //like students, setStudent
  const [currentStep, setCurrentStep] = useState("subjects");
  const [badgeViewingModal, setBadgeViewingModal] = useState(false);
  const [badgeAwardingModal, setBadgeAwardingModal] = useState(false);
  const navigate = useNavigate();

  const fetchSubjects = async () => {
    try {
      let data = await fetchDynamicRoute("student", "subjects");
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

    if (state?.returningFromEval && state?.previousState) {
      const prev = state.previousState;

      setGroup(prev.group);
      setSelectedSubject(prev.selectedSubject);
      setSelectedAssignment(prev.selectedAssignment);
      setStudents(prev.students);
      setSelectedStudent(prev.selectedStudent);
      setCurrentStep(prev.currentStep);
      setAssignments(prev.assignments);
    } else if (state?.returningFromHist && state?.previousState) {
      const prev = state.previousState;

      setGroup(prev.group);
      setSelectedSubject(prev.selectedSubject);
      setSelectedAssignment(prev.selectedAssignment);
      setStudents(prev.students);
      setSelectedStudent(prev.selectedStudent);
      setCurrentStep(prev.currentStep);
      setAssignments(prev.assignments);
    }
  }, [location]);

  const handleSubjectSelect = async (subjectID) => {
    setSelectedSubject(subjectID);
    setCurrentStep("assignments");
    setSelectedAssignment(null);

    try {
      let params = ["subjects", subjectID, "assignments"];
      let data = await fetchDynamicRoute("student", params);
      console.log("Assignment data: " + JSON.stringify(data));
      setAssignments(data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  const handleAssignmentSelect = async (assignmentID) => {
    setSelectedAssignment(assignmentID);
    setCurrentStep("group");

    try {
      const params = ["assignments", assignmentID];
      let data = await fetchDynamicRoute("student", params);
      setStudents(data);
      console.log(
        "Student data upon assignment select: " + JSON.stringify(data)
      );

      setGroup(data[0].groupId);
    } catch (error) {
      console.error("Error fetching group:", error);
    }
  };

  const handleEvaluateMember = (student, isFinal) => {
    navigate(`/evaluation`, {
      state: {
        student,
        group,
        selectedSubject,
        selectedAssignment,
        currentStep,
        students,
        assignments,
        isFinal,
      },
    });
  };

  const handleCheckBadges = async () => {
    setBadgeViewingModal(true);
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

  const handleAwardStudent = async (student) => {
    setSelectedStudent(student);
    setBadgeAwardingModal(true);
  };

  const handleCreateAward = async (badge, student) => {
    try {
      let giver = uid;
      const body = {
        giver,
        badge,
        group,
        recipient: student,
      };
      const newAward = await create("awards", body);
      console.log("Created new award:" + newAward);
    } catch (error) {}
  };

  const handleBack = () => {
    if (currentStep === "assignments") {
      setSelectedSubject(null);
      setAssignments([]);
      setCurrentStep("subjects");
    } else if (currentStep === "group") {
      setSelectedAssignment(null);
      setStudents([]);
      setCurrentStep("assignments");
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
          onBack={handleBack}
        />
      )}

      {currentStep === "group" && selectedAssignment && (
        <GroupSection
          subjects={subjects}
          assignments={assignments}
          selectedSubject={selectedSubject}
          selectedAssignment={selectedAssignment}
          students={students}
          group={group}
          onBack={handleBack}
          currentUser={uid}
          onCheckBadges={handleCheckBadges}
          onAwardStudent={handleAwardStudent}
          onCheckEvalHistory={handleCheckEvalHistory}
          onEvalMember={handleEvaluateMember}
        />
      )}

      {badgeViewingModal && (
        <BadgeModal
          group={group}
          onClose={() => setBadgeViewingModal(false)}
          isOpen={badgeViewingModal}
        />
      )}

      {badgeAwardingModal && (
        <BadgeAwardingModal
          student={selectedStudent}
          group={group}
          isOpen={badgeAwardingModal}
          onCreate={handleCreateAward}
          onClose={() => {
            setBadgeAwardingModal(false);
            setSelectedStudent(-1);
          }}
        />
      )}
    </div>
  );
};

export default GroupsPage;
