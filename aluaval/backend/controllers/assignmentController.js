import {
  Assignment,
  Group,
  Membership,
  Subject,
  Classe,
  Enrollment,
} from "../models/index.js";
import { Op } from "sequelize";

const err500 = "Internal Server Error";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0"); // Get day and pad with zero if needed
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (0-indexed) and pad
  const year = date.getFullYear(); // Get full year

  return `${day}/${month}/${year}`; // Format as 'dd mm yyyy'
};

const AssignmentController = {
  createAssignment: async (req, res) => {
    const { title, dueDate } = req.body;

    if (!title || !dueDate) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      const assignment = await Assignment.create(req.body);
      res.status(201).json(assignment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getAllAssignments: async (req, res) => {
    try {
      const assignments = await Assignment.findAll();
      res.status(200).json(assignments);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getAssignmentByID: async (req, res) => {
    const id = req.params.id;

    try {
      const assignment = await Assignment.findByPk(id);
      if (!assignment) {
        return res.status(404).json({ error: "Assignment not found" });
      }
      res.status(200).json(assignment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  updateAssignmentByID: async (req, res) => {
    const id = req.params.id;
    const { title, dueDate } = req.body;

    try {
      const assignment = await Assignment.findByPk(id);
      if (!assignment) {
        return res.status(404).json({ error: "Assignment not found" });
      }

      if (title != undefined && title !== assignment.title) {
        assignment.title = title;
      }
      if (dueDate != undefined && dueDate !== assignment.dueDate) {
        assignment.dueDate = dueDate;
      }

      await assignment.save();
      res.status(200).json(assignment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  deleteAssignment: async (req, res) => {
    const id = req.params.id;

    try {
      const deletedRows = await Assignment.destroy({ where: { id } });
      if (deletedRows === 0) {
        return res.status(404).json({ error: "Assignment not found" });
      }
      res.status(200).json({ message: "Assignment removed successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getAssignmentsForTeacherBasedOnSubject: async (req, res) => {
    const teacher = req.user; // Get the logged-in teacher
    const { subject } = req.params; // Get the subject ID from the route parameter

    try {
      const assignments = await Assignment.findAll({
        attributes: ["id", "title", "dueDate"], // Include the assignment fields you want
        where: {
          subject, // Filter by the subject ID
          teacher, // Filter by the teacher ID
        },
        /* include: [
          {
            model: Group,
            required: true, // Ensure only groups related to the teacher's classes are included
            attributes: [], // No need to get fields from Group
            include: [
              {
                model: Classe,
                where: { teacher }, // Filter by teacher only (subject is already in assignment)
                attributes: [], // No need to retrieve any additional fields from Classe
              },
            ],
          },
        ], */
        group: ["Assignment.id"], // Group by Assignment ID
      });

      // Transform the result to extract the required fields
      const result = assignments.map((assignment) => ({
        id: assignment.id,
        title: assignment.title,
        dueDate: formatDate(assignment.dueDate),
      }));

      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getAssignmentsForStudentBasedOnSubject: async (req, res) => {
    const student = req.user; // Get the logged-in student's ID
    const { subject } = req.params; // Get the subject ID from the route parameter

    // PLS CHECK OTHER POSSIBLE WAYS TO DO THIS
    try {
      const assignments = await Assignment.findAll({
        attributes: ["id", "title", "dueDate", "createdAt"], // Include the fields needed
        where: { subject }, // Filter by subject ID
        include: [
          {
            model: Group,
            attributes: ["id"],
          },
        ],
        group: ["Assignment.id", "Groups.id"], // Group by Assignment ID to avoid duplicates
      });

      const memberships = await Membership.findAll({
        attributes: ["group"],
        where: { student },
      });

      const groupIds = memberships.map((m) => m.group);

      const filteredAssignments = assignments.filter((assignment) =>
        assignment.Groups.some((group) => groupIds.includes(group.id))
      );

      const result = filteredAssignments.map((assignment) => ({
        id: assignment.id,
        title: assignment.title,
        dueDate: formatDate(assignment.dueDate),
        creationDate: formatDate(assignment.createdAt),
      }));

      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getAssignmentsForStudents: async (req, res) => {
    const student = req.user;

    try {
      const assignments = await Assignment.findAll({
        include: [
          {
            model: Group,
            attributes: ["id", "submissionDate"],
          },
          {
            model: Membership,
            where: { student },
            attributes: [],
          },
        ],
        group: ["Assignment.id"],
      });

      res.status(200).json(assignments);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getTeacherAssignmentsForHomepage: async (req, res) => {
    const teacher = req.user; // Get the logged-in teacher's ID

    try {
      const assignments = await Assignment.findAll({
        where: { teacher }, // Filter by the logged-in teacher
        include: [
          {
            model: Subject,
            attributes: ["name"], // Include subject details
            /* include: {
              model: Classe,
              attributes: [], // You can adjust or remove this as needed
              include: {
                model: Group,
                attributes: ["id", "number", "submissionDate"], // Include group attributes
              },
            }, */
          },
        ],
        group: ["Assignment.id"], // Group by these to avoid duplicates
        order: [["createdAt", "DESC"]], // Order by creation date
        limit: 3, // Limit results to the latest 3 assignments
      });

      res.status(200).json(assignments); // Return the filtered assignments
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getStudentAssignmentsForHomepage: async (req, res) => {
    const student = req.user; // Get the logged-in student

    try {
      // Step 1: Get all groups the student is a member of
      const memberships = await Membership.findAll({
        where: { student },
        attributes: ["group"],
      });

      const groupIDs = memberships.map((m) => m.group);

      if (groupIDs.length === 0) {
        return res.status(200).json([]); // No groups, no assignments
      }

      // Step 2: Get groups (with their assignments) the student is part of
      const groups = await Group.findAll({
        where: {
          id: {
            [Op.in]: groupIDs,
          },
          assignment: {
            [Op.ne]: null,
          }, // just in case
        },
        include: [
          {
            model: Assignment,
            include: [
              {
                model: Subject, // or go via Classe if needed
                attributes: ["name"],
              },
            ],
          },
        ],
      });

      // Step 3: Flatten assignments, remove nulls, and sort by date
      const assignments = groups
        .map((g) => g.Assignment)
        .filter((a) => a !== null)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);

      res.status(200).json(assignments);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching assignments." }); // Error handling
    }
  },
};

export default AssignmentController;
