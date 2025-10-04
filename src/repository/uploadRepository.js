import { pool } from '../database/database.js';

export async function postProductTrade(title, requirements, url, methods, student_id, program, type, email, location) {
    return await pool.query(
       `INSERT INTO trading_products (title, requirements, url, methods, student_id, program, type, email, location) 
        VALUES ($1, $2, $3, $4::int, $5, $6::int, $7::int, $8, $9)`,
        [title, requirements, url, methods, student_id, program, type, email, location] 
    );
}

export async function postProductSell(title, url, price, methods, student_id, program, type, email, location) {
    return await pool.query(
       `INSERT INTO trading_products (title, url, price, methods, student_id, program, type, email, location) 
        VALUES ($1, $2, $3, $4::int, $5, $6::int, $7::int, $8, $9)`,
        [title, url, price, methods, student_id, program, type, email, location] 
    );
}
