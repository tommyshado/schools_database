import { DbTeacherInt } from "./DbTeachersInt";
import { Person } from "./PersonInt";
import pgPromise from "pg-promise";

export default class DbTeachers implements DbTeacherInt {
    constructor(private db: pgPromise.IDatabase<any>) {};

    async createATeacher(person: Person): Promise<boolean> {
        try {
            const query = "select * from add_teacher($1, $2, $3)";
            const data = [
                person.firstName,
                person.lastName,
                person.email
            ];
            const results = await this.db.oneOrNone(query, data);
            return results.add_teacher;
        } catch (error) {
            console.error("An error occurred while creating a teacher", error);
            throw error;
        };
    };
    async getTeachers(): Promise<Person[]> {
        try {
            const query = "select * from findTeachers()";
            const results = await this.db.manyOrNone(query);
            return results;
        } catch (error) {
            console.error("An error occurred while fetching teachers", error);
            throw error;
        };
    };
    async linkTeacherToSchool(teacherId: number, schoolId: number): Promise<boolean> {
        try {
            const query = "select * from linkTeacherToSchool($1, $2)";
            const results = await this.db.oneOrNone(query, [teacherId, schoolId]);
            return results.linkteachertoschool;
        } catch (error) {
            console.error("An error occurred while linking a teacher to a school.", error);
            throw error;
        };
    };
}