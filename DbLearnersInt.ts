import { Person } from "./PersonInt";
import { SchoolsTypeInt } from "./DbSchoolsInt";

export interface DbLearnersInt {
    createLearner(person: Person) : Promise<boolean>;
    getLearners() : Promise<Person[]>;
    linkLearnerToSchool(learnerId: number, schoolId: number) : Promise<boolean>;
    linkLearnerToNewSchool(learnerId: number, schoolId: number) : Promise<boolean>;
    getPastLearnerSchools(learnerId: number) : Promise<SchoolsTypeInt[]>;
    getLearnersCurrentSchool(learnerId: number) : Promise<SchoolsTypeInt>
};