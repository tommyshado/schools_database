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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const DbSchools_1 = __importDefault(require("../DbSchools"));
const Pool_1 = __importDefault(require("../model/Pool"));
const DbTeachers_1 = __importDefault(require("../DbTeachers"));
const SchoolSystem_1 = __importDefault(require("../SchoolSystem"));
const schoolsDb = new DbSchools_1.default(Pool_1.default);
const teachersDb = new DbTeachers_1.default(Pool_1.default);
const schoolSystem = new SchoolSystem_1.default(schoolsDb, teachersDb);
describe("Schools Database", function () {
    this.timeout(2000);
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        yield Pool_1.default.query("truncate table school cascade");
        yield Pool_1.default.query("truncate table teacher cascade");
    }));
    describe("DbSchools Database", () => {
        it("should create a school", () => __awaiter(this, void 0, void 0, function* () {
            const results = yield schoolsDb.createSchools("Luhlaza", "Khayelitsha");
            assert_1.default.equal(true, results);
        }));
        it("should create more schools", () => __awaiter(this, void 0, void 0, function* () {
            yield schoolsDb.createSchools("Cape Town High", "Cape Town");
            const results = yield schoolsDb.createSchools("Cape Town High", "Cape Town");
            assert_1.default.equal(false, results);
            let schools = yield schoolsDb.getSchools();
            assert_1.default.equal(1, schools.length);
            yield schoolsDb.createSchools("Zonnebloem", "Cape Town");
            yield schoolsDb.createSchools("Wineberg High", "Wineberg");
            // Update the schools variable with the newly added schools
            schools = yield schoolsDb.getSchools();
            assert_1.default.equal(3, schools.length);
        }));
    });
    describe("DbTeacher Database", () => {
        it("should create a teacher", () => __awaiter(this, void 0, void 0, function* () {
            const results = yield teachersDb.createATeacher({
                firstName: "Sbu",
                lastName: "Tom",
                email: "sbu@gmail.com"
            });
            assert_1.default.equal(true, results);
            const results__ = yield teachersDb.createATeacher({
                firstName: "Sbu",
                lastName: "Tom",
                email: "sbu@gmail.com"
            });
            assert_1.default.equal(false, results__);
        }));
        it("should create teachers", () => __awaiter(this, void 0, void 0, function* () {
            yield teachersDb.createATeacher({
                firstName: "Ace",
                lastName: "Tom",
                email: "ace@gmail.com"
            });
            let teachers = yield teachersDb.getTeachers();
            assert_1.default.equal(1, teachers.length);
            yield teachersDb.createATeacher({
                firstName: "Sbu",
                lastName: "Tom",
                email: "sbu@gmail.com"
            });
            teachers = yield teachersDb.getTeachers();
            assert_1.default.equal(2, teachers.length);
        }));
        it("should link a teacher to a school", () => __awaiter(this, void 0, void 0, function* () {
            yield teachersDb.createATeacher({
                firstName: "Otha",
                lastName: "Moya",
                email: "moya@gmail.com"
            });
            yield schoolsDb.createSchools("Gugs High", "Gugulethu");
            const schools = yield schoolsDb.getSchools();
            const teachers = yield teachersDb.getTeachers();
            const results = yield teachersDb.linkTeacherToSchool(teachers[0].id, schools[0].id);
            assert_1.default.equal(true, results);
        }));
        it("should link teachers to schools", () => __awaiter(this, void 0, void 0, function* () {
            yield teachersDb.createATeacher({
                firstName: "Nathi",
                lastName: "Gcogco",
                email: "nathi@gmail.com"
            });
            yield schoolsDb.createSchools("Harry Gwala", "Site B");
            let schools = yield schoolsDb.getSchools();
            let teachers = yield teachersDb.getTeachers();
            let results = yield teachersDb.linkTeacherToSchool(teachers[0].id, schools[0].id);
            assert_1.default.equal(true, results);
            yield teachersDb.createATeacher({
                firstName: "Gcogco",
                lastName: "Tim",
                email: "tim@gmail.com"
            });
            yield schoolsDb.createSchools("Bellevue", "Blue Downs");
            schools = yield schoolsDb.getSchools();
            teachers = yield teachersDb.getTeachers();
            results = yield teachersDb.linkTeacherToSchool(teachers[1].id, schools[1].id);
            assert_1.default.equal(true, results);
        }));
    });
    describe("SchoolSystem Class", function () {
        it("should create schools using SchoolSystem Class", () => __awaiter(this, void 0, void 0, function* () {
            const results = yield schoolSystem.createSchools("Luhlaza", "Khayelitsha");
            assert_1.default.equal(true, results);
            yield schoolSystem.createSchools("Luhlaza", "Khayelitsha");
            let schools = yield schoolSystem.getSchools();
            assert_1.default.equal(1, schools.length);
            yield schoolSystem.createSchools("Zola High", "Bhongweni");
            yield schoolSystem.createSchools("Epex Primary", "Blue Downs");
            schools = yield schoolSystem.getSchools();
            assert_1.default.equal(3, schools.length);
        }));
        it("should link teachers to a school using SchoolSystem Class", () => __awaiter(this, void 0, void 0, function* () {
            yield teachersDb.createATeacher({
                firstName: "Sive",
                lastName: "Philani",
                email: "sive@gmail.com"
            });
            yield teachersDb.createATeacher({
                firstName: "Nathi",
                lastName: "Philani",
                email: "nathi@gmail.com"
            });
            yield schoolsDb.createSchools("Harry Gwala", "Site B");
            let schools = yield schoolsDb.getSchools();
            let teachers = yield teachersDb.getTeachers();
            assert_1.default.equal(2, teachers.length);
            assert_1.default.equal(1, schools.length);
            let results = yield teachersDb.linkTeacherToSchool(teachers[0].id, schools[0].id);
            assert_1.default.equal(true, results);
            yield teachersDb.createATeacher({
                firstName: "Gcogco",
                lastName: "Tim",
                email: "tim@gmail.com"
            });
            yield schoolsDb.createSchools("Bellevue", "Blue Downs");
            teachers = yield teachersDb.getTeachers();
            schools = yield schoolsDb.getSchools();
            assert_1.default.equal(3, teachers.length);
            assert_1.default.equal(2, schools.length);
            results = yield teachersDb.linkTeacherToSchool(teachers[2].id, schools[1].id);
            assert_1.default.equal(true, results);
        }));
    });
    after(() => {
        Pool_1.default.$pool.end;
    });
});
