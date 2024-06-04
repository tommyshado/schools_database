import { DbSchoolsInt } from "./DbSchoolsInt";
import DbSchools from "./DbSchools";
import { SchoolsTypeInt } from "./DbSchoolsInt";
import { DbTeacherInt } from "./DbTeachersInt";
import DbTeachers from "./DbTeachers";
import { Person } from "./PersonInt";

export default class SchoolSystem implements DbSchoolsInt, DbTeacherInt {
    constructor(private schools: DbSchools, private teachers: DbTeachers) {}

    async createSchools(name: string, region: string): Promise<boolean> {
        const results = await this.schools.createSchools(name, region);
        return results;
    };
    async getSchools(): Promise<SchoolsTypeInt[]> {
        const results = await this.schools.getSchools();
        return results;
    };

    async createATeacher(person: Person): Promise<boolean> {
        const results = await this.teachers.createATeacher(person);
        return results;
    };
    async getTeachers(): Promise<Person[]> {
        const results = await this.teachers.getTeachers();
        return results;
    };
    async linkTeacherToSchool(teacherId: number, schoolId: number): Promise<boolean> {
        const results = await this.teachers.linkTeacherToSchool(teacherId, schoolId);
        return results;
    };
}