import { ISchools, ISchoolsType } from "./ISchools";
import pgPromise from "pg-promise";

export default class SchoolsImpl implements ISchools {
    constructor(private db: pgPromise.IDatabase<any>) { }
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
    }
    async getSchools(): Promise<ISchoolsType[]> {
        try {
            const query = "select * from find_schools()";
            const results = await this.db.manyOrNone(query);
            return results;
        } catch (error) {
            console.error("An error occurred while fetching schools", error);
            throw error;
        }
    }
    async getSchool(name: string | null, region: string | null): Promise<ISchoolsType[]> {
        try {
            const query = "select * from find_school($1, $2)";
            const results = await this.db.manyOrNone(query, [name, region]);
            return results;
        } catch (error) {
            console.error("An error occurred while fetching a school", error);
            throw error;
        }
    }
}