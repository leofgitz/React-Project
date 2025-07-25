import { Classe } from "../models/index.js";
const err500 = "Internal Server Error";

const ClasseController = {
  createClass: async (req, res) => {
    const { subject } = req.body;
    const teacher = req.user;

    if (!subject || !teacher) {
      return res.status(400).json({ error: "All fields required" });
    }
    try {
      const classe = await Classe.create(req.body);

      res.status(201).json(classe);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getAllClasses: async (req, res) => {
    try {
      const classes = await Classe.findAll();
      res.status(200).json(classes);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getClassByID: async (req, res) => {
    const id = req.params.id;
    try {
      const classe = await Classe.findByPk(id);
      if (!classe) {
        return res.status(404).json({ error: "Classe not found" });
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
      const classe = await Classe.findByPk(id);
      if (!classe) {
        return res.status(404).json({ error: "Classe not found" });
      }

      if (subject !== undefined && subject !== classe.subject) {
        classe.subject = subject;
      }
      if (teacher !== undefined && teacher !== classe.teacher) {
        classe.teacher = teacher;
      }

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
      const deletedRows = Classe.destroy({ where: { id } });
      if (deletedRows === 0) {
        return res.status(404).json({ error: "Classe not found" });
      }
      res.status(200).json({ message: "Classe removed successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getClassesBySubject: async (req, res) => {
    const { subject } = req.params;

    try {
      const classes = await Classe.findAll({ where: { subject } });

      res.status(200).json(classes);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getClassesByTeacher: async (req, res) => {
    const { teacher } = req.params;

    try {
      const classes = await Classe.findAll({ where: { teacher } });
      res.status(200).json(classes);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getClassBySubjectAndTeacher: async (req, res) => {
    const teacher = req.user;
    const { subjectID } = req.body;

    try {
      const classe = await Classe.findOne({
        where: { teacher, subject: subjectID },
      });
      res.status(200).json(classe);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getClassForGroupMaking: async (req, res) => {
    const teacher = req.user;
    const { subject } = req.params;

    try {
      const classe = await Classe.findOne({
        where: { subject, teacher },
        attributes: ["id"],
      });

      if (!classe) {
        return res
          .status(404)
          .json({ error: "No class found for this subject and teacher." });
      }

      res.status(200).json({ id: classe.id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },
};

export default ClasseController;
