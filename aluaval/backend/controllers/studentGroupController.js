import StudentGroup from "../models/studentgroup";
const err500 = "Internal Server Error";

const StudentGroupController = {
  createStudentGroup: async (req, res) => {
    const { student, group, subject } = req.body;

    if (!student || !group || !subject) {
      return res.status(400).json({ error: "All fields required" });
    }

    try {
      const studentGroup = await StudentGroup.findOne({
        where: {
          student,
          subject,
        },
      });

      if (studentGroup) {
        return res.status(400).json({
          error: "This student is already in a group for this subject",
        });
      }

      studentGroup = await StudentGroup.create(req.body);
      res.status(201).json(studentGroup);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getAllStudentGroups: async (req, res) => {
    try {
      const studentGroups = await StudentGroup.findAll();
      res.status(200).json(studentGroups);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getStudentGroupByID: async (req, res) => {
    const id = req.params.id;

    try {
      const studentGroup = await StudentGroup.findByPk(id);
      if (!studentGroup) {
        return res.status(404).json({ error: "Entry not found" });
      }
      res.status(200).json(studentGroup);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  updateStudentGroupByID: async (req, res) => {
    const { id } = req.params;
    const { student, group, subject } = req.body;

    try {
      const studentGroup = await StudentGroup.findByPk(id);
      if (!studentGroup) {
        return res.status(404).json({ error: "StudentGroup not found" });
      }

      studentGroup.studentId = student || studentGroup.studentId;
      studentGroup.groupId = group || studentGroup.groupId;
      studentGroup.subjectId = subject || studentGroup.subjectId;

      await studentGroup.save();
      res.status(200).json(studentGroup);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  deleteStudentGroup: async (req, res) => {
    const id = req.params.id;

    try {
      const deletedRows = await StudentGroup.destroy({ where: { id } });

      if (deletedRows === 0) {
        return res.status(404).json({ error: "Entry not found" });
      }

      res.status(200).json({ message: "Entry deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },
};

export default StudentGroupController;
