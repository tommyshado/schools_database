import assert from 'assert';
import DbSchools from '../DbSchools';
import pool from '../model/Pool';
import DbTeachers from '../DbTeachers';
import SchoolSystem from '../SchoolSystem';

const schoolsDb = new DbSchools(pool);
const teachersDb = new DbTeachers(pool);
const schoolSystem = new SchoolSystem(schoolsDb, teachersDb);

describe("Schools Database", function() {
    this.timeout(2000);
    beforeEach(async () => {
        await pool.query("truncate table school cascade");
        await pool.query("truncate table teacher cascade");
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

    describe("SchoolSystem Class", function() {
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

            schools = await schoolsDb.getSchools();
            teachers = await teachersDb.getTeachers();
            results = await teachersDb.linkTeacherToSchool(teachers[2].id as number, schools[1].id as number);
            assert.equal(true, results);
        });
    });

    after(() => {
        pool.$pool.end;
    });
});