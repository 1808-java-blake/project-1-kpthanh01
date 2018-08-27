import {Pool, Client} from 'pg';

export const connectionPool = new Pool({
    user: process.env[""],
    host: 'localhost',
    database: 'postgres',
    password: process.env[""],
    port: 5432,
    max: 2
})