import SchoolSystem from "../SchoolSystem";
import { Request, Response } from "express";

interface RequestBody {
    name?: string;
    region?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    teacherId?: number;
    schoolId?: number;
    learnerId?: number;
    gradeId?: number;
    grade?: string;
    subjectId?: number;
}

export default class SchoolSystemControllers {
    constructor(private schoolSystem: SchoolSystem) {
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
    async createSchool(req: Request, res: Response): Promise<void> {
        try {
            const { name, region } = req.body as RequestBody;
            if (
                typeof name === "string" &&
                name &&
                typeof region === "string" &&
                region
            ) {
                const results = await this.schoolSystem.createSchools(name, region);
                if (results) res.status(201).json({ message: "success" });
                else res.status(409).json({ message: `${name} already exist.` });
            } else {
                res
                    .status(400)
                    .send("Invalid input: 'name' and 'region' must be strings");
            }
        } catch (error) {
            res
                .status(400)
                .json({ message: "An error occurred while creating a school." });
        }
    }
    async getSchools(req: Request, res: Response): Promise<void> {
        try {
            const schools = await this.schoolSystem.getSchools();
            res.status(200).json(schools);
        } catch (error) {
            res
                .status(500)
                .json({ message: "An error occurred while fetching the schools." });
        }
    }
    async getSchool(req: Request, res: Response): Promise<void> {
        const { school, region } = req.query;
        if (!region) {
            try {
                const foundSchool = await this.schoolSystem.getSchool(
                    school as string,
                    null
                );
                res.status(200).json(foundSchool);
            } catch (error) {
                res
                    .status(500)
                    .json({ message: "An error occurred while fetching a school using a school." });
            }
        }
        if (!school) {
            try {
                const foundSchool = await this.schoolSystem.getSchool(
                    null,
                    region as string
                );
                res.status(200).json(foundSchool);
            } catch (error) {
                res
                    .status(500)
                    .json({ message: "An error occurred while fetching a school using a region." });
            }
        }
        try {
            const foundSchool = await this.schoolSystem.getSchool(
                school as string,
                region as string
            );
            res.status(200).json(foundSchool);
        } catch (error) {
            res
                .status(500)
                .json({ message: "An error occurred while fetching a school using a school and region." });
        }
    }

    // ************************* Teachers Controllers **************************** //
    async createTeacher(req: Request, res: Response): Promise<void> {
        try {
            const { firstName, lastName, email } = req.body as RequestBody;
            if (
                typeof firstName === "string" &&
                firstName &&
                typeof lastName === "string" &&
                lastName &&
                typeof email === "string" &&
                email
            ) {
                const results = await this.schoolSystem.createATeacher({
                    firstName,
                    lastName,
                    email,
                });
                if (results) res.status(201).json({ message: "success" });
                else
                    res
                        .status(409)
                        .json({ message: `Teacher with ${email} email already exist.` });
            } else {
                res
                    .status(400)
                    .send(
                        "Invalid input: 'firstName', 'lastName' and 'email' must be strings & length must be greater than 0"
                    );
            }
        } catch (error) {
            res
                .status(400)
                .json({ message: "An error occurred while creating a teacher." });
        }
    }
    async getTeachers(req: Request, res: Response): Promise<void> {
        try {
            const teachers = await this.schoolSystem.getTeachers();
            res.status(200).json(teachers);
        } catch (error) {
            res
                .status(500)
                .json({ message: "An error occurred while fetching the teachers." });
        }
    }
    async addTeacherToASchool(req: Request, res: Response): Promise<void> {
        try {
            const { teacherId, schoolId } = req.body as RequestBody;
            if (
                typeof teacherId === "number" &&
                teacherId &&
                typeof schoolId === "number" &&
                schoolId
            ) {
                const results = await this.schoolSystem.linkTeacherToSchool(
                    teacherId,
                    schoolId
                );
                if (results) res.status(201).json({ message: "success" });
                else
                    res.status(404).json({
                        message: `Values: ${teacherId} teacher id & ${schoolId} school id not found.`,
                    });
            } else {
                res
                    .status(400)
                    .send("Invalid input: 'teacherId' and 'schoolId' must be numbers");
            }
        } catch (error) {
            res.status(400).json({
                message: "An error occurred while creating a teacher for a school.",
            });
        }
    }
    async addTeacherToASubject(req: Request, res: Response): Promise<void> {
        try {
            const { teacherId, subjectId } = req.body as RequestBody;
            if (
                typeof teacherId === "number" &&
                teacherId &&
                typeof subjectId === "number" &&
                subjectId
            ) {
                const results = await this.schoolSystem.linkTeacherToSubject(
                    teacherId,
                    subjectId
                );
                if (results) res.status(201).json({ message: "success" });
                else
                    res.status(404).json({
                        message: `Values: ${teacherId} teacher id & ${subjectId} subject id not found.`,
                    });
            } else {
                res
                    .status(400)
                    .send("Invalid input: 'teacherId' and 'subjectId' must be numbers");
            }
        } catch (error) {
            res.status(400).json({
                message: "An error occurred while creating a teacher for a subject.",
            });
        }
    }

    // **************************** Learners Controllers ****************************** //
    async createLearner(req: Request, res: Response): Promise<void> {
        try {
            const { firstName, lastName, email, gradeId } = req.body as RequestBody;
            if (
                typeof firstName === "string" &&
                firstName &&
                typeof lastName === "string" &&
                lastName &&
                typeof email === "string" &&
                email &&
                typeof gradeId === "number" &&
                gradeId
            ) {
                const results = await this.schoolSystem.createLearner({
                    firstName,
                    lastName,
                    email,
                    gradeId,
                });
                if (results) res.status(201).json({ message: "success" });
                else
                    res
                        .status(409)
                        .json({ message: `Learner with ${email} already exist.` });
            } else {
                res
                    .status(400)
                    .send(
                        "Invalid input: 'firstName', 'lastName', 'email' must be strings & 'gradeId' must be number"
                    );
            }
        } catch (error) {
            res
                .status(400)
                .json({ message: "An error occurred while creating a learner." });
        }
    }
    async getLearners(req: Request, res: Response): Promise<void> {
        try {
            const learners = await this.schoolSystem.getLearners();
            res.status(200).json(learners);
        } catch (error) {
            res
                .status(500)
                .json({ message: "An error occurred while fetching the learners." });
        }
    }
    async addLearnerToASchool(req: Request, res: Response): Promise<void> {
        try {
            const { learnerId, schoolId } = req.body as RequestBody;
            if (
                typeof learnerId === "number" &&
                learnerId &&
                typeof schoolId === "number" &&
                schoolId
            ) {
                const results = await this.schoolSystem.linkTeacherToSchool(
                    learnerId,
                    schoolId
                );
                if (results) res.status(201).json({ message: "success" });
                else
                    res.status(404).json({
                        message: `Values: ${learnerId} teacher id & ${schoolId} school id not found.`,
                    });
            } else {
                res
                    .status(400)
                    .send("Invalid input: 'learnerId' and 'schoolId' must be numbers");
            }
        } catch (error) {
            res.status(400).json({
                message: "An error occurred while creating a learner school.",
            });
        }
    }
    async changeLearnerSchool(req: Request, res: Response): Promise<void> {
        try {
            const { learnerId, schoolId } = req.body as RequestBody;
            if (
                typeof learnerId === "number" &&
                learnerId &&
                typeof schoolId === "number" &&
                schoolId
            ) {
                const results = await this.schoolSystem.linkLearnerToNewSchool(
                    learnerId,
                    schoolId
                );
                if (results) res.status(201).json({ message: "success" });
                else
                    res.status(404).json({
                        message: `Values: ${learnerId} teacher id & ${schoolId} school id not found.`,
                    });
            } else {
                res
                    .status(400)
                    .send("Invalid input: 'learnerId' and 'schoolId' must be numbers");
            }
        } catch (error) {
            res.status(400).json({
                message: "An error occurred while creating a learner school.",
            });
        }
    }
    async currentLearnerSchool(req: Request, res: Response): Promise<void> {
        try {
            const { learnerId } = req.query;
            const isIdNumber = Number(learnerId);
            if (typeof isIdNumber !== "number" && !isIdNumber) {
                res
                    .status(400)
                    .send(
                        "Invalid input: 'learnerId' must be a number or greater than 0."
                    );
            } else {
                const currentSchool = await this.schoolSystem.getLearnersCurrentSchool(
                    isIdNumber
                );
                if (currentSchool.id) res.status(200).json(currentSchool);
                else
                    res
                        .status(404)
                        .json({ message: `Learner with: ${learnerId} id not found.` });
            }
        } catch (error) {
            res.status(500).json({
                message:
                    "An error occurred while fetching the learners current school.",
            });
        }
    }

    // ***************************** Grades Controllers **************************** //
    async createGrade(req: Request, res: Response): Promise<void> {
        try {
            const { grade } = req.body as RequestBody;
            if (!grade) {
                res.status(400).send("Invalid input: 'Grade' must not be empty");
            }
            const results = await this.schoolSystem.createGrade(grade as string);
            if (!results) {
                res.status(409).json({ message: `${grade} already exist.` });
            } else {
                res.status(201).json({ message: "Success" });
            }
        } catch (error) {
            res.status(500).json({
                message: "An error occurred while creating a grade.",
            });
        }
    }
    async getGrades(req: Request, res: Response): Promise<void> {
        try {
            const grades = await this.schoolSystem.getGrades();
            res.status(200).json(grades);
        } catch (error) {
            res
                .status(500)
                .json({ message: "An error occurred while fetching grades." });
        }
    }
}
