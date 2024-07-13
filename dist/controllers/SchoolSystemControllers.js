"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class SchoolSystemControllers {
    constructor(schoolSystem) {
        this.schoolSystem = schoolSystem;
        this.createSchool = this.createSchool.bind(this);
        this.getSchools = this.getSchools.bind(this);
        this.getSchool = this.getSchool.bind(this);
        this.createTeacher = this.createTeacher.bind(this);
        this.getTeachers = this.getTeachers.bind(this);
        this.addTeacherToASchool = this.addTeacherToASchool.bind(this);
        this.createLearner = this.createLearner.bind(this);
        this.getLearners = this.getLearners.bind(this);
        this.addLearnerToASchool = this.addLearnerToASchool.bind(this);
        this.changeLearnerSchool = this.changeLearnerSchool.bind(this);
        this.currentLearnerSchool = this.currentLearnerSchool.bind(this);
        this.createGrade = this.createGrade.bind(this);
        this.getGrades = this.getGrades.bind(this);
        this.addTeacherToASubject = this.addTeacherToASubject.bind(this);
    }
    // *************************** Schools Controllers **************************** //
    createSchool(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, region } = req.body;
                if (typeof name === "string" &&
                    name &&
                    typeof region === "string" &&
                    region) {
                    const results = yield this.schoolSystem.createSchools(name, region);
                    if (results)
                        res.status(201).json({ message: "success" });
                    else
                        res.status(409).json({ message: `${name} already exist.` });
                }
                else {
                    res
                        .status(400)
                        .send("Invalid input: 'name' and 'region' must be strings");
                }
            }
            catch (error) {
                res
                    .status(400)
                    .json({ message: "An error occurred while creating a school." });
            }
        });
    }
    getSchools(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schools = yield this.schoolSystem.getSchools();
                res.status(200).json(schools);
            }
            catch (error) {
                res
                    .status(500)
                    .json({ message: "An error occurred while fetching the schools." });
            }
        });
    }
    getSchool(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { school, region } = req.query;
            try {
                let foundSchool;
                if (!school && !region) {
                    res.status(404).send("Please enter a school or region");
                }
                else if (!school) {
                    foundSchool = yield this.schoolSystem.getSchool(null, region);
                }
                else if (!region) {
                    foundSchool = yield this.schoolSystem.getSchool(school, null);
                }
                else {
                    foundSchool = yield this.schoolSystem.getSchool(school, region);
                }
                res.status(200).json(foundSchool);
            }
            catch (error) {
                res
                    .status(500)
                    .json({ message: "An error occurred while fetching a school." });
            }
        });
    }
    // ************************* Teachers Controllers **************************** //
    createTeacher(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { firstName, lastName, email } = req.body;
                if (typeof firstName === "string" &&
                    firstName &&
                    typeof lastName === "string" &&
                    lastName &&
                    typeof email === "string" &&
                    email) {
                    const results = yield this.schoolSystem.createATeacher({
                        firstName,
                        lastName,
                        email,
                    });
                    if (results)
                        res.status(201).json({ message: "success" });
                    else
                        res
                            .status(409)
                            .json({ message: `Teacher with ${email} email already exist.` });
                }
                else {
                    res
                        .status(400)
                        .send("Invalid input: 'firstName', 'lastName' and 'email' must be strings & length must be greater than 0");
                }
            }
            catch (error) {
                res
                    .status(400)
                    .json({ message: "An error occurred while creating a teacher." });
            }
        });
    }
    getTeachers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const teachers = yield this.schoolSystem.getTeachers();
                res.status(200).json(teachers);
            }
            catch (error) {
                res
                    .status(500)
                    .json({ message: "An error occurred while fetching the teachers." });
            }
        });
    }
    addTeacherToASchool(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { teacherId, schoolId } = req.body;
                if (typeof teacherId === "number" &&
                    teacherId &&
                    typeof schoolId === "number" &&
                    schoolId) {
                    const results = yield this.schoolSystem.linkTeacherToSchool(teacherId, schoolId);
                    if (results)
                        res.status(201).json({ message: "success" });
                    else
                        res.status(404).json({
                            message: `Values: ${teacherId} teacher id & ${schoolId} school id not found.`,
                        });
                }
                else {
                    res
                        .status(400)
                        .send("Invalid input: 'teacherId' and 'schoolId' must be numbers");
                }
            }
            catch (error) {
                res.status(400).json({
                    message: "An error occurred while creating a teacher for a school.",
                });
            }
        });
    }
    addTeacherToASubject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { teacherId, subjectId } = req.body;
                if (typeof teacherId === "number" &&
                    teacherId &&
                    typeof subjectId === "number" &&
                    subjectId) {
                    const results = yield this.schoolSystem.linkTeacherToSubject(teacherId, subjectId);
                    if (results)
                        res.status(201).json({ message: "success" });
                    else
                        res.status(404).json({
                            message: `Values: ${teacherId} teacher id & ${subjectId} subject id not found.`,
                        });
                }
                else {
                    res
                        .status(400)
                        .send("Invalid input: 'teacherId' and 'subjectId' must be numbers");
                }
            }
            catch (error) {
                res.status(400).json({
                    message: "An error occurred while creating a teacher for a subject.",
                });
            }
        });
    }
    // **************************** Learners Controllers ****************************** //
    createLearner(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { firstName, lastName, email, gradeId } = req.body;
                if (typeof firstName === "string" &&
                    firstName &&
                    typeof lastName === "string" &&
                    lastName &&
                    typeof email === "string" &&
                    email &&
                    typeof gradeId === "number" &&
                    gradeId) {
                    const results = yield this.schoolSystem.createLearner({
                        firstName,
                        lastName,
                        email,
                        gradeId,
                    });
                    if (results)
                        res.status(201).json({ message: "success" });
                    else
                        res
                            .status(409)
                            .json({ message: `Learner with ${email} already exist.` });
                }
                else {
                    res
                        .status(400)
                        .send("Invalid input: 'firstName', 'lastName', 'email' must be strings & 'gradeId' must be number");
                }
            }
            catch (error) {
                res
                    .status(400)
                    .json({ message: "An error occurred while creating a learner." });
            }
        });
    }
    getLearners(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const learners = yield this.schoolSystem.getLearners();
                res.status(200).json(learners);
            }
            catch (error) {
                res
                    .status(500)
                    .json({ message: "An error occurred while fetching the learners." });
            }
        });
    }
    addLearnerToASchool(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { learnerId, schoolId } = req.body;
                if (typeof learnerId === "number" &&
                    learnerId &&
                    typeof schoolId === "number" &&
                    schoolId) {
                    const results = yield this.schoolSystem.linkTeacherToSchool(learnerId, schoolId);
                    if (results)
                        res.status(201).json({ message: "success" });
                    else
                        res.status(404).json({
                            message: `Values: ${learnerId} teacher id & ${schoolId} school id not found.`,
                        });
                }
                else {
                    res
                        .status(400)
                        .send("Invalid input: 'learnerId' and 'schoolId' must be numbers");
                }
            }
            catch (error) {
                res.status(400).json({
                    message: "An error occurred while creating a learner school.",
                });
            }
        });
    }
    changeLearnerSchool(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { learnerId, schoolId } = req.body;
                if (typeof learnerId === "number" &&
                    learnerId &&
                    typeof schoolId === "number" &&
                    schoolId) {
                    const results = yield this.schoolSystem.linkLearnerToNewSchool(learnerId, schoolId);
                    if (results)
                        res.status(201).json({ message: "success" });
                    else
                        res.status(404).json({
                            message: `Values: ${learnerId} teacher id & ${schoolId} school id not found.`,
                        });
                }
                else {
                    res
                        .status(400)
                        .send("Invalid input: 'learnerId' and 'schoolId' must be numbers");
                }
            }
            catch (error) {
                res.status(400).json({
                    message: "An error occurred while creating a learner school.",
                });
            }
        });
    }
    currentLearnerSchool(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { learnerId } = req.query;
                const isIdNumber = Number(learnerId);
                if (typeof isIdNumber !== "number" && !isIdNumber) {
                    res
                        .status(400)
                        .send("Invalid input: 'learnerId' must be a number or greater than 0.");
                }
                else {
                    const currentSchool = yield this.schoolSystem.getLearnersCurrentSchool(isIdNumber);
                    if (currentSchool.id)
                        res.status(200).json(currentSchool);
                    else
                        res
                            .status(404)
                            .json({ message: `Learner with: ${learnerId} id not found.` });
                }
            }
            catch (error) {
                res.status(500).json({
                    message: "An error occurred while fetching the learners current school.",
                });
            }
        });
    }
    // ***************************** Grades Controllers **************************** //
    createGrade(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { grade } = req.body;
                if (!grade) {
                    res.status(400).send("Invalid input: 'Grade' must not be empty");
                }
                const results = yield this.schoolSystem.createGrade(grade);
                if (!results) {
                    res.status(409).json({ message: `${grade} already exist.` });
                }
                else {
                    res.status(201).json({ message: "Success" });
                }
            }
            catch (error) {
                res.status(500).json({
                    message: "An error occurred while creating a grade.",
                });
            }
        });
    }
    getGrades(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const grades = yield this.schoolSystem.getGrades();
                res.status(200).json(grades);
            }
            catch (error) {
                res
                    .status(500)
                    .json({ message: "An error occurred while fetching grades." });
            }
        });
    }
}
exports.default = SchoolSystemControllers;
