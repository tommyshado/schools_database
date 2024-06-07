import { IPerson } from "./IPerson";
import { ISchoolsType } from "./ISchools";

export interface ILearners {
    createLearner(person: IPerson) : Promise<boolean>;
    getLearners() : Promise<IPerson[]>;
    linkLearnerToSchool(learnerId: number, schoolId: number) : Promise<boolean>;
    linkLearnerToNewSchool(learnerId: number, schoolId: number) : Promise<boolean>;
    getPastLearnerSchools(learnerId: number) : Promise<ISchoolsType[]>;
    getLearnersCurrentSchool(learnerId: number) : Promise<ISchoolsType>
};