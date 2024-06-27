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
class TeacherImpl {
    constructor(db) {
        this.db = db;
    }
    ;
    createATeacher(person) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (Object.keys(person).length !== 3)
                    return false;
                const query = "select * from add_teacher($1, $2, $3)";
                const data = [
                    person.firstName,
                    person.lastName,
                    person.email
                ];
                const results = yield this.db.oneOrNone(query, data);
                if (results.add_teacher)
                    return results.add_teacher;
                else
                    return false;
            }
            catch (error) {
                console.error("An error occurred while creating a teacher", error);
                throw error;
            }
            ;
        });
    }
    ;
    getTeachers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = "select * from find_teachers()";
                const results = yield this.db.manyOrNone(query);
                return results;
            }
            catch (error) {
                console.error("An error occurred while fetching teachers", error);
                throw error;
            }
            ;
        });
    }
    ;
    linkTeacherToSchool(teacherId, schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(teacherId && schoolId))
                    return false;
                const query = "select * from link_teacher_to_school($1, $2)";
                const results = yield this.db.oneOrNone(query, [teacherId, schoolId]);
                return results.link_teacher_to_school;
            }
            catch (error) {
                console.error("An error occurred while linking a teacher to a school.", error);
                throw error;
            }
            ;
        });
    }
    ;
    linkTeacherToSubject(teacherId, subjectId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(teacherId && subjectId))
                    return false;
                const query = "select * from link_teacher_to_subject($1, $2)";
                const results = yield this.db.oneOrNone(query, [teacherId, subjectId]);
                return results.link_teacher_to_subject;
            }
            catch (error) {
                console.error("An error occurred while linking a teacher to a subject.", error);
                throw error;
            }
            ;
        });
    }
    ;
}
exports.default = TeacherImpl;
