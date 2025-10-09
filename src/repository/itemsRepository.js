import { pool } from "../database/database.js";

export async function getAllPost(){
    return await pool.query(
        `SELECT * FROM trading_products`
    );
}

export async function getProducts(id){
    return await pool.query(
        `SELECT * FROM trading_products WHERE product_id = $1`, [id]
    );
}