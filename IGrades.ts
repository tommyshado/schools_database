export interface IGrade {
    id: number;
    name: string;
};
export default interface IGrades {
    createGrade(the_name: string) : Promise<boolean>;
    getGrades() : Promise<IGrade[]>;
};