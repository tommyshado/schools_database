import pgPromise from "pg-promise";
import { ILearners } from "./ILearners";
import { IPerson } from "./IPerson";
import { ISchoolsType } from "./ISchools";

export default class LearnersImpl implements ILearners {
    constructor(private db: pgPromise.IDatabase<any>) {};

    async createLearner(person: IPerson): Promise<boolean> {
        try {
            if (Object.keys(person).length !== 4) return false;
            const query = "select * from create_learner($1, $2, $3, $4)";
            const data = [
                person.firstName,
                person.lastName,
                person.email,
                person.gradeId
            ];
            const results = await this.db.oneOrNone(query, data);
            return results.create_learner;
        } catch (error) {
            console.error("An error occurred creating a learner.", error);
            throw error;
        };
    };

    async linkLearnerToSchool(learnerId: number, schoolId: number): Promise<boolean> {
        try {
            if (!(learnerId && schoolId)) return false;
            const query = "select * from link_learner_to_school($1, $2)";
            const results = await this.db.oneOrNone(query, [learnerId, schoolId]);
            return results.link_learner_to_school;
        } catch (error) {
            console.error("An error occurred while linking a learner to a school.", error);
            throw error;
        };
    };

    async getLearners(): Promise<IPerson[]> {
        try {
            const query = "select * from find_learner()";
            const results = await this.db.manyOrNone(query);
            return results;
        } catch (error) {
            console.error("An error occurred while fetching learners.", error);
            throw error;
        }
    };

    async linkLearnerToNewSchool(learnerId: number, schoolId: number): Promise<boolean> {
        try {
            if (!(learnerId && schoolId)) return false;
            const query = "select * from change_learner_school($1, $2)";
            const results = await this.db.oneOrNone(query, [learnerId, schoolId]);
            return results.change_learner_school;
        } catch (error) {
            console.error("An error occurred while linking a learner school to a new school.", error);
            throw error;
        };
    };

    async getPastLearnerSchools(learnerId: number): Promise<ISchoolsType[]> {
        try {
            if (!learnerId) return [];
            const query = "select * from get_schools_for_learner($1)";
            const results = await this.db.manyOrNone(query, [learnerId]);
            return results;
        } catch (error) {
            console.error("An error occurred while fetching all the past schools for a learner.", error);
            throw error;
        };
    };

    async getLearnersCurrentSchool(learnerId: number): Promise<ISchoolsType> {
        try {
            if (!learnerId) return {
                id: 0,
                name: "",
            };
            const query = "select * from get_learners_current_school($1)";
            const results = await this.db.oneOrNone(query, [learnerId]);
            return results;
        } catch (error) {
            console.error("An error occurred while fetching a learner's current school.", error);
            throw error;
        };
    };
};