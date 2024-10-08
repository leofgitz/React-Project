import { Enrollment } from "../models/index.js";
const err500 = "Internal Server Error";

const EnrollmentController = {
  createEnrollment: async (req, res) => {
    const { classe, student } = req.body;

    if (!classe || !student) {
      return res.status(400).json({ error: "All fields required" });
    }

    try {
      let enrollment = await Enrollment.findOne({
        where: {
          classe,
          student,
        },
      });

      if (enrollment) {
        return res
          .status(400)
          .json({ error: "This student is already enrolled in this class." });
      }

      enrollment = await Enrollment.create(req.body);
      res.status(201).json(enrollment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getAllEnrollments: async (req, res) => {
    try {
      const enrollments = await Enrollment.findAll({
        order: [["classe", "ASC"]],
      });
      res.status(200).json(enrollments);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getEnrollmentByID: async (req, res) => {
    const id = req.params.id;

    try {
      const enrollment = await Enrollment.findByPk(id);
      if (!enrollment) {
        return res.status(404).json({ error: "Enrollment not found" });
      }
      res.status(200).json(enrollment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  updateEnrollmentByID: async (req, res) => {
    const { id } = req.params;
    const { classe, student } = req.body;

    try {
      const enrollment = await Enrollment.findByPk(id);
      if (!enrollment) {
        return res.status(404).json({ error: "Enrollment not found" });
      }

      if (classe !== undefined && classe !== enrollment.classe) {
        enrollment.classe = classe;
      }
      if (student !== undefined && student !== enrollment.student) {
        enrollment.student = student;
      }

      await enrollment.save();
      res.status(200).json(enrollment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  deleteEnrollment: async (req, res) => {
    const id = req.params.id;

    try {
      const deletedRows = Enrollment.destroy({ where: { id } });
      if (deletedRows === 0) {
        return res.status(404).json({ error: "Enrollment not found" });
      }
      res.status(200).json({ message: "Enrollment removed successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },
  bulkEnrollStudents: async (req, res) => {
    const { classe, students } = req.body;

    try {
      const enrollments = students.map((student) => ({
        classe,
        student,
      }));
      await Enrollment.bulkCreate(enrollments);
      res.status(201).json({ message: "Students enrolled successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },
  getEnrollmentsByClasse: async (req, res) => {
    const { classe } = req.params;

    try {
      const enrollments = await Enrollment.findAll({ where: { classe } });
      res.status(200).json(enrollments);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getEnrollmentsByStudent: async (req, res) => {
    const { student } = req.params;

    try {
      const enrollments = await Enrollment.findAll({ where: { student } });
      res.status(200).json(enrollments);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },
};

export default EnrollmentController;
