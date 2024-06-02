import { DbSchoolsInt, SchoolsTypeInt } from "./DbSchoolsInt";
import pgPromise from "pg-promise";

export default class DbSchools implements DbSchoolsInt {
    constructor (private db: pgPromise.IDatabase<any>) {};

    async createSchools(name: string, region: string): Promise<boolean> {
        const query = "select * from create_schools($1, $2)";
        const results = await this.db.oneOrNone(query, [name, region]);    
        return results.create_schools;
    };
    async getSchools(): Promise<SchoolsTypeInt[]> {
        const query = "select * from find_schools()";
        const results = await this.db.manyOrNone(query);
        return results;
    };
};