import { ITeachers } from "./ITeachers";
import { IPerson } from "./IPerson";
import pgPromise from "pg-promise";

export default class TeacherImpl implements ITeachers {
    constructor(private db: pgPromise.IDatabase<any>) {};

    async createATeacher(person: IPerson): Promise<boolean> {
        try {
            if (Object.keys(person).length !== 3) return false;
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
    async getTeachers(): Promise<IPerson[]> {
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
            if (!(teacherId && schoolId)) return false;
            const query = "select * from link_teacher_to_school($1, $2)";
            const results = await this.db.oneOrNone(query, [teacherId, schoolId]);
            return results.link_teacher_to_school;
        } catch (error) {
            console.error("An error occurred while linking a teacher to a school.", error);
            throw error;
        };
    };
}