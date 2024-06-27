import { ISchools } from "./ISchools";
import SchoolsImpl from "./SchoolsImpl";
import { ISchoolsType } from "./ISchools";
import { ITeachers } from "./ITeachers";
import TeacherImpl from "./TeacherImpl";
import { IPerson } from "./IPerson";
import { ILearners } from "./ILearners";
import LearnersImpl from "./LearnersImpl";
import IGrades, { IGrade } from "./IGrades";
import GradesImpl from "./GradesImpl";

export default class SchoolSystem implements ISchools, ITeachers, ILearners, IGrades {
    constructor(
        private schools: SchoolsImpl,
        private teachers: TeacherImpl,
        private learners: LearnersImpl,
        private grades: GradesImpl
    ) {}

    // Schools functionalities
    async createSchools(name: string, region: string): Promise<boolean> {
        const results = await this.schools.createSchools(name, region);
        return results;
    };

    async getSchools(): Promise<ISchoolsType[]> {
        const results = await this.schools.getSchools();
        return results;
    };

    // Teachers functionalities
    async createATeacher(person: IPerson): Promise<boolean> {
        const results = await this.teachers.createATeacher(person);
        return results;
    };

    async getTeachers(): Promise<IPerson[]> {
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

    async linkTeacherToSubject(teacherId: number, subjectId: number): Promise<boolean> {
        const results = await this.teachers.linkTeacherToSubject(
            teacherId,
            subjectId
        );
        return results;
    };

    // Learners functionalities
    async createLearner(person: IPerson): Promise<boolean> {
        const results = await this.learners.createLearner(person);
        return results;
    };

    async getLearners(): Promise<IPerson[]> {
        const results = await this.learners.getLearners();
        return results;
    };

    async linkLearnerToSchool(learnerId: number, schoolId: number): Promise<boolean> {
        const results = await this.learners.linkLearnerToSchool(learnerId, schoolId);
        return results;
    };

    async linkLearnerToNewSchool(learnerId: number, schoolId: number): Promise<boolean> {
        const results = await this.learners.linkLearnerToNewSchool(learnerId, schoolId);
        return results;
    };

    async getPastLearnerSchools(learnerId: number): Promise<ISchoolsType[]> {
        const results = await this.learners.getPastLearnerSchools(learnerId);
        return results;
    };

    async getLearnersCurrentSchool(learnerId: number): Promise<ISchoolsType> {
        const results = await this.learners.getLearnersCurrentSchool(learnerId);
        return results;
    };

    // Grades functionalities
    async createGrade(the_name: string): Promise<boolean> {
        const results = await this.grades.createGrade(the_name);
        return results;
    };

    async getGrades(): Promise<IGrade[]> {
        const results = await this.grades.getGrades();
        return results;
    };
}