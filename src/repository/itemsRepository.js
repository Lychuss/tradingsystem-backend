import { pool } from "../database/database.js";

export async function getAllPost(){
    return await pool.query(
        `SELECT * FROM trading_products`
    );
}

export async function getProducts(id){
    return await pool.query(
        `SELECT * FROM trading_products 
         JOIN types ON trading_products.type = types.type_id
         JOIN programs ON trading_products.program = programs.program_id
         JOIN methods ON trading_products.methods = methods.method_id
         WHERE product_id = $1`, [id]
    );
}

export async function getAllSells(){
    return await pool.query(
        `SELECT * FROM trading_products WHERE methods = 2`
    )
}

export async function getAllTrades(){
    return await pool.query(
        `SELECT * FROM trading_products WHERE methods = 1`
    )
}

export async function getAllBooks(){
        return await pool.query(
        `SELECT * FROM trading_products WHERE types = 1`
    )
}