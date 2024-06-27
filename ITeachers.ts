import { IPerson } from "./IPerson";

export interface ITeachers {
    createATeacher(person: IPerson) : Promise<boolean>;
    getTeachers() : Promise<IPerson[]>;
    linkTeacherToSchool(teacherId: number, schoolId: number) : Promise<boolean>;
    linkTeacherToSubject(teacherId: number, subjectId: number): Promise<boolean>;
}