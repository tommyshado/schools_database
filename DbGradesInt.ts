export interface Grade {
    id: number;
    name: string;
};
export interface DbGradesInt {
    createGrade(the_name: string) : Promise<boolean>;
    getGrades() : Promise<Grade[]>;
};