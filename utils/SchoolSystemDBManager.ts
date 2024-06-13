import SchoolsImpl from "../SchoolsImpl";
import TeacherImpl from "../TeacherImpl";
import LearnersImpl from "../LearnersImpl";
import GradesImpl from "../GradesImpl";
import SchoolSystem from "../SchoolSystem";
import { dbTest, dbApp } from "../model/Pool";

// ********************************* Implementations for Tests ********************************************** //
const schoolsImpl = new SchoolsImpl(dbTest);
const teachersImpl = new TeacherImpl(dbTest);
const learnersImpl = new LearnersImpl(dbTest);
const gradesImpl = new GradesImpl(dbTest);
const schoolSystem = new SchoolSystem(
    schoolsImpl,
    teachersImpl,
    learnersImpl,
    gradesImpl
);

// ********************************* Implementations for App *********************************************** //
const SchoolsImplApp = new SchoolsImpl(dbApp);
const TeachersImplApp = new TeacherImpl(dbApp);
const LearnersImplApp = new LearnersImpl(dbApp);
const GradesImplApp = new GradesImpl(dbApp);
const schoolApp = new SchoolSystem(
    SchoolsImplApp,
    TeachersImplApp,
    LearnersImplApp,
    GradesImplApp
);

export {
    schoolsImpl,
    teachersImpl,
    learnersImpl,
    gradesImpl,
    schoolSystem,
    schoolApp,
};
