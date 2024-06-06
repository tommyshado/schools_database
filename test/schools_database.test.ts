import assert from 'assert';
import DbSchools from '../DbSchools';
import pool from '../model/Pool';
import DbTeachers from '../DbTeachers';
import SchoolSystem from '../SchoolSystem';
import DbGrades from '../DbGrades';
import DbLearners from '../DbLearners';

const schoolsDb = new DbSchools(pool);
const teachersDb = new DbTeachers(pool);
const learnersDb = new DbLearners(pool);
const gradesDb = new DbGrades(pool);
const schoolSystem = new SchoolSystem(schoolsDb, teachersDb, learnersDb, gradesDb);

describe("Schools Database", function () {
    this.timeout(2000);
    beforeEach(async () => {
        await pool.query("truncate table school restart identity cascade");
        await pool.query("truncate table learner_school restart identity cascade");
        await pool.query("truncate table teacher_school restart identity cascade");
        await pool.query("truncate table teacher restart identity cascade");
        await pool.query("truncate table learner restart identity cascade");
        await pool.query("truncate table grade restart identity cascade");
        await pool.query("truncate table subject restart identity cascade");
        await pool.query("truncate table teacher_subject restart identity cascade");
    });

    describe("DbSchools Database", () => {
        it("should create a school", async () => {
            const results = await schoolsDb.createSchools("Luhlaza", "Khayelitsha");
            assert.equal(true, results);
        });

        it("should create more schools", async () => {
            await schoolsDb.createSchools("Cape Town High", "Cape Town");
            const results = await schoolsDb.createSchools("Cape Town High", "Cape Town");
            assert.equal(false, results);

            let schools = await schoolsDb.getSchools();
            assert.equal(1, schools.length);

            await schoolsDb.createSchools("Zonnebloem", "Cape Town");
            await schoolsDb.createSchools("Wineberg High", "Wineberg");
            // Update the schools variable with the newly added schools
            schools = await schoolsDb.getSchools();
            assert.equal(3, schools.length);
        });
    });

    describe("DbTeacher Database", () => {
        it("should create a teacher", async () => {
            const results = await teachersDb.createATeacher({
                firstName: "Sbu",
                lastName: "Tom",
                email: "sbu@gmail.com"
            });
            assert.equal(true, results);
            const results__ = await teachersDb.createATeacher({
                firstName: "Sbu",
                lastName: "Tom",
                email: "sbu@gmail.com"
            });
            assert.equal(false, results__);
        });

        it("should create teachers", async () => {
            await teachersDb.createATeacher({
                firstName: "Ace",
                lastName: "Tom",
                email: "ace@gmail.com"
            });
            let teachers = await teachersDb.getTeachers();
            assert.equal(1, teachers.length);
            await teachersDb.createATeacher({
                firstName: "Sbu",
                lastName: "Tom",
                email: "sbu@gmail.com"
            });
            teachers = await teachersDb.getTeachers();
            assert.equal(2, teachers.length);
        });

        it("should link a teacher to a school", async () => {
            await teachersDb.createATeacher({
                firstName: "Otha",
                lastName: "Moya",
                email: "moya@gmail.com"
            });
            await schoolsDb.createSchools("Gugs High", "Gugulethu");

            const schools = await schoolsDb.getSchools();
            const teachers = await teachersDb.getTeachers();
            const results = await teachersDb.linkTeacherToSchool(teachers[0].id as number, schools[0].id as number);

            assert.equal(true, results);
        });

        it("should link teachers to schools", async () => {
            await teachersDb.createATeacher({
                firstName: "Nathi",
                lastName: "Gcogco",
                email: "nathi@gmail.com"
            });
            await schoolsDb.createSchools("Harry Gwala", "Site B");

            let schools = await schoolsDb.getSchools();
            let teachers = await teachersDb.getTeachers();
            let results = await teachersDb.linkTeacherToSchool(teachers[0].id as number, schools[0].id as number);
            assert.equal(true, results);

            await teachersDb.createATeacher({
                firstName: "Gcogco",
                lastName: "Tim",
                email: "tim@gmail.com"
            });
            await schoolsDb.createSchools("Bellevue", "Blue Downs");

            schools = await schoolsDb.getSchools();
            teachers = await teachersDb.getTeachers();
            results = await teachersDb.linkTeacherToSchool(teachers[1].id as number, schools[1].id as number);
            assert.equal(true, results);
        });
    });

    describe("DbLeaners Database", () => {
        it("should create a learner", async () => {
            // create learner grade
            const grade = await gradesDb.createGrade("Grade-8");
            assert.equal(true, grade);

            const gradeData = await gradesDb.getGrades();
            assert.equal("Grade-8", gradeData[0].name);

            // create learner & link learner to grade
            const learner = await learnersDb.createLearner({
                firstName: "Mthunzi",
                lastName: "Turing",
                email: "mt@gmail",
                gradeId: gradeData[0].id
            });
            assert.equal(true, learner);
        });

        it("should link learners to a school", async () => {
            // create learner grade
            const grade = await gradesDb.createGrade("Grade-8");
            assert.equal(true, grade);

            const gradeData = await gradesDb.getGrades();
            assert.equal("Grade-8", gradeData[0].name);

            // create learner & link learner to grade
            const learner = await learnersDb.createLearner({
                firstName: "Mthunzi",
                lastName: "Turing",
                email: "mt@gmail",
                gradeId: gradeData[0].id
            });
            assert.equal(true, learner);

            const learners = await learnersDb.getLearners();
            // create a school
            await schoolsDb.createSchools("Cape Town High", "Cape Town");
            const school = await schoolsDb.getSchools();
            let results = await learnersDb.linkLearnerToSchool(learners[0].id as number, school[0].id as number);

            assert.equal(true, results);
        });

        it("should change learners to another school", async () => {
            // create learner grade
            const grade = await gradesDb.createGrade("Grade-11");
            assert.equal(true, grade);

            const gradeData = await gradesDb.getGrades();
            assert.equal("Grade-11", gradeData[0].name);

            // create learner & link learner to grade
            const learner = await learnersDb.createLearner({
                firstName: "Othalive",
                lastName: "Moya",
                email: "ot@gmail.com",
                gradeId: gradeData[0].id
            });
            assert.equal(true, learner);

            const learners = await learnersDb.getLearners();
            assert.equal(1, learners.length);

            // create a school
            await schoolsDb.createSchools("Cape Town High", "Cape Town");
            let school = await schoolsDb.getSchools();
            let results = await learnersDb.linkLearnerToSchool(learners[0].id as number, school[0].id as number);
            assert.equal(true, results);

            // create a new school
            await schoolsDb.createSchools("Zola Business High", "Bhongweni");
            school = await schoolsDb.getSchools();
            const linkedLearner = await learnersDb.linkLearnerToNewSchool(learners[0].id as number, school[0].id as number);

            assert.equal(true, linkedLearner);
            // Test for the previous school
            results = await learnersDb.linkLearnerToSchool(learners[0].id as number, school[0].id as number);
            assert.equal(false, results);
        });

        it("should find a learner's current school", async () => {
            // create learner grade
            const grade = await gradesDb.createGrade("Grade-6");
            assert.equal(true, grade);

            const gradeData = await gradesDb.getGrades();
            assert.equal("Grade-6", gradeData[0].name);

            // create learner & link learner to grade
            const learner = await learnersDb.createLearner({
                firstName: "Landon",
                lastName: "Tom",
                email: "landa@gmail.com",
                gradeId: gradeData[0].id
            });
            assert.equal(true, learner);

            const learners = await learnersDb.getLearners();
            assert.equal(1, learners.length);

            // create a school
            await schoolsDb.createSchools("Cape Town High", "Cape Town");
            let school = await schoolsDb.getSchools();
            let results = await learnersDb.linkLearnerToSchool(learners[0].id as number, school[0].id as number);
            assert.equal(true, results);

            // create a new school
            await schoolsDb.createSchools("Zola Business High", "Bhongweni");
            school = await schoolsDb.getSchools();

            const linkedLearner = await learnersDb.linkLearnerToNewSchool(learners[0].id as number, school[1].id as number);
            assert.equal(true, linkedLearner);
            // Test for the previous school
            results = await learnersDb.linkLearnerToSchool(learners[0].id as number, school[0].id as number);
            assert.equal(false, results);
            
            const learnersCurrentSchool = await learnersDb.getLearnersCurrentSchool(learners[0].id as number);
            assert.deepEqual({ id: school[1].id, name: 'Zola Business High' }, learnersCurrentSchool);
        });

        it("should find all the schools for a learner", async () => {
            // create learner grade
            const grade = await gradesDb.createGrade("Grade-11");
            assert.equal(true, grade);

            const gradeData = await gradesDb.getGrades();
            assert.equal("Grade-11", gradeData[0].name);

            // create learner & link learner to grade
            const learner = await learnersDb.createLearner({
                firstName: "Ace",
                lastName: "Tom",
                email: "ace@gmail.com",
                gradeId: gradeData[0].id
            });
            assert.equal(true, learner);

            const learners = await learnersDb.getLearners();
            assert.equal(1, learners.length);

            // create a school
            await schoolsDb.createSchools("Cape Town High", "Cape Town");
            let school = await schoolsDb.getSchools();
            let results = await learnersDb.linkLearnerToSchool(learners[0].id as number, school[0].id as number);
            assert.equal(true, results);

            // create a new school
            await schoolsDb.createSchools("Zola Business High", "Bhongweni");
            school = await schoolsDb.getSchools();
            const linkedLearner = await learnersDb.linkLearnerToNewSchool(learners[0].id as number, school[1].id as number);

            assert.equal(true, linkedLearner);
            // Test for the previous school
            results = await learnersDb.linkLearnerToSchool(learners[0].id as number, school[0].id as number);
            assert.equal(false, results);

            const allPastSchools = await learnersDb.getPastLearnerSchools(learners[0].id as number);
            assert.equal(2, allPastSchools.length);
        });
    });

    describe("SchoolSystem Class", function () {
        it("should create schools using SchoolSystem Class", async () => {
            const results = await schoolSystem.createSchools("Luhlaza", "Khayelitsha");
            assert.equal(true, results);

            await schoolSystem.createSchools("Luhlaza", "Khayelitsha");
            let schools = await schoolSystem.getSchools();
            assert.equal(1, schools.length);

            await schoolSystem.createSchools("Zola High", "Bhongweni");
            await schoolSystem.createSchools("Epex Primary", "Blue Downs");
            schools = await schoolSystem.getSchools();
            assert.equal(3, schools.length);
        });
        it("should link teachers to a school using SchoolSystem Class", async () => {
            await teachersDb.createATeacher({
                firstName: "Sive",
                lastName: "Philani",
                email: "sive@gmail.com"
            });
            await teachersDb.createATeacher({
                firstName: "Nathi",
                lastName: "Philani",
                email: "nathi@gmail.com"
            });
            await schoolsDb.createSchools("Harry Gwala", "Site B");

            let schools = await schoolsDb.getSchools();
            let teachers = await teachersDb.getTeachers();

            assert.equal(2, teachers.length);
            assert.equal(1, schools.length);

            let results = await teachersDb.linkTeacherToSchool(teachers[0].id as number, schools[0].id as number);
            assert.equal(true, results);

            await teachersDb.createATeacher({
                firstName: "Gcogco",
                lastName: "Tim",
                email: "tim@gmail.com"
            });
            await schoolsDb.createSchools("Bellevue", "Blue Downs");

            teachers = await teachersDb.getTeachers();
            schools = await schoolsDb.getSchools();

            assert.equal(3, teachers.length);
            assert.equal(2, schools.length);

            results = await teachersDb.linkTeacherToSchool(teachers[2].id as number, schools[1].id as number);
            assert.equal(true, results);
        });
    });

    after(() => {
        pool.$pool.end;
    });
});