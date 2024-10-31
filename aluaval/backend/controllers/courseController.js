import { Classe, Course, Enrollment, Subject, User } from "../models/index.js";
const err500 = "Internal Server Error";

const CourseController = {
  createCourse: async (req, res) => {
    const { name, responsibleTeacher } = req.body;

    if (!name || !responsibleTeacher) {
      return res.status(400).json({ error: "All fields required" });
    }

    try {
      let course = await Course.findOne({ where: { name } });

      if (course) {
        return res.status(400).json({ error: "This course already exists" });
      }

      course = await Course.create(req.body);
      res.status(201).json(course);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getAllCourses: async (req, res) => {
    try {
      const courses = await Course.findAll();
      res.status(200).json(courses);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getCourseByID: async (req, res) => {
    const id = req.params.id;
    try {
      const course = await Course.findByPk(id);
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }
      res.status(200).json(course);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  updateCourseByID: async (req, res) => {
    const { id } = req.params;
    const { name, description, teacher } = req.body;

    try {
      const course = await Course.findByPk(id);
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }

      if (name !== undefined && name !== course.name) {
        course.name = name;
      }
      if (description !== undefined && description !== course.description) {
        course.description = description;
      }
      if (teacher !== undefined && teacher !== course.teacher) {
        course.teacher = teacher;
      }

      await course.save();
      res.status(200).json(course);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  deleteCourse: async (req, res) => {
    const { id } = req.params;

    try {
      const deletedRows = await Course.destroy({
        where: { id },
      });

      if (deletedRows === 0) {
        return res.status(404).json({ error: "Course not found" });
      }

      res.status(200).json({ message: "Course removed successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },
  getResponsibleTeacher: async (req, res) => {
    const { id } = req.params;

    try {
      const course = await Course.findByPk(id, { include: User });
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }

      const responsibleTeacher = course.responsibleTeacher;
      res.status(200).json(responsibleTeacher);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },
  getCoursesByTeacher: async (req, res) => {
    const { teacher } = req.params;

    try {
      const courses = await Course.findAll({
        where: { responsibleTeacher: teacher },
      });
      res.status(200).json(courses);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getStudentCourseForStudent: async (req, res) => {
    const student = req.user;

    try {
      const course = await Course.findAll({
        include: [
          {
            model: Subject,
            include: [
              {
                model: Classe,
                include: [
                  {
                    model: Enrollment,
                    where: { student },
                    attributes: [],
                  },
                ],
              },
            ],
          },
        ],
        group: ["Subject.id"],
      });

      res.status(200).json(course);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },
};

export default CourseController;
