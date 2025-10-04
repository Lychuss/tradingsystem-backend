import { pool } from '../database/database.js';

//should be fix the syntax of database for getting the books only
export async function getBooks() {
    return await pool.query(
        `SELECT * FROM trading_books`
    );
};
