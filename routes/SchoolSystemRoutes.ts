import express from "express";
import SchoolSystemControllers from "../controllers/SchoolSystemControllers";
import { schoolSystem } from "../utils/SchoolSystemDBManager";

const router = express.Router();
const SchoolSystem = new SchoolSystemControllers(schoolSystem);

// Schools Routes
router.post("/create-school", SchoolSystem.createSchool);
router.get("/get-schools", SchoolSystem.getSchools);

// Teachers Routes
router.post("/create-teacher", SchoolSystem.createTeacher);

export default router;