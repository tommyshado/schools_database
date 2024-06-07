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
class SchoolSystem {
    constructor(schools, teachers, learners, grades) {
        this.schools = schools;
        this.teachers = teachers;
        this.learners = learners;
        this.grades = grades;
    }
    // Schools functionalities
    createSchools(name, region) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.schools.createSchools(name, region);
            return results;
        });
    }
    ;
    getSchools() {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.schools.getSchools();
            return results;
        });
    }
    ;
    // Teachers functionalities
    createATeacher(person) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.teachers.createATeacher(person);
            return results;
        });
    }
    ;
    getTeachers() {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.teachers.getTeachers();
            return results;
        });
    }
    ;
    linkTeacherToSchool(teacherId, schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.teachers.linkTeacherToSchool(teacherId, schoolId);
            return results;
        });
    }
    ;
    // Learners functionalities
    createLearner(person) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.learners.createLearner(person);
            return results;
        });
    }
    ;
    getLearners() {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.learners.getLearners();
            return results;
        });
    }
    ;
    linkLearnerToSchool(learnerId, schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.learners.linkLearnerToSchool(learnerId, schoolId);
            return results;
        });
    }
    ;
    linkLearnerToNewSchool(learnerId, schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.learners.linkLearnerToNewSchool(learnerId, schoolId);
            return results;
        });
    }
    ;
    getPastLearnerSchools(learnerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.learners.getPastLearnerSchools(learnerId);
            return results;
        });
    }
    ;
    getLearnersCurrentSchool(learnerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.learners.getLearnersCurrentSchool(learnerId);
            return results;
        });
    }
    ;
    // Grades functionalities
    createGrade(the_name) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.grades.createGrade(the_name);
            return results;
        });
    }
    ;
    getGrades() {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.grades.getGrades();
            return results;
        });
    }
    ;
}
exports.default = SchoolSystem;
