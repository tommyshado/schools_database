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
const SchoolsImpl_1 = __importDefault(require("../SchoolsImpl"));
const Pool_1 = __importDefault(require("../model/Pool"));
const TeacherImpl_1 = __importDefault(require("../TeacherImpl"));
const SchoolSystem_1 = __importDefault(require("../SchoolSystem"));
const GradesImpl_1 = __importDefault(require("../GradesImpl"));
const LearnersImpl_1 = __importDefault(require("../LearnersImpl"));
const schoolsImpl = new SchoolsImpl_1.default(Pool_1.default);
const teachersImpl = new TeacherImpl_1.default(Pool_1.default);
const learnersImpl = new LearnersImpl_1.default(Pool_1.default);
const gradesImpl = new GradesImpl_1.default(Pool_1.default);
const schoolSystem = new SchoolSystem_1.default(schoolsImpl, teachersImpl, learnersImpl, gradesImpl);
describe("Schools Database", function () {
    this.timeout(2000);
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        yield Pool_1.default.query("truncate table school restart identity cascade");
        yield Pool_1.default.query("truncate table learner_school restart identity cascade");
        yield Pool_1.default.query("truncate table teacher_school restart identity cascade");
        yield Pool_1.default.query("truncate table teacher restart identity cascade");
        yield Pool_1.default.query("truncate table learner restart identity cascade");
        yield Pool_1.default.query("truncate table grade restart identity cascade");
        yield Pool_1.default.query("truncate table subject restart identity cascade");
        yield Pool_1.default.query("truncate table teacher_subject restart identity cascade");
    }));
    describe("DbSchools Database", () => {
        it("should create a school", () => __awaiter(this, void 0, void 0, function* () {
            const results = yield schoolsImpl.createSchools("Luhlaza", "Khayelitsha");
            assert_1.default.equal(true, results);
        }));
        it("should create more schools", () => __awaiter(this, void 0, void 0, function* () {
            yield schoolsImpl.createSchools("Cape Town High", "Cape Town");
            const results = yield schoolsImpl.createSchools("Cape Town High", "Cape Town");
            assert_1.default.equal(false, results);
            let schools = yield schoolsImpl.getSchools();
            assert_1.default.equal(1, schools.length);
            yield schoolsImpl.createSchools("Zonnebloem", "Cape Town");
            yield schoolsImpl.createSchools("Wineberg High", "Wineberg");
            // Update the schools variable with the newly added schools
            schools = yield schoolsImpl.getSchools();
            assert_1.default.equal(3, schools.length);
        }));
    });
    describe("DbTeacher Database", () => {
        it("should create a teacher", () => __awaiter(this, void 0, void 0, function* () {
            const results = yield teachersImpl.createATeacher({
                firstName: "Sbu",
                lastName: "Tom",
                email: "sbu@gmail.com"
            });
            assert_1.default.equal(true, results);
            const results__ = yield teachersImpl.createATeacher({
                firstName: "Sbu",
                lastName: "Tom",
                email: "sbu@gmail.com"
            });
            assert_1.default.equal(false, results__);
        }));
        it("should create teachers", () => __awaiter(this, void 0, void 0, function* () {
            yield teachersImpl.createATeacher({
                firstName: "Ace",
                lastName: "Tom",
                email: "ace@gmail.com"
            });
            let teachers = yield teachersImpl.getTeachers();
            assert_1.default.equal(1, teachers.length);
            yield teachersImpl.createATeacher({
                firstName: "Sbu",
                lastName: "Tom",
                email: "sbu@gmail.com"
            });
            teachers = yield teachersImpl.getTeachers();
            assert_1.default.equal(2, teachers.length);
        }));
        it("should link a teacher to a school", () => __awaiter(this, void 0, void 0, function* () {
            yield teachersImpl.createATeacher({
                firstName: "Otha",
                lastName: "Moya",
                email: "moya@gmail.com"
            });
            yield schoolsImpl.createSchools("Gugs High", "Gugulethu");
            const schools = yield schoolsImpl.getSchools();
            const teachers = yield teachersImpl.getTeachers();
            const results = yield teachersImpl.linkTeacherToSchool(teachers[0].id, schools[0].id);
            assert_1.default.equal(true, results);
        }));
        it("should link teachers to schools", () => __awaiter(this, void 0, void 0, function* () {
            yield teachersImpl.createATeacher({
                firstName: "Nathi",
                lastName: "Gcogco",
                email: "nathi@gmail.com"
            });
            yield schoolsImpl.createSchools("Harry Gwala", "Site B");
            let schools = yield schoolsImpl.getSchools();
            let teachers = yield teachersImpl.getTeachers();
            let results = yield teachersImpl.linkTeacherToSchool(teachers[0].id, schools[0].id);
            assert_1.default.equal(true, results);
            yield teachersImpl.createATeacher({
                firstName: "Gcogco",
                lastName: "Tim",
                email: "tim@gmail.com"
            });
            yield schoolsImpl.createSchools("Bellevue", "Blue Downs");
            schools = yield schoolsImpl.getSchools();
            teachers = yield teachersImpl.getTeachers();
            results = yield teachersImpl.linkTeacherToSchool(teachers[1].id, schools[1].id);
            assert_1.default.equal(true, results);
        }));
    });
    describe("DbLeaners Database", () => {
        it("should create a learner", () => __awaiter(this, void 0, void 0, function* () {
            // create learner grade
            const grade = yield gradesImpl.createGrade("Grade-8");
            assert_1.default.equal(true, grade);
            const gradeData = yield gradesImpl.getGrades();
            assert_1.default.equal("Grade-8", gradeData[0].name);
            // create learner & link learner to grade
            const learner = yield learnersImpl.createLearner({
                firstName: "Mthunzi",
                lastName: "Turing",
                email: "mt@gmail",
                gradeId: gradeData[0].id
            });
            assert_1.default.equal(true, learner);
        }));
        it("should link learners to a school", () => __awaiter(this, void 0, void 0, function* () {
            // create learner grade
            const grade = yield gradesImpl.createGrade("Grade-8");
            assert_1.default.equal(true, grade);
            const gradeData = yield gradesImpl.getGrades();
            assert_1.default.equal("Grade-8", gradeData[0].name);
            // create learner & link learner to grade
            const learner = yield learnersImpl.createLearner({
                firstName: "Mthunzi",
                lastName: "Turing",
                email: "mt@gmail",
                gradeId: gradeData[0].id
            });
            assert_1.default.equal(true, learner);
            const learners = yield learnersImpl.getLearners();
            // create a school
            yield schoolsImpl.createSchools("Cape Town High", "Cape Town");
            const school = yield schoolsImpl.getSchools();
            let results = yield learnersImpl.linkLearnerToSchool(learners[0].id, school[0].id);
            assert_1.default.equal(true, results);
        }));
        it("should change learners to another school", () => __awaiter(this, void 0, void 0, function* () {
            // create learner grade
            const grade = yield gradesImpl.createGrade("Grade-11");
            assert_1.default.equal(true, grade);
            const gradeData = yield gradesImpl.getGrades();
            assert_1.default.equal("Grade-11", gradeData[0].name);
            // create learner & link learner to grade
            const learner = yield learnersImpl.createLearner({
                firstName: "Othalive",
                lastName: "Moya",
                email: "ot@gmail.com",
                gradeId: gradeData[0].id
            });
            assert_1.default.equal(true, learner);
            const learners = yield learnersImpl.getLearners();
            assert_1.default.equal(1, learners.length);
            // create a school
            yield schoolsImpl.createSchools("Cape Town High", "Cape Town");
            let school = yield schoolsImpl.getSchools();
            let results = yield learnersImpl.linkLearnerToSchool(learners[0].id, school[0].id);
            assert_1.default.equal(true, results);
            // create a new school
            yield schoolsImpl.createSchools("Zola Business High", "Bhongweni");
            school = yield schoolsImpl.getSchools();
            const linkedLearner = yield learnersImpl.linkLearnerToNewSchool(learners[0].id, school[1].id);
            assert_1.default.equal(true, linkedLearner);
            // Test for the previous school
            results = yield learnersImpl.linkLearnerToSchool(learners[0].id, school[0].id);
            assert_1.default.equal(false, results);
        }));
        it("should find a learner's current school", () => __awaiter(this, void 0, void 0, function* () {
            // create learner grade
            const grade = yield gradesImpl.createGrade("Grade-6");
            assert_1.default.equal(true, grade);
            const gradeData = yield gradesImpl.getGrades();
            assert_1.default.equal("Grade-6", gradeData[0].name);
            // create learner & link learner to grade
            const learner = yield learnersImpl.createLearner({
                firstName: "Landon",
                lastName: "Tom",
                email: "landa@gmail.com",
                gradeId: gradeData[0].id
            });
            assert_1.default.equal(true, learner);
            const learners = yield learnersImpl.getLearners();
            assert_1.default.equal(1, learners.length);
            // create a school
            yield schoolsImpl.createSchools("Cape Town High", "Cape Town");
            let school = yield schoolsImpl.getSchools();
            let results = yield learnersImpl.linkLearnerToSchool(learners[0].id, school[0].id);
            assert_1.default.equal(true, results);
            // create a new school
            yield schoolsImpl.createSchools("Zola Business High", "Bhongweni");
            school = yield schoolsImpl.getSchools();
            const linkedLearner = yield learnersImpl.linkLearnerToNewSchool(learners[0].id, school[1].id);
            assert_1.default.equal(true, linkedLearner);
            // Test for the previous school
            results = yield learnersImpl.linkLearnerToSchool(learners[0].id, school[0].id);
            assert_1.default.equal(false, results);
            const learnersCurrentSchool = yield learnersImpl.getLearnersCurrentSchool(learners[0].id);
            assert_1.default.deepEqual({ id: school[1].id, name: 'Zola Business High' }, learnersCurrentSchool);
        }));
        it("should find all the schools for a learner", () => __awaiter(this, void 0, void 0, function* () {
            // create learner grade
            const grade = yield gradesImpl.createGrade("Grade-11");
            assert_1.default.equal(true, grade);
            const gradeData = yield gradesImpl.getGrades();
            assert_1.default.equal("Grade-11", gradeData[0].name);
            // create learner & link learner to grade
            const learner = yield learnersImpl.createLearner({
                firstName: "Ace",
                lastName: "Tom",
                email: "ace@gmail.com",
                gradeId: gradeData[0].id
            });
            assert_1.default.equal(true, learner);
            const learners = yield learnersImpl.getLearners();
            assert_1.default.equal(1, learners.length);
            // create a school
            yield schoolsImpl.createSchools("Cape Town High", "Cape Town");
            let school = yield schoolsImpl.getSchools();
            let results = yield learnersImpl.linkLearnerToSchool(learners[0].id, school[0].id);
            assert_1.default.equal(true, results);
            // create a new school
            yield schoolsImpl.createSchools("Zola Business High", "Bhongweni");
            school = yield schoolsImpl.getSchools();
            const linkedLearner = yield learnersImpl.linkLearnerToNewSchool(learners[0].id, school[1].id);
            assert_1.default.equal(true, linkedLearner);
            // Test for the previous school
            results = yield learnersImpl.linkLearnerToSchool(learners[0].id, school[0].id);
            assert_1.default.equal(false, results);
            const allPastSchools = yield learnersImpl.getPastLearnerSchools(learners[0].id);
            assert_1.default.equal(2, allPastSchools.length);
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
            yield teachersImpl.createATeacher({
                firstName: "Sive",
                lastName: "Philani",
                email: "sive@gmail.com"
            });
            yield teachersImpl.createATeacher({
                firstName: "Nathi",
                lastName: "Philani",
                email: "nathi@gmail.com"
            });
            yield schoolsImpl.createSchools("Harry Gwala", "Site B");
            let schools = yield schoolsImpl.getSchools();
            let teachers = yield teachersImpl.getTeachers();
            assert_1.default.equal(2, teachers.length);
            assert_1.default.equal(1, schools.length);
            let results = yield teachersImpl.linkTeacherToSchool(teachers[0].id, schools[0].id);
            assert_1.default.equal(true, results);
            yield teachersImpl.createATeacher({
                firstName: "Gcogco",
                lastName: "Tim",
                email: "tim@gmail.com"
            });
            yield schoolsImpl.createSchools("Bellevue", "Blue Downs");
            teachers = yield teachersImpl.getTeachers();
            schools = yield schoolsImpl.getSchools();
            assert_1.default.equal(3, teachers.length);
            assert_1.default.equal(2, schools.length);
            results = yield teachersImpl.linkTeacherToSchool(teachers[2].id, schools[1].id);
            assert_1.default.equal(true, results);
        }));
    });
    after(() => {
        Pool_1.default.$pool.end;
    });
});
