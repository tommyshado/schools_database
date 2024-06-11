import SchoolsImpl from "../SchoolsImpl";
import TeacherImpl from "../TeacherImpl";
import LearnersImpl from "../LearnersImpl";
import GradesImpl from "../GradesImpl";
import SchoolSystem from "../SchoolSystem";
import pool from "../model/Pool";

const schoolsImpl = new SchoolsImpl(pool);
const teachersImpl = new TeacherImpl(pool);
const learnersImpl = new LearnersImpl(pool);
const gradesImpl = new GradesImpl(pool);
const schoolSystem = new SchoolSystem(schoolsImpl, teachersImpl, learnersImpl, gradesImpl);

export {
    schoolsImpl,
    teachersImpl,
    learnersImpl,
    gradesImpl,
    schoolSystem
};