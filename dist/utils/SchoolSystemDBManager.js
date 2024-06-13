"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schoolApp = exports.schoolSystem = exports.gradesImpl = exports.learnersImpl = exports.teachersImpl = exports.schoolsImpl = void 0;
const SchoolsImpl_1 = __importDefault(require("../SchoolsImpl"));
const TeacherImpl_1 = __importDefault(require("../TeacherImpl"));
const LearnersImpl_1 = __importDefault(require("../LearnersImpl"));
const GradesImpl_1 = __importDefault(require("../GradesImpl"));
const SchoolSystem_1 = __importDefault(require("../SchoolSystem"));
const Pool_1 = require("../model/Pool");
// ********************************* Implementations for Tests ********************************************** //
const schoolsImpl = new SchoolsImpl_1.default(Pool_1.dbTest);
exports.schoolsImpl = schoolsImpl;
const teachersImpl = new TeacherImpl_1.default(Pool_1.dbTest);
exports.teachersImpl = teachersImpl;
const learnersImpl = new LearnersImpl_1.default(Pool_1.dbTest);
exports.learnersImpl = learnersImpl;
const gradesImpl = new GradesImpl_1.default(Pool_1.dbTest);
exports.gradesImpl = gradesImpl;
const schoolSystem = new SchoolSystem_1.default(schoolsImpl, teachersImpl, learnersImpl, gradesImpl);
exports.schoolSystem = schoolSystem;
// ********************************* Implementations for App *********************************************** //
const SchoolsImplApp = new SchoolsImpl_1.default(Pool_1.dbApp);
const TeachersImplApp = new TeacherImpl_1.default(Pool_1.dbApp);
const LearnersImplApp = new LearnersImpl_1.default(Pool_1.dbApp);
const GradesImplApp = new GradesImpl_1.default(Pool_1.dbApp);
const schoolApp = new SchoolSystem_1.default(SchoolsImplApp, TeachersImplApp, LearnersImplApp, GradesImplApp);
exports.schoolApp = schoolApp;
