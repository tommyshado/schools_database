import express from "express";
import SchoolSystemControllers from "../controllers/SchoolSystemControllers";
import { schoolSystem } from "../utils/SchoolSystemDBManager";

const router = express.Router();
const SchoolSystem = new SchoolSystemControllers(schoolSystem);

// ************************* Schools Routes ********************************* //
router.post("/create-school", SchoolSystem.createSchool);
router.get("/get-schools", SchoolSystem.getSchools);

// ************************* Teachers Routes ******************************* //
router.post("/create-teacher", SchoolSystem.createTeacher);
router.get("/get-teachers", SchoolSystem.getTeachers);
router.post("/add-teacher-to-school", SchoolSystem.addTeacherToASchool);

// ************************* Learners Routes ***************************** //
router.post("/create-learner", SchoolSystem.createLearner);
router.get("/get-learners", SchoolSystem.getLearners);
router.post("/add-learner-to-school", SchoolSystem.addLearnerToASchool);
router.post("/change-learner-school", SchoolSystem.changeLearnerSchool);
router.get("/learner-school/:learnerId", SchoolSystem.currentLearnerSchool);

export default router;
