import { Op } from "sequelize";
import {
  Classe,
  Enrollment,
  Group,
  User,
  Membership,
} from "../models/index.js";
import bcrypt from "bcrypt";
import "dotenv/config";
const err500 = "Internal Server Error";
const domain = "@ispgaya.pt";

const generateEmail = (role, name) => {
  const currentYear = new Date().getFullYear();
  const randomDigits = Math.floor(100000 + Math.random() * 900000);
  let prefix, email;
  if (role != "Student") {
    prefix = name
      .split(" ")
      .map((word) => word[0].toLowerCase())
      .join("");
  } else {
    prefix = "ispg" + currentYear + randomDigits;
  }
  email = `${prefix}${domain}`;

  return email;
};

const UserController = {
  createUser: async (req, res) => {
    const { name, password, role } = req.body;
    const email = generateEmail(role, name);
    try {
      const existingUser = await User.findOne({ where: { email: email } });

      if (existingUser) {
        return res.status(400).json({ error: "User already in database" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
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
    const { name, email, password } = req.body;

    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (name !== undefined && name !== user.name) {
        user.name = name;
      }
      if (email !== undefined && email !== user.email) {
        user.email = email;
      }
      if (password !== undefined) {
        const hashedPassword = await bcrypt.hash(password, 10);
        if (hashedPassword !== user.password) {
          user.password = hashedPassword;
        }
      }

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
        attributes: ["id", "name"],
        include: [
          {
            model: Enrollment,
            attributes: [],
            include: [
              {
                model: Classe,
                attributes: [],
                include: [
                  {
                    model: Group,
                    where: { assignment },
                    attributes: ["id", "number"],
                  },
                ],
              },
            ],
          },
        ],
        group: ["User.id"],
      });
      const result = colleagues.map((student) => ({
        id: student.id,
        name: student.name,
        groupId: student.Enrollments[0]?.Classe?.Groups[0]?.id || null,
        groupNumber: student.Enrollments[0]?.Classe?.Groups[0]?.number || null,
      }));

      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getStudentsAndGroupsForAssignment: async (req, res) => {
    const teacher = req.user; // Logged-in teacher's ID
    const { subject, assignment } = req.params; // Route parameters

    try {
      const students = await User.findAll({
        attributes: ["id", "name"],
        where: { role: "Student" }, // Select student details
        include: [
          {
            model: Enrollment,
            attributes: [], // No need to return enrollment details
            include: [
              {
                model: Classe,
                where: { teacher, subject }, // Filter by teacher and subject
                attributes: [], // No need to return class details
              },
            ],
          },
          {
            model: Group,
            through: { attributes: [] }, // Exclude Membership join table details
            attributes: ["id", "number"], // Group details
            where: { assignment }, // Filter by assignment
            required: false, // Include students without a group
          },
        ],
      });

      // Transform results to include group data or indicate unassigned
      const result = students.map((student) => ({
        id: student.id,
        name: student.name,
        groupID: student.Groups[0]?.id || null,
        groupNumber: student.Groups[0]?.number || null,
      }));

      res.status(200).json(result); // Return the result
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "An error occurred while fetching students and groups.",
      });
    }
  },

  getUsersInGroupForAssignment: async (req, res) => {
    const { subject, assignment } = req.params; // Get subject and assignment from route parameters

    try {
      // Find all users in the group for the specified subject and assignment
      const usersInGroup = await User.findAll({
        attributes: ["id", "name"], // Get student details
        include: [
          {
            model: Enrollment,
            attributes: [], // We don’t need attributes from Enrollment
            include: [
              {
                model: Classe,
                where: { teacher, subject }, // Filter by teacher and subject
                attributes: [], // We don’t need attributes from Classe
                include: [
                  {
                    model: Group,
                    attributes: ["id", "number"], // Get group details if they exist
                    where: { assignment }, // Filter by assignment
                    required: false, // Include students even if they are not part of a group
                  },
                ],
              },
            ],
          },
          {
            model: Group, // Include Group directly
            attributes: ["id", "number"],
            through: { attributes: [] }, // Exclude attributes from Membership
            required: false, // Include students even if not part of any group
          },
        ],
      });

      // Transform the result to include group details
      const result = usersInGroup.map((user) => ({
        id: user.id,
        name: user.name,
        groupId: user.Memberships[0]?.group?.id || null, // Group ID or null
        groupNumber: user.Memberships[0]?.group?.number || null, // Group number or null
      }));

      res.status(200).json(result); // Return the result
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error:
          "An error occurred while fetching users in the group for the assignment.",
      });
    }
  },

  /* resetPassword: async (req, res) => {}, */
};

export default UserController;
