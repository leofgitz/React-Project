import User from "../models/user-m";
import Group from "../models/group-m";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import "dotenv/config";
import UserGroupRelation from "../models/user_group_rel-m";

const err500 = "Erro Interno";

const UserController = {
  getUserByID: async (req, res) => {
    const id = req.param.id;

    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: "Utilizador não encontrado" });
      }
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getAllStudents: async (req, res) => {
    try {
      const students = await User.findAll({
        where: { role: 0 },
      });
      res.status(200).json(students);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getStudentsWithoutGroup: async (req, res) => {
    try {
      const groupless = await User.findAll({
        include: [
          {
            model: Group,
            through: {
              model: UserGroupRelation,
            },
            required: false,
          },
        ],
        where: {
          "$Group.id$": null,
        },
      });
      res.status(200).json(groupless);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getUserByEmail: async (req, res) => {
    try {
      const { name } = req.params;

      if (name) {
        const user = await User.findOne({
          where: { name },
        });

        if (!user) {
          return res.status(404).json({ error: "Utilizador não encontrado" });
        }
        res.status(200).json(user);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getStudentByName: async (req, res) => {
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
  },

  createUser: async (req, res) => {
    try {
      const { name, email } = req.body;

      if (!name || !email) {
        return res
          .status(400)
          .json({ error: "Todos os campos são necessários" });
      }

      const existingUser = await User.findOne({
        where: { email },
      });

      if (existingUser) {
        return res
          .status(400)
          .json({ error: "Este endereço eletrónico já existe" });
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
        return res.status(404).json({ error: "Utilizador não encontrado" });
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
        return res.status(404).json({ error: "Utilizador não encontrado" });
      }
      res.status(200).json({ message: "Utilizador removido com sucesso" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email || password) {
        return res.status(400).json({
          error: "Endereço eletrónico e palavra passe são necessários",
        });
      }

      const user = await User.findOne({ where: { email } });
      const validPass = await bcrypt.compare(password, user.password);

      if (!user || !validPass) {
        return res
          .status(401)
          .json({ error: "Endereço eletrónico e palavra passe inválidos" });
      }

      const token = jwt.sign({ id: user.id }, process.env.jwtKEY);

      res.status(200).json({ user, token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },
};

export default UserController;
