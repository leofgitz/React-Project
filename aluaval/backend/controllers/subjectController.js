import { Class, Subject } from "../models/index.js";
const err500 = "Internal Server Error";

const SubjectController = {
  createSubject: async (req, res) => {
    const { name, course } = req.body;

    if (!name || !course) {
      return res.status(400).json({ error: "All fields required" });
    }

    try {
      let subject = await Subject.findOne({
        where: {
          name,
          course,
        },
      });

      if (subject) {
        return res
          .status(400)
          .json({ error: "This subject already is part of this course." });
      }

      subject = await Subject.create(req.body);
      res.status(201).json(subject);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getAllSubjects: async (req, res) => {
    try {
      const subjects = await Subject.findAll();
      res.status(200).json(subjects);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getSubjectByID: async (req, res) => {
    const id = req.params.id;
    try {
      const subject = await Subject.findByPk(id);
      if (!subject) {
        return res.status(404).json({ error: "Subject not found" });
      }
      res.status(200).json(subject);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  updateSubjectByID: async (req, res) => {
    const { id } = req.params;
    const { name, description, course } = req.body;

    try {
      const subject = await Subject.findByPk(id);
      if (!subject) {
        return res.status(404).json({ error: "Subject not found" });
      }

      if (name !== undefined && name !== subject.name) {
        subject.name = name;
      }
      if (description !== undefined && description !== subject.description) {
        subject.description = description;
      }
      if (course !== undefined && course !== subject.course) {
        subject.course = course;
      }

      await subject.save();
      res.status(200).json(subject);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  deleteSubject: async (req, res) => {
    const { id } = req.params;

    try {
      const deletedRows = await Subject.destroy({ where: { id } });
      if (deletedRows === 0) {
        return res.status(404).json({ error: "Subject not found" });
      }

      res.status(200).json({ message: "Subject removed successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getSubjectsByCourse: async (req, res) => {
    const { course } = req.params;
    try {
      const subjects = await Subject.findAll({ where: { course } });
      res.status(200).json(subjects);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },
  getSubjectsByYear: async (req, res) => {
    const { year } = req.params;
    try {
      const subjects = await Subject.findAll({ where: { year } });
      res.status(200).json(subjects);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },
  getSubjectsForTeacher: async (req, res) => {
    const { teacher } = req.params;

    try {
      const subjects = await Subject.findAll({
        include: [
          {
            model: Class,
            where: { teacher },
            attributes: [],
          },
        ],
        group: ["Subject.id"],
      });

      res.status(200).json(subjects);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },
  getTeacherSubjectsForHomepage: async (req, res) => {
    const { teacher } = req.params;

    try {
      const subjects = await Subject.findAll({
        include: [
          {
            model: Class,
            where: { teacher },
            attributes: [],
          },
        ],
        group: ["Subject.id"],
        order: [["createdAt", "DESC"]],
        limit: 3,
      });

      res.status(200).json(subjects);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },
};
export default SubjectController;
