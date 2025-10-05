import { pool } from '../database/database.js';

export async function getProgramId(program) {
    return await pool.query('SELECT program_id FROM programs WHERE programs = $1', [program]);
}

export async function getTypeId(type) {
    console.log(type);
    return await pool.query('SELECT type_id FROM types WHERE types = $1', [type]);
}

export async function getMethodId(method) {
    return await pool.query('SELECT method_id FROM methods WHERE methods = $1', [method]);
}

export async function getStudentId(email){
    return await pool.query('SELECT users.student_id FROM users WHERE users.email = $1', [email]);
}