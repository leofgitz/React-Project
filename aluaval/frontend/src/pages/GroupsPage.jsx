import React, { useState, useEffect } from "react";
import {
  getAll,
  updateById,
  fetchDynamicRoute,
} from "../services/dataFetch.js";
import { useAuth } from "../context/authProvider.js";
import { useNavigate } from "react-router-dom";

const GroupsPage = () => {
  const { user } = useAuth();
  const [groups, setGroups] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [badges, setBadges] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupMembers, setGroupMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [memberBadges, setMemberBadges] = useState([]);
  const [showBadgesModal, setShowBadgesModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGroups();
    fetchAssigments();
    fetchBadges();
  }, []);

  const fetchGroups = async () => {
    try {
      const params = ["student", user.id];
      const data = await fetchDynamicRoute("student-groups", params);
      setGroups(data);
    } catch (err) {
      console.error("Error fetching data: ", err);
    }
  };

  const fetchAssigments = async () => {
    try {
      const params = ["assignments", user.id];
      const data = await fetchDynamicRoute("student-groups", params);
      setAssignments(data);
    } catch (err) {
      console.error("Error fetching data: ", err);
    }
  };

  const fetchBadges = async () => {
    try {
      const data = await getAll("badges");
      setBadges(data);
    } catch (err) {
      console.error("Error fetching data: ", err);
    }
  };

  const handleSelectGroup = async (group) => {
    setSelectedGroup(group);
    try {
      const params = ["group", group];
      const data = await fetchDynamicRoute("student-groups", params);
      setGroupMembers(data);
    } catch (err) {
      console.error("Error fetching group members:", err);
    }
  };

  const handleEvaluateMember = (member) => {
    if (member == selectedMember) {
      if (user && selectedGroup) {
        /* const path = evaluation
         /* ? `/questionnaire/${member.id}/${selectedGroup.id}/${evaluation.id}`
          : `/questionnaire/${member.id}/${selectedGroup.id}`; */
        navigate(`/questionnaire/${member.id}/${selectedGroup.id}`);
      }
    } else {
      console.error("Unable to start evaluation:", err);
    }
  };

  const handleShowBadges = async () => {
    try {
      const params = ["student", selectedMember.id];
      const data = await fetchDynamicRoute("group-badges", params);
      setMemberBadges(data);
      setShowBadgesModal(true);
    } catch (err) {
      console.error("Error fetching member badges:", err);
    }
  };

  return (
    <div className="w3-container">
      <h1>Select Group</h1>
      <div className="w3-row-padding w3-margin-bottom">
        {groups.map((group) => (
          <div key={group.id} className="w3-col l3 m6 w3-margin-bottom">
            <h2>{group.assignment.title}</h2>
            <button
              className="w3-button w3-rteal w3-margin-top"
              onClick={() => handleSelectGroup(group)}
            >
              Select Group
            </button>
          </div>
        ))}
      </div>

      {selectedGroup && (
        <div className="w3-container">
          <h2>{selectedGroup.assignment.title}</h2>
          <h3>Group Members</h3>
          <div className="w3-row-padding">
            {groupMembers.map((member) => (
              <div key={member.id} className="w3-col l3 m6 w3-margin-bottom">
                <div
                  className="w3-card w3-hover-shadow w3-padding"
                  /* onClick={() => handleMemberClick(member) }*/
                >
                  <h3>{member.name}</h3>
                  <p>{member.email}</p>
                  <button
                    className="w3-button w3-teal w3-margin-top"
                    onClick={() => handleEvaluateMember(member)}
                  >
                    Evaluate Member
                  </button>
                  {/* <button
                    className="w3-button w3-teal w3-margin-top"
                    onClick={handleShowBadges}
                  >
                    Show Badges
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* {showBadgesModal && (
        <div id="badgesModal" className="w3-modal" style={{ display: "block" }}>
          <div className="w3-modal-content w3-animate-top w3-card-4">
            <header className="w3-container w3-teal">
              <span
                onClick={() => setShowBadgesModal(false)}
                className="w3-button w3-display-topright"
              >
                &times;
              </span>
              <h2>{selectedMember.name}'s Badges</h2>
            </header>
            <div className="w3-container">
              <div className="w3-row-padding">
                {memberBadges.map((badge) => (
                  <div key={badge.id} className="w3-col l3 m6 w3-margin-bottom">
                    <div className="w3-card w3-hover-shadow w3-padding">
                      <h3>{badge.name}</h3>
                      <img src={badge.img_url} alt={badge.name} />
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="w3-button w3-teal w3-margin-top"
                onClick={() => setShowBadgesModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default GroupsPage;
