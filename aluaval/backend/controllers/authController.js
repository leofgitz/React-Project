import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import "dotenv/config";

const err500 = "Internal Server Error";

const AuthController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        return res.status(400).json({ error: "All fields necessary" });
      }

      const user = await User.findOne({ where: { email } });

      const validPass = await bcrypt.compare(password, user.password);

      if (!user || !validPass) {
        return res.status(401).json({ error: "Invalid data" });
      }
      const token = jwt.sign(
        {
          id: user.id,
        },
        process.env.jwtKEY,
        { expiresIn: "1h" }
      );

      res.status(200).json({ user, token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  }
};

export default AuthController;
