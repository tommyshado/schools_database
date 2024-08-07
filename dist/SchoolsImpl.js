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
class SchoolsImpl {
    constructor(db) {
        this.db = db;
    }
    createSchools(name, region) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(name && region))
                    return false;
                const query = "select * from create_schools($1, $2)";
                const results = yield this.db.oneOrNone(query, [name, region]);
                return results.create_schools;
            }
            catch (error) {
                console.error("An error occurred while creating a school", error);
                throw error;
            }
        });
    }
    getSchools() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = "select * from find_schools()";
                const results = yield this.db.manyOrNone(query);
                return results;
            }
            catch (error) {
                console.error("An error occurred while fetching schools", error);
                throw error;
            }
        });
    }
    getSchool() {
        return __awaiter(this, arguments, void 0, function* (name = null, region = null) {
            try {
                const query = "select * from find_school($1, $2)";
                const results = yield this.db.manyOrNone(query, [name, region]);
                return results;
            }
            catch (error) {
                console.error("An error occurred while fetching a school", error);
                throw error;
            }
        });
    }
}
exports.default = SchoolsImpl;
