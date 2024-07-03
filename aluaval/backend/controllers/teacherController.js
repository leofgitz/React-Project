import Teacher from "../models/teacher";
const err500 = "Internal Server Error";

const TeacherController = {
  createTeacher: async (req, res) => {
    const { name, surname, email, password } = req.body;

    if (!name || !surname || !email || !password) {
      return res.status(400).json({ error: "All fields required" });
    }

    try {
      const user = await Teacher.findOne({ where: { email } });
      if (user) {
        return res
          .status(400)
          .json({ error: "This user is already in the database" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      user = await Teacher.create({
        name,
        surname,
        email,
        password: hashedPassword,
      });

      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getAllTeachers: async (req, res) => {
    try {
      const teachers = await Teacher.findAll();
      res.status(200).json(teachers);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getTeacherByID: async (req, res) => {
    const id = req.params.id;

    try {
      const user = await Teacher.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  updateTeacherByID: async (req, res) => {
    const { id } = req.params;
    const { name, surname, email, password } = req.body;

    try {
      const teacher = await Teacher.findByPk(id);
      if (!teacher) {
        return res.status(404).json({ error: "Teacher not found" });
      }

      teacher.name = name || teacher.name;
      teacher.surname = surname || teacher.surname;
      teacher.email = email || teacher.email;
      teacher.password = password
        ? await bcrypt.hash(password, 10)
        : teacher.password;

      await teacher.save();
      res.status(200).json(teacher);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  deleteTeacher: async (req, res) => {
    const id = req.params.id;

    try {
      const deletedRows = await Teacher.destroy({
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

export default TeacherController;
