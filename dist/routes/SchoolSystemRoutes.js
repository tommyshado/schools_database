"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SchoolSystemControllers_1 = __importDefault(require("../controllers/SchoolSystemControllers"));
const SchoolSystemDBManager_1 = require("../utils/SchoolSystemDBManager");
const router = express_1.default.Router();
const SchoolSystem = new SchoolSystemControllers_1.default(SchoolSystemDBManager_1.schoolApp);
// ************************* Schools Routes ********************************* //
router.post("/create-school", SchoolSystem.createSchool);
router.get("/get-schools", SchoolSystem.getSchools);
router.get("/school-search", SchoolSystem.getSchool);
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
router.get("/learner-school", SchoolSystem.currentLearnerSchool);
// ************************* Grades Routes ******************************** //
router.post("/create-grade", SchoolSystem.createGrade);
router.get("/get-grades", SchoolSystem.getGrades);
exports.default = router;
