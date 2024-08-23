function isTeacher(req, res, next) {
  if (req.user.role !== "Teacher") {
    return res.status(403).json({ forbidden: "Access denied" });
  }
  next();
}

export default isTeacher;
