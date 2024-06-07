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
class GradesImpl {
    constructor(db) {
        this.db = db;
    }
    ;
    createGrade(the_name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!the_name)
                    return false;
                const query = "select * from create_grade($1)";
                const results = yield this.db.oneOrNone(query, [the_name]);
                return results.create_grade;
            }
            catch (error) {
                console.error("An error occurred while creating a grade.", error);
                throw error;
            }
        });
    }
    ;
    getGrades() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = "select * from find_grades()";
                const results = yield this.db.manyOrNone(query);
                return results;
            }
            catch (error) {
                console.error("An error occurred while fetching grades.", error);
                throw error;
            }
        });
    }
    ;
}
exports.default = GradesImpl;
