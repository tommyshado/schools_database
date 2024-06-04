import { DbSchoolsInt, SchoolsTypeInt } from "./DbSchoolsInt";
import pgPromise from "pg-promise";

export default class DbSchools implements DbSchoolsInt {
    constructor (private db: pgPromise.IDatabase<any>) {};

    async createSchools(name: string, region: string): Promise<boolean> {
        try {
            if (!(name && region)) return false;
            const query = "select * from create_schools($1, $2)";
            const results = await this.db.oneOrNone(query, [name, region]);    
            return results.create_schools;
        } catch (error) {
            console.error("An error occurred while creating a school", error);
            throw error;
        }
    };
    async getSchools(): Promise<SchoolsTypeInt[]> {
        try {
            const query = "select * from find_schools()";
            const results = await this.db.manyOrNone(query);
            return results;
        } catch (error) {
            console.error("An error occurred while fetching schools", error);
            throw error;
        }
    };
};