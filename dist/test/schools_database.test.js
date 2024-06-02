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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const DbSchools_1 = __importDefault(require("../DbSchools"));
const Pool_1 = __importDefault(require("../model/Pool"));
const schoolsDb = new DbSchools_1.default(Pool_1.default);
describe("Schools Database", function () {
    this.timeout(2000);
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        yield Pool_1.default.query("truncate table school cascade");
    }));
    describe("DbSchools Database", () => {
        it("should create a school", () => __awaiter(this, void 0, void 0, function* () {
            const createSchool = yield schoolsDb.createSchools("Luhlaza", "Khayelitsha");
            assert_1.default.equal(true, createSchool);
        }));
        it("should create more schools", () => __awaiter(this, void 0, void 0, function* () {
            yield schoolsDb.createSchools("Cape Town High", "Cape Town");
            yield schoolsDb.createSchools("Cape Town High", "Cape Town");
            let schools = yield schoolsDb.getSchools();
            assert_1.default.equal(1, schools.length);
            yield schoolsDb.createSchools("Zonnebloem", "Cape Town");
            yield schoolsDb.createSchools("Wineberg High", "Wineberg");
            // Update the schools variable with the newly added schools
            schools = yield schoolsDb.getSchools();
            assert_1.default.equal(3, schools.length);
        }));
    });
    after(() => {
        Pool_1.default.$pool.end;
    });
});
