import { Student } from "../models/index.js";
import bcrypt from "bcrypt";
const err500 = "Internal Server Error";

const StudentController = {
  createStudent: async (req, res) => {
    const { name, surname, email, password } = req.body;

    if (!name || !surname || !email || !password) {
      return res.status(400).json({ error: "All fields required" });
    }

    try {
      let user = await Student.findOne({ where: { email } });

      if (user) {
        return res
          .status(400)
          .json({ error: "This student already is in the database" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      user = await Student.create({
        name,
        surname,
        email,
        password: hashedPassword,
      });

      res.status(201).json({ user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getAllStudents: async (req, res) => {
    try {
      const students = await Student.findAll();
      res.status(200).json(students);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getStudentByID: async (req, res) => {
    const id = req.params.id;

    try {
      const user = await Student.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  updateStudentByID: async (req, res) => {
    const { id } = req.params;
    const { name, surname, email, password } = req.body;

    try {
      const student = await Student.findByPk(id);
      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }

      student.name = name || student.name;
      student.surname = surname || student.surname;
      student.email = email || student.email;
      student.password = password
        ? await bcrypt.hash(password, 10)
        : student.password;

      await student.save();
      res.status(200).json(student);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  deleteStudent: async (req, res) => {
    const id = req.params.id;

    try {
      const deletedRows = await Student.destroy({
        where: { id },
      });

      if (deletedRows === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({ message: "User removed successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },
};

export default StudentController;
