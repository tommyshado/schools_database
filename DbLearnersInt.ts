import { Person } from "./PersonInt";

export interface DbLearnersInt {
    createLearner(person: Person) : Promise<boolean>;
    getLearners() : Promise<Person[]>;
    linkLearnerToSchool(learnerId: number, schoolId: number) : Promise<boolean>;
};