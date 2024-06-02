import { DbSchoolsInt } from "./DbSchoolsInt";
import DbSchools from "./DbSchools";
import { SchoolsTypeInt } from "./DbSchoolsInt";

export default class SchoolSystem implements DbSchoolsInt {
    constructor(private schools: DbSchools) {}

    async createSchools(name: string, region: string): Promise<boolean> {
        const results = this.schools.createSchools(name, region);
        return results;
    };
    async getSchools(): Promise<SchoolsTypeInt[]> {
        const results = this.schools.getSchools();
        return results;
    };
}