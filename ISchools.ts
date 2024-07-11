export interface ISchoolsType {
    id: number;
    name: string;
    region?: string;
    learners_count?: number;
    teachers_count?: number;
}
export interface ISchools {
    createSchools(name: string, region: string) : Promise<boolean>;
    getSchools() : Promise<ISchoolsType[]>;
    getSchool(name: string, region: string): Promise<ISchoolsType[]>;
};