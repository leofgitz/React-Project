function isStudent(req, res, next) {
    if (req.user.role !== "Student") {
      return res.status(403).json({ forbidden: "Access denied" });
    }
    next();
  }
  
  export default isStudent;