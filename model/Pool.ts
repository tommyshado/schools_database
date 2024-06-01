import 'dotenv/config';
import pgPromise from 'pg-promise';

const pgp = pgPromise();
const config = {
    connectionString: process.env.DB_URL as string,
};
const pool = pgp(config);

export default pool;