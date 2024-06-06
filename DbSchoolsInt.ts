export interface SchoolsTypeInt {
    id: number;
    name: string;
    region?: string;
    learners_count?: number;
    teachers_count?: number;
}
export interface DbSchoolsInt {
    createSchools(name: string, region: string) : Promise<boolean>;
    getSchools() : Promise<SchoolsTypeInt[]>;
};