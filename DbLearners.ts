import pgPromise from "pg-promise";
import { DbLearnersInt } from "./DbLearnersInt";
import { Person } from "./PersonInt";

export default class DbLearners implements DbLearnersInt {
    constructor(private db: pgPromise.IDatabase<any>) {};

    async createLearner(person: Person): Promise<boolean> {
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
    async getLearners(): Promise<Person[]> {
        try {
            const query = "select * from find_learner()";
            const results = await this.db.manyOrNone(query);
            return results;
        } catch (error) {
            console.error("An error occurred while fetching learners.", error);
            throw error;
        }
    };
};