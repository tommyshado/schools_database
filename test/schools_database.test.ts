import assert from 'assert';
import DbSchools from '../DbSchools';
import pool from '../model/Pool';

const schoolsDb = new DbSchools(pool);

describe("Schools Database", function() {
    this.timeout(2000);
    beforeEach(async () => {
        await pool.query("truncate table school cascade");
    });
    describe("DbSchools Database", () => {
        it("should create a school", async () => {
            const createSchool = await schoolsDb.createSchools("Luhlaza", "Khayelitsha");
            assert.equal(true, createSchool);
        });
        it("should create more schools", async () => {
            await schoolsDb.createSchools("Cape Town High", "Cape Town");
            await schoolsDb.createSchools("Cape Town High", "Cape Town");
            let schools = await schoolsDb.getSchools();
            assert.equal(1, schools.length);

            await schoolsDb.createSchools("Zonnebloem", "Cape Town");
            await schoolsDb.createSchools("Wineberg High", "Wineberg");
            // Update the schools variable with the newly added schools
            schools = await schoolsDb.getSchools();
            assert.equal(3, schools.length);
        });
    });
    after(() => {
        pool.$pool.end;
    });
});