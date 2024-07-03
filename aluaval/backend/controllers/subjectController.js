import Subject from "../models/subject";
const err500 = "Internal Server Error";

const SubjectController = {
  createSubject: async (req, res) => {
    const { name, course } = req.body;

    if (!name || !course) {
      return res.status(400).json({ error: "All fields required" });
    }

    try {
      const subject = await Subject.findOne({
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
    const { name, description, courseId } = req.body;
  
    try {
      const subject = await Subject.findByPk(id);
      if (!subject) {
        return res.status(404).json({ error: "Subject not found" });
      }
  
      subject.name = name || subject.name;
      subject.description = description || subject.description;
      subject.courseId = courseId || subject.courseId;
  
      await subject.save();
      res.status(200).json(subject);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },
  

  deleteSubject: async (req, res) => {
    const id = req.params.id;

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
};

export default SubjectController;
