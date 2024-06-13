import 'dotenv/config';
import pgPromise from 'pg-promise';

const pgp = pgPromise();
// *************************** Configuration for tests ************************************** //
const configTest = {
    connectionString: process.env.DB_URL as string,
};
const dbTest = pgp(configTest);
// ************************** Configuration for Application ********************************* //
const configApp = {
    connectionString: process.env.DB_URL_APP as string,
}
const dbApp = pgp(configApp);

export { dbTest, dbApp };