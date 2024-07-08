import "dotenv/config";
import pkg from "jsonwebtoken";
const { verify } = pkg;

function authentication(req, res, next) {
  const token = req.header("token");

  if (!token) {
    return res.status(401).json({ error: "Missing token" });
  }

  try {
    const decoded = verify(token, process.env.jwtKEY);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid token" });
  }
}

export default authentication;
