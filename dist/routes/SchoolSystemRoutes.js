"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SchoolSystemControllers_1 = __importDefault(require("../controllers/SchoolSystemControllers"));
const SchoolSystemDBManager_1 = require("../utils/SchoolSystemDBManager");
const router = express_1.default.Router();
const SchoolSystem = new SchoolSystemControllers_1.default(SchoolSystemDBManager_1.schoolSystem);
// Schools Routes
router.post("/create-school", SchoolSystem.createSchool);
router.get("/get-schools", SchoolSystem.getSchools);
// Teachers Routes
router.post("/create-teacher", SchoolSystem.createTeacher);
exports.default = router;
