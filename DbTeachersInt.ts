import { Person } from "./PersonInt";

export interface DbTeacherInt {
    createATeacher(person: Person) : Promise<boolean>;
    getTeachers() : Promise<Person[]>;
    linkTeacherToSchool(teacherId: number, schoolId: number) : Promise<boolean>;
}