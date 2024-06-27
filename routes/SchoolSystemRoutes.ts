import express from "express";
import SchoolSystemControllers from "../controllers/SchoolSystemControllers";
import { schoolApp } from "../utils/SchoolSystemDBManager";

const router = express.Router();
const SchoolSystem = new SchoolSystemControllers(schoolApp);

// ************************* Schools Routes ********************************* //
router.post("/create-school", SchoolSystem.createSchool);
router.get("/get-schools", SchoolSystem.getSchools);

// ************************* Teachers Routes ******************************* //
router.post("/create-teacher", SchoolSystem.createTeacher);
router.get("/get-teachers", SchoolSystem.getTeachers);
router.post("/add-teacher-to-school", SchoolSystem.addTeacherToASchool);
router.post("add-teacher-to-subject", SchoolSystem.addTeacherToASubject);

// ************************* Learners Routes ***************************** //
router.post("/create-learner", SchoolSystem.createLearner);
router.get("/get-learners", SchoolSystem.getLearners);
router.post("/add-learner-to-school", SchoolSystem.addLearnerToASchool);
router.post("/change-learner-school", SchoolSystem.changeLearnerSchool);
router.get("/learner-school/:learnerId", SchoolSystem.currentLearnerSchool);

// ************************* Grades Routes ******************************** //
router.post("/create-grade", SchoolSystem.createGrade);
router.get("/get-grades", SchoolSystem.getGrades);

export default router;
