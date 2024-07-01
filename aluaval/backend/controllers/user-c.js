import User from "../models/user-m"; 
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import "dotenv/config";
import UserSubjectRelation from "../models/user_subject_rel-m";

const err500 = "Internal Server Error";

const UserController = {
  getUserByID: async (req, res) => {
    const id = req.params.id;

    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getAllStudents: async (req, res) => {
    try {
      const { id } = req.params;

      const userSubjectRelations = await UserSubjectRelation.findAll({
        where: { teacher: id },
      });

      const subjectIDs = userSubjectRelations.map(
        (relation) => relation.subject
      );

      const students = await User.findAll({
        where: { role: 0 },
        include: [
          {
            model: UserSubjectRelation,
            where: {
              subject: subjectIDs,
            },
            attributes: [],
          },
        ],
        attributes: {
          include: [
            [
              sequelize.literal(`
                EXISTS (
                SELECT 1
                FROM UserGroupRelation
                WHERE UserGroupRelation.student = User.id
                )
                `),
              "inGroup",
            ],
          ],
        },
        raw: true,
      });
      res.status(200).json(students);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  /*   getStudentsWithoutGroup: async (req, res) => {
    try {
      const studentsWithGroupIDs = await UserGroupRelation.findAll({
        attributes: ["student"],
        raw: true,
      });

      const studentIDs = studentsWithGroupIDs.map(
        (relation) => relation.student
      );

      const groupless = await User.findAll({
        where: {
          id: {
            [Op.notIn]: studentIDs,
          },
        },
      });
      res.status(200).json(groupless);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  }, */

  /* getStudentByName: async (req, res) => {
    try {
      const { name } = req.params;

      if (name) {
        const users = await User.findAll({
          where: {
            role: 0,
            name: {
              [Op.like]: `%${name}%`,
            },
          },
          attributes: {
            include: [
              [
                sequelize.literal(`
                  EXISTS (
                    SELECT 1
                    FROM UserGroupRelation
                    WHERE UserGroupRelation.student = User.id
                  )
                `),
                "inGroup",
              ],
            ],
          },
          raw: true,
        });

        if (users.length === 0) {
          return res
            .status(404)
            .json({ error: "Não foi encontrado nenhum utilizador" });
        }

        res.status(200).json(users);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  }, */

  createUser: async (req, res) => {
    try {
      const { name, email } = req.body;

      if (!name || !email) {
        return res
          .status(400)
          .json({ error: "All fields are necessary" });
      }

      const existingUser = await User.findOne({
        where: { email },
      });

      if (existingUser) {
        return res
          .status(400)
          .json({ error: "This email is already in use" });
      }

      const password = crypto.randomBytes(10).toString("hex");
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        nome,
        password: hashedPassword,
        email,
      });

      res.status(201).json({ newUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  updatePassword: async (req, res) => {
    const id = req.params.id;
    const { password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const [updatedRows, [updatedUser]] = await User.update(
        { password: hashedPassword },
        {
          where: { id: id },
          returning: true,
        }
      );

      if (updatedRows === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({ updatedUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  deleteUser: async (req, res) => {
    const id = req.params.id;
    try {
      const deletedRows = await User.destroy({
        where: { id: id },
      });
      if (deletedRows === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ message: "User successfully deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          error: "All fields are necessary",
        });
      }

      const user = await User.findOne({ where: { email } });
      const validPass = await bcrypt.compare(password, user.password);

      if (!user || !validPass) {
        return res
          .status(401)
          .json({ error: "Invalid data" });
      }

      const token = jwt.sign({ id: user.id }, process.env.jwtKEY, {
        expiresIn: "1h",
      });

      res.status(200).json({ user, token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },
};

export default UserController;
