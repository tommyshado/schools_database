import pgPromise from "pg-promise";
import IGrades, { IGrade } from "./IGrades";

export default class GradesImpl implements IGrades {
    constructor(private db: pgPromise.IDatabase<any>) {};

    async createGrade(the_name: string): Promise<boolean> {
        try {
            if (!the_name) return false;
            const query = "select * from create_grade($1)";
            const results = await this.db.oneOrNone(query, [the_name]);
            return results.create_grade;
        } catch (error) {
            console.error("An error occurred while creating a grade.", error);
            throw error;
        }
    };
    async getGrades(): Promise<IGrade[]> {
        try {
            const query = "select * from find_grades()";
            const results = await this.db.manyOrNone(query);
            return results;
        } catch (error) {
            console.error("An error occurred while fetching grades.", error);
            throw error;
        }
    };
}