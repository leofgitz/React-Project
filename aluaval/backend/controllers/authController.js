import jwt from "jsonwebtoken";
import { Student, Teacher } from "../models/index.js";
import bcrypt from "bcrypt";
import "dotenv/config";

const err500 = "Internal Server Error";

const AuthController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      let user;

      if (email.startsWith("ispg")) {
        user = await Student.findOne({ where: { email } });
      } else {
        user = await Teacher.findOne({ where: { email } });
      }

      const validPass = await bcrypt.compare(password, user.password);

      if (!user || !validPass) {
        return res.status(401).json({ error: "Invalid data" });
      }
      const token = jwt.sign(
        {
          id: user.id,
          userType: user instanceof Teacher ? 1 : 0,
        },
        process.env.jwtKEY,
        { expiresIn: "1h" }
      );

      res.status(200).json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },
};

export default AuthController;
