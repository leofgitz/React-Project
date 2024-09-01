import { Class, Enrollment, Group, User } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
const err500 = "Internal Server Error";
const domain = "@ispgaya.pt";

const generateEmail = async () => {
  const prefix = "ispg";

  const currentYear = new Date().getFullYear();
  let email;
  let emailExists = true;

  while (emailExists) {
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    email = `${prefix}${currentYear}${randomDigits}${domain}`;

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ where: { email: uniqueEmail } });
    if (!existingUser) {
      emailExists = false;
    }
  }

  return uniqueEmail;
};

const UserController = {
  createUser: async (req, res) => {
    const { name, surname, email, password, role } = req.body;
    try {
      if (!email) {
        email = generateEmail();
      } else email += domain;

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name,
        surname,
        email: email,
        password: hashedPassword,
        role: role || "Student",
      });
      res.status(201).json({ user: newUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getAllStudents: async (req, res) => {
    try {
      const students = await User.findAll({
        where: { role: "Student" },
      });
      res.status(200).json(students);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

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

  updateUserByID: async (req, res) => {
    const { id } = req.params;
    const { name, surname, email, password } = req.body;

    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      user.name = name || user.name;
      user.surname = surname || user.surname;
      user.email = email || user.email;
      user.password = password
        ? await bcrypt.hash(password, 10)
        : user.password;

      await user.save();
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  deleteUser: async (req, res) => {
    const id = req.params.id;

    try {
      const deletedRows = await User.destroy({
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

  updatePassword: async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const id = req.user.id;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Incorrect password" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
      res.status(200).json({ message: "Password updated successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getStudentsInGroup: async (req, res) => {
    const { assignment } = req.params;

    try {
      const colleagues = await User.findAll({
        include: [
          {
            model: Enrollment,
            attributes: [],
            include: [
              {
                model: Class,
                attributes: [],
                include: [
                  {
                    model: Group,
                    where: { assignment },
                  },
                ],
              },
            ],
          },
        ],
        group: ["User.id"],
      });

      res.status(200).json(colleagues);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  resetPassword: async (req, res) => {},
};

export default UserController;
