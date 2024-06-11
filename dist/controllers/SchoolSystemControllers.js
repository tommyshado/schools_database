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
        this.createTeacher = this.createTeacher.bind(this);
    }
    createSchool(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, region } = req.body;
                if (typeof name === "string" && typeof region === "string") {
                    yield this.schoolSystem.createSchools(name, region);
                    res.status(201).json({ message: "success" });
                    return;
                }
                res
                    .status(400)
                    .send("Invalid input: 'name' and 'region' must be strings");
                return;
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
                return;
            }
            catch (error) {
                res
                    .status(500)
                    .json({ message: "An error occurred while fetching the schools." });
            }
        });
    }
    createTeacher(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { firstName, lastName, email } = req.body;
                if (typeof firstName === "string" &&
                    typeof lastName === "string" &&
                    typeof email === "string") {
                    yield this.schoolSystem.createATeacher({ firstName, lastName, email });
                    return;
                }
                res
                    .status(400)
                    .send("Invalid input: 'firstName', 'lastName' and 'email' must be strings");
                return;
            }
            catch (error) {
                res
                    .status(400)
                    .json({ message: "An error occurred while creating a teacher." });
            }
        });
    }
}
exports.default = SchoolSystemControllers;
