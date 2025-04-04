import React, { useState, useEffect } from "react";
import { create, fetchDynamicRoute } from "../services/dataFetch.js";
import { useAuth } from "../context/authProvider.jsx";
import { useNavigate } from "react-router-dom";
import SubjectsSection from "../components/SubjectsSection.jsx";
import BadgeModal from "../components/BadgeModal.jsx";
import BadgeAwardingModal from "../components/BadgeAwardingModal.jsx";

const GroupsPage = () => {
  const { user } = useAuth();
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

  const handleSubjectSelect = async (subjectID) => {
    setSelectedSubject(subjectID);
    setCurrentStep("assignments");
    setSelectedAssignment(null);

    try {
      let params = ["subjects", subjectID, "assignments"];
      let data = await fetchDynamicRoute("student ", params);
      setAssignments(data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  const handleAssignmentSelect = async (assignmentID) => {
    setSelectedAssignment(assignmentID);
    setCurrentStep("group");

    try {
      const params = [selectedSubject, assignmentID];
      let data = await fetchDynamicRoute("student", params);
      setStudents(data);
      setGroup(students[0].groupId);
    } catch (error) {
      console.error("Error fetching group:", error);
    }
  };

  const handleEvaluateMember = (student) => {
    navigate(`/questionnaire/${student}/${group}`);
  };

  const handleCheckBadges = async () => {
    setBadgeViewingModal(true);
  };
  
  const handleCheckEvalHistory = async (group) => {
    history.push(`/evaluation-history/${group}`);
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
      setCurrentStep("subjects");
    } else if (currentStep === "group") {
      setSelectedAssignment(null);
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
        <AssignmentSection
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
          onBack={handleBack}
          currentUser={uid}
          onCheckBadges={handleCheckBadges}
          onAwardStudent={handleAwardStudent}
          onCheckEvalHistory={handleCheckEvalHistory}
          onEvalMember={handleEvaluateMember}
        />
      )}

      {badgeViewingModal && (
        <BadgeModal group={group} onClose={() => setBadgeViewingModal(false)} />
      )}

      {badgeAwardingModal && (
        <BadgeAwardingModal
          student={selectedStudent}
          group={group}
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
