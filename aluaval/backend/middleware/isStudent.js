import { User } from "../models/index.js";

async function isStudent(req, res, next) {
  try {
    const user = await User.findByPk(req.user); // Ensure you use the correct identifier

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the user's role is "Student"
    if (user.role !== "Student") {
      return res.status(403).json({ forbidden: "Access denied" });
    }

    // If the user is a student, proceed to the next middleware
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export default isStudent;
