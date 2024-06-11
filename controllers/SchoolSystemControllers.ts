import SchoolSystem from "../SchoolSystem";
import { Request, Response } from "express";

interface RequestBody {
    name?: string;
    region?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
}

export default class SchoolSystemControllers {
    constructor(private schoolSystem: SchoolSystem) {
        this.createSchool = this.createSchool.bind(this);
        this.getSchools = this.getSchools.bind(this);
        this.createTeacher = this.createTeacher.bind(this);
    }

    async createSchool(req: Request, res: Response): Promise<void> {
        try {
            const { name, region } = req.body as RequestBody;
            if (typeof name === "string" && typeof region === "string") {
                await this.schoolSystem.createSchools(name, region);
                res.status(201).json({ message: "success" });
                return;
            }
            res
                .status(400)
                .send("Invalid input: 'name' and 'region' must be strings");
            return;
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
            return;
        } catch (error) {
            res
                .status(500)
                .json({ message: "An error occurred while fetching the schools." });
        }
    }

    async createTeacher(req: Request, res: Response): Promise<void> {
        try {
            const { firstName, lastName, email } = req.body as RequestBody;
            if (
                typeof firstName === "string" &&
                typeof lastName === "string" &&
                typeof email === "string"
            ) {
                await this.schoolSystem.createATeacher({ firstName, lastName, email });
                return;
            }
            res
                .status(400)
                .send(
                    "Invalid input: 'firstName', 'lastName' and 'email' must be strings"
                );
            return;
        } catch (error) {
            res
                .status(400)
                .json({ message: "An error occurred while creating a teacher." });
        }
    }
}
