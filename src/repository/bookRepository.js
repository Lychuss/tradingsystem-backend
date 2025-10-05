import { pool } from '../database/database.js';

export async function getBooks() {
    return await pool.query(
        `SELECT * FROM trading_books`
    );
};
