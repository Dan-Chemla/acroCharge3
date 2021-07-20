import { Pool } from 'pg';
import config from './../config';

const pgconfig = {
    user: "postgres",
    database: "acrocharge",
    password: "mai200916",
    host: "localhost",
    port: 5432,
    max: 20,
    idleTimeoutMillis: 30000
}

const pool = new Pool(pgconfig);


export default pool;