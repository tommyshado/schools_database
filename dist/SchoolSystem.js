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
    constructor(schools, teachers) {
        this.schools = schools;
        this.teachers = teachers;
    }
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
}
exports.default = SchoolSystem;
