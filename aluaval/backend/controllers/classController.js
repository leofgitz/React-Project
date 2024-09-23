import { Class } from "../models/index.js";
const err500 = "Internal Server Error";

const ClassController = {
  createClass: async (req, res) => {
    const { subject, teacher } = req.body;

    if (!subject || !teacher) {
      return res.status(400).json({ error: "All fields required" });
    }
    try {
      const classe = await Class.create(req.body);

      res.status(201).json(classe);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getAllClasses: async (req, res) => {
    try {
      const classes = await Class.findAll();
      res.status(200).json(classes);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getClassByID: async (req, res) => {
    const id = req.params.id;
    try {
      const classe = await Class.findByPk(id);
      if (!classe) {
        return res.status(404).json({ error: "Class not found" });
      }
      res.status(200).json(classe);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  updateClassByID: async (req, res) => {
    const { id } = req.params;
    const { subject, teacher } = req.body;

    try {
      const classe = await Class.findByPk(id);
      if (!classe) {
        return res.status(404).json({ error: "Class not found" });
      }

      classe.subject = subject || classe.subject;
      classe.teacher = teacher || classe.teacher;

      await classe.save();
      res.status(200).json(classe);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  deleteClass: async (req, res) => {
    const id = req.params.id;

    try {
      const deletedRows = Class.destroy({ where: { id } });
      if (deletedRows === 0) {
        return res.status(404).json({ error: "Class not found" });
      }
      res.status(200).json({ message: "Class removed successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },
  
  getClassesBySubject: async (req, res) => {
    const { subject } = req.params;

    try {
      const classes = await Class.findAll({ where: { subject } });

      res.status(200).json(classes);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getClassesByTeacher: async (req, res) => {
    const { teacher } = req.params;

    try {
      const classes = await Class.findAll({ where: { teacher } });
      res.status(200).json(classes);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },
};

export default ClassController;
