import { DbSchoolsInt } from "./DbSchoolsInt";
import DbSchools from "./DbSchools";
import { SchoolsTypeInt } from "./DbSchoolsInt";
import { DbTeacherInt } from "./DbTeachersInt";
import DbTeachers from "./DbTeachers";
import { Person } from "./PersonInt";
import { DbLearnersInt } from "./DbLearnersInt";
import DbLearners from "./DbLearners";
import { DbGradesInt, Grade } from "./DbGradesInt";
import DbGrades from "./DbGrades";

export default class SchoolSystem implements DbSchoolsInt, DbTeacherInt, DbLearnersInt, DbGradesInt {
    constructor(
        private schools: DbSchools,
        private teachers: DbTeachers,
        private learners: DbLearners,
        private grades: DbGrades
    ) {}

    // Schools functionalities
    async createSchools(name: string, region: string): Promise<boolean> {
        const results = await this.schools.createSchools(name, region);
        return results;
    };

    async getSchools(): Promise<SchoolsTypeInt[]> {
        const results = await this.schools.getSchools();
        return results;
    };

    // Teachers functionalities
    async createATeacher(person: Person): Promise<boolean> {
        const results = await this.teachers.createATeacher(person);
        return results;
    };

    async getTeachers(): Promise<Person[]> {
        const results = await this.teachers.getTeachers();
        return results;
    };

    async linkTeacherToSchool(teacherId: number, schoolId: number): Promise<boolean> {
        const results = await this.teachers.linkTeacherToSchool(
            teacherId,
            schoolId
        );
        return results;
    };

    // Learners functionalities
    async createLearner(person: Person): Promise<boolean> {
        const results = await this.learners.createLearner(person);
        return results;
    };

    async getLearners(): Promise<Person[]> {
        const results = await this.learners.getLearners();
        return results;
    };

    async linkLearnerToSchool(learnerId: number, schoolId: number): Promise<boolean> {
        const results = await this.learners.linkLearnerToSchool(learnerId, schoolId);
        return results;
    };

    // Grades functionalities
    async createGrade(the_name: string): Promise<boolean> {
        const results = await this.grades.createGrade(the_name);
        return results;
    };

    async getGrades(): Promise<Grade[]> {
        const results = await this.grades.getGrades();
        return results;
    };
}