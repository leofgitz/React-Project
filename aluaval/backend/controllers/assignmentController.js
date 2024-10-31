import {
  Assignment,
  Group,
  Membership,
  Subject,
} from "../models/index.js";

const err500 = "Internal Server Error";

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
        attributes: ["id", "title", "duedate"], // Include the assignment fields you want
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
        dueDate: assignment.duedate,
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

    try {
      const assignments = await Assignment.findAll({
        attributes: ["id", "title", "duedate"], // Include the fields needed
        where: { subject }, // Filter by subject ID
        include: [
          {
            model: Group,
            attributes: [], // Exclude unnecessary Group attributes
            required: true,
            include: [
              {
                model: Classe,
                attributes: [], // Exclude unnecessary Classe attributes
                where: { subject }, // Additional filter for subject
                include: [
                  {
                    model: Enrollment,
                    where: { student: student }, // Filter by enrolled student ID
                    attributes: [], // Exclude unnecessary Enrollment attributes
                  },
                ],
              },
            ],
          },
        ],
        group: ["Assignment.id"], // Group by Assignment ID to avoid duplicates
      });

      // Transform the result to extract the required fields
      const result = assignments.map((assignment) => ({
        id: assignment.id,
        title: assignment.title,
        dueDate: assignment.duedate,
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
            include: [
              {
                model: Membership,
                where: { student },
                attributes: [],
              },
            ],
            attributes: ["id", "submissionDate"],
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
    const teacher = req.user; // Get the logged-in teacher

    try {
      const assignments = await Assignment.findAll({
        where: { teacher }, // Ensure assignments are for the logged-in teacher
        include: [
          {
            model: Group,
            attributes: ["id", "number", "submissionDate"], // Get group details
          },
          {
            model: Subject,
            attributes: ["name"], // Include subject name directly from Assignment
          },
        ],
        group: ["Assignment.id"], // Group by assignment ID
        order: [["createdAt", "DESC"]], // Order by creation date
        limit: 3, // Limit results to the latest 3 assignments
      });

      res.status(200).json(assignments); // Return assignments
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getStudentAssignmentsForHomepage: async (req, res) => {
    const student = req.user; // Get the logged-in student

    try {
      const assignments = await Assignment.findAll({
        include: [
          {
            model: Group,
            include: [
              {
                model: Membership,
                where: { student: student.id }, // Ensure the membership is for the logged-in student
                attributes: [],
              },
            ],
            attributes: ["id", "submissionDate"], // Include group attributes for the assignment
          },
          {
            model: Subject,
            attributes: ["name"], // Include subject name directly from Assignment
          },
        ],
        group: ["Assignment.id"], // Group by assignment ID
        order: [["createdAt", "DESC"]], // Order by creation date
        limit: 3, // Limit results to the latest 3 assignments
      });

      res.status(200).json(assignments); // Return assignments
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching assignments." }); // Error handling
    }
  },
};

export default AssignmentController;
