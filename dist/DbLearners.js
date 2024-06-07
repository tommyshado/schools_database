"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class DbLearners {
    constructor(db) {
        this.db = db;
    }
    ;
    createLearner(person) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (Object.keys(person).length !== 4)
                    return false;
                const query = "select * from create_learner($1, $2, $3, $4)";
                const data = [
                    person.firstName,
                    person.lastName,
                    person.email,
                    person.gradeId
                ];
                const results = yield this.db.oneOrNone(query, data);
                return results.create_learner;
            }
            catch (error) {
                console.error("An error occurred creating a learner.", error);
                throw error;
            }
            ;
        });
    }
    ;
    linkLearnerToSchool(learnerId, schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(learnerId && schoolId))
                    return false;
                const query = "select * from link_learner_to_school($1, $2)";
                const results = yield this.db.oneOrNone(query, [learnerId, schoolId]);
                return results.link_learner_to_school;
            }
            catch (error) {
                console.error("An error occurred while linking a learner to a school.", error);
                throw error;
            }
            ;
        });
    }
    ;
    getLearners() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = "select * from find_learner()";
                const results = yield this.db.manyOrNone(query);
                return results;
            }
            catch (error) {
                console.error("An error occurred while fetching learners.", error);
                throw error;
            }
        });
    }
    ;
    linkLearnerToNewSchool(learnerId, schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(learnerId && schoolId))
                    return false;
                const query = "select * from change_learner_school($1, $2)";
                const results = yield this.db.oneOrNone(query, [learnerId, schoolId]);
                return results.change_learner_school;
            }
            catch (error) {
                console.error("An error occurred while linking a learner school to a new school.", error);
                throw error;
            }
            ;
        });
    }
    ;
    getPastLearnerSchools(learnerId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!learnerId)
                    return [];
                const query = "select * from get_schools_for_learner($1)";
                const results = yield this.db.manyOrNone(query, [learnerId]);
                return results;
            }
            catch (error) {
                console.error("An error occurred while fetching all the past schools for a learner.", error);
                throw error;
            }
            ;
        });
    }
    ;
    getLearnersCurrentSchool(learnerId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!learnerId)
                    return {
                        id: 0,
                        name: "",
                    };
                const query = "select * from get_learners_current_school($1)";
                const results = yield this.db.oneOrNone(query, [learnerId]);
                return results;
            }
            catch (error) {
                console.error("An error occurred while fetching a learner's current school.", error);
                throw error;
            }
            ;
        });
    }
    ;
}
exports.default = DbLearners;
;
