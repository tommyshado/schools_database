import assert from 'assert';
import { dbTest } from '../model/Pool';
import { 
    schoolSystem, 
    teachersImpl,
    schoolsImpl, 
    gradesImpl, 
    learnersImpl
} from '../utils/SchoolSystemDBManager'

describe("Schools Database", function () {
    this.timeout(2000);
    beforeEach(async () => {
        await dbTest.query("truncate table school restart identity cascade");
        await dbTest.query("truncate table learner_school restart identity cascade");
        await dbTest.query("truncate table teacher_school restart identity cascade");
        await dbTest.query("truncate table teacher restart identity cascade");
        await dbTest.query("truncate table learner restart identity cascade");
        await dbTest.query("truncate table grade restart identity cascade");
        await dbTest.query("truncate table subject restart identity cascade");
        await dbTest.query("truncate table teacher_subject restart identity cascade");
    });

    describe("DbSchools Database", () => {
        it("should create a school", async () => {
            const results = await schoolsImpl.createSchools("Luhlaza", "Khayelitsha");
            assert.equal(true, results);
        });

        it("should create more schools", async () => {
            await schoolsImpl.createSchools("Cape Town High", "Cape Town");
            const results = await schoolsImpl.createSchools("Cape Town High", "Cape Town");
            assert.equal(false, results);

            let schools = await schoolsImpl.getSchools();
            assert.equal(1, schools.length);

            await schoolsImpl.createSchools("Zonnebloem", "Cape Town");
            await schoolsImpl.createSchools("Wineberg High", "Wineberg");
            // Update the schools variable with the newly added schools
            schools = await schoolsImpl.getSchools();
            assert.equal(3, schools.length);
        });
    });

    describe("DbTeacher Database", () => {
        it("should create a teacher", async () => {
            const results = await teachersImpl.createATeacher({
                firstName: "Sbu",
                lastName: "Tom",
                email: "sbu@gmail.com"
            });
            assert.equal(true, results);
            const results__ = await teachersImpl.createATeacher({
                firstName: "Sbu",
                lastName: "Tom",
                email: "sbu@gmail.com"
            });
            assert.equal(false, results__);
        });

        it("should create teachers", async () => {
            await teachersImpl.createATeacher({
                firstName: "Ace",
                lastName: "Tom",
                email: "ace@gmail.com"
            });
            let teachers = await teachersImpl.getTeachers();
            assert.equal(1, teachers.length);
            await teachersImpl.createATeacher({
                firstName: "Sbu",
                lastName: "Tom",
                email: "sbu@gmail.com"
            });
            teachers = await teachersImpl.getTeachers();
            assert.equal(2, teachers.length);
        });

        it("should link a teacher to a school", async () => {
            await teachersImpl.createATeacher({
                firstName: "Otha",
                lastName: "Moya",
                email: "moya@gmail.com"
            });
            await schoolsImpl.createSchools("Gugs High", "Gugulethu");

            const schools = await schoolsImpl.getSchools();
            const teachers = await teachersImpl.getTeachers();
            const results = await teachersImpl.linkTeacherToSchool(teachers[0].id as number, schools[0].id as number);

            assert.equal(true, results);
        });

        it("should link teachers to schools", async () => {
            await teachersImpl.createATeacher({
                firstName: "Nathi",
                lastName: "Gcogco",
                email: "nathi@gmail.com"
            });
            await schoolsImpl.createSchools("Harry Gwala", "Site B");

            let schools = await schoolsImpl.getSchools();
            let teachers = await teachersImpl.getTeachers();
            let results = await teachersImpl.linkTeacherToSchool(teachers[0].id as number, schools[0].id as number);
            assert.equal(true, results);

            await teachersImpl.createATeacher({
                firstName: "Gcogco",
                lastName: "Tim",
                email: "tim@gmail.com"
            });
            await schoolsImpl.createSchools("Bellevue", "Blue Downs");

            schools = await schoolsImpl.getSchools();
            teachers = await teachersImpl.getTeachers();
            results = await teachersImpl.linkTeacherToSchool(teachers[1].id as number, schools[1].id as number);
            assert.equal(true, results);
        });
    });

    describe("DbLeaners Database", () => {
        it("should create a learner", async () => {
            // create learner grade
            const grade = await gradesImpl.createGrade("Grade-8");
            assert.equal(true, grade);

            const gradeData = await gradesImpl.getGrades();
            assert.equal("Grade-8", gradeData[0].name);

            // create learner & link learner to grade
            const learner = await learnersImpl.createLearner({
                firstName: "Mthunzi",
                lastName: "Turing",
                email: "mt@gmail",
                gradeId: gradeData[0].id
            });
            assert.equal(true, learner);
        });

        it("should link learners to a school", async () => {
            // create learner grade
            const grade = await gradesImpl.createGrade("Grade-8");
            assert.equal(true, grade);

            const gradeData = await gradesImpl.getGrades();
            assert.equal("Grade-8", gradeData[0].name);

            // create learner & link learner to grade
            const learner = await learnersImpl.createLearner({
                firstName: "Mthunzi",
                lastName: "Turing",
                email: "mt@gmail",
                gradeId: gradeData[0].id
            });
            assert.equal(true, learner);

            const learners = await learnersImpl.getLearners();
            // create a school
            await schoolsImpl.createSchools("Cape Town High", "Cape Town");
            const school = await schoolsImpl.getSchools();
            let results = await learnersImpl.linkLearnerToSchool(learners[0].id as number, school[0].id as number);

            assert.equal(true, results);
        });

        it("should change learners to another school", async () => {
            // create learner grade
            const grade = await gradesImpl.createGrade("Grade-11");
            assert.equal(true, grade);

            const gradeData = await gradesImpl.getGrades();
            assert.equal("Grade-11", gradeData[0].name);

            // create learner & link learner to grade
            const learner = await learnersImpl.createLearner({
                firstName: "Othalive",
                lastName: "Moya",
                email: "ot@gmail.com",
                gradeId: gradeData[0].id
            });
            assert.equal(true, learner);

            const learners = await learnersImpl.getLearners();
            assert.equal(1, learners.length);

            // create a school
            await schoolsImpl.createSchools("Cape Town High", "Cape Town");
            let school = await schoolsImpl.getSchools();
            let results = await learnersImpl.linkLearnerToSchool(learners[0].id as number, school[0].id as number);
            assert.equal(true, results);

            // create a new school
            await schoolsImpl.createSchools("Zola Business High", "Bhongweni");
            school = await schoolsImpl.getSchools();
            const linkedLearner = await learnersImpl.linkLearnerToNewSchool(learners[0].id as number, school[1].id as number);
            assert.equal(true, linkedLearner);

            // Test for the previous school
            results = await learnersImpl.linkLearnerToSchool(learners[0].id as number, school[0].id as number);
            assert.equal(false, results);
        });

        it("should find a learner's current school", async () => {
            // create learner grade
            const grade = await gradesImpl.createGrade("Grade-6");
            assert.equal(true, grade);

            const gradeData = await gradesImpl.getGrades();
            assert.equal("Grade-6", gradeData[0].name);

            // create learner & link learner to grade
            const learner = await learnersImpl.createLearner({
                firstName: "Landon",
                lastName: "Tom",
                email: "landa@gmail.com",
                gradeId: gradeData[0].id
            });
            assert.equal(true, learner);

            const learners = await learnersImpl.getLearners();
            assert.equal(1, learners.length);

            // create a school
            await schoolsImpl.createSchools("Cape Town High", "Cape Town");
            let school = await schoolsImpl.getSchools();
            let results = await learnersImpl.linkLearnerToSchool(learners[0].id as number, school[0].id as number);
            assert.equal(true, results);

            // create a new school
            await schoolsImpl.createSchools("Zola Business High", "Bhongweni");
            school = await schoolsImpl.getSchools();

            const linkedLearner = await learnersImpl.linkLearnerToNewSchool(learners[0].id as number, school[1].id as number);
            assert.equal(true, linkedLearner);
            // Test for the previous school
            results = await learnersImpl.linkLearnerToSchool(learners[0].id as number, school[0].id as number);
            assert.equal(false, results);
            
            const learnersCurrentSchool = await learnersImpl.getLearnersCurrentSchool(learners[0].id as number);
            assert.deepEqual({ id: school[1].id, name: 'Zola Business High' }, learnersCurrentSchool);
        });

        it("should find all the schools for a learner", async () => {
            // create learner grade
            const grade = await gradesImpl.createGrade("Grade-11");
            assert.equal(true, grade);

            const gradeData = await gradesImpl.getGrades();
            assert.equal("Grade-11", gradeData[0].name);

            // create learner & link learner to grade
            const learner = await learnersImpl.createLearner({
                firstName: "Ace",
                lastName: "Tom",
                email: "ace@gmail.com",
                gradeId: gradeData[0].id
            });
            assert.equal(true, learner);

            const learners = await learnersImpl.getLearners();
            assert.equal(1, learners.length);

            // create a school
            await schoolsImpl.createSchools("Cape Town High", "Cape Town");
            let school = await schoolsImpl.getSchools();
            let results = await learnersImpl.linkLearnerToSchool(learners[0].id as number, school[0].id as number);
            assert.equal(true, results);

            // create a new school
            await schoolsImpl.createSchools("Zola Business High", "Bhongweni");
            school = await schoolsImpl.getSchools();
            const linkedLearner = await learnersImpl.linkLearnerToNewSchool(learners[0].id as number, school[1].id as number);

            assert.equal(true, linkedLearner);
            // Test for the previous school
            results = await learnersImpl.linkLearnerToSchool(learners[0].id as number, school[0].id as number);
            assert.equal(false, results);

            const allPastSchools = await learnersImpl.getPastLearnerSchools(learners[0].id as number);
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
            await schoolSystem.createATeacher({
                firstName: "Sive",
                lastName: "Philani",
                email: "sive@gmail.com"
            });
            await schoolSystem.createATeacher({
                firstName: "Nathi",
                lastName: "Philani",
                email: "nathi@gmail.com"
            });
            await schoolSystem.createSchools("Harry Gwala", "Site B");

            let schools = await schoolSystem.getSchools();
            let teachers = await schoolSystem.getTeachers();

            assert.equal(2, teachers.length);
            assert.equal(1, schools.length);

            let results = await schoolSystem.linkTeacherToSchool(teachers[0].id as number, schools[0].id as number);
            assert.equal(true, results);

            await schoolSystem.createATeacher({
                firstName: "Gcogco",
                lastName: "Tim",
                email: "tim@gmail.com"
            });
            await schoolSystem.createSchools("Bellevue", "Blue Downs");

            teachers = await schoolSystem.getTeachers();
            schools = await schoolSystem.getSchools();

            assert.equal(3, teachers.length);
            assert.equal(2, schools.length);

            results = await schoolSystem.linkTeacherToSchool(teachers[2].id as number, schools[1].id as number);
            assert.equal(true, results);
        });
    });

    afterEach(async () => {
        await dbTest.query("truncate table school restart identity cascade");
        await dbTest.query("truncate table learner_school restart identity cascade");
        await dbTest.query("truncate table teacher_school restart identity cascade");
        await dbTest.query("truncate table teacher restart identity cascade");
        await dbTest.query("truncate table learner restart identity cascade");
        await dbTest.query("truncate table grade restart identity cascade");
        await dbTest.query("truncate table subject restart identity cascade");
        await dbTest.query("truncate table teacher_subject restart identity cascade");
    });

    after(() => {
        dbTest.$pool.end;
    });
});