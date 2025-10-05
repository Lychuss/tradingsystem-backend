import { pool } from '../database/database.js';

export const checkEmail = (email) => {
    return pool.query(
        'SELECT users.passwords FROM users WHERE users.email = $1', [ email ]
    );
}

export const addAccount = (studentId, firstname, lastname, grade, college, email, passwords) => {
    return pool.query(
        `INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6, $7)`, [studentId, firstname, lastname,
            grade, college, email, passwords]
    );
}

export const getUserId = (email) => {
    return pool.query(
        'SELECT users.student_id FROM users WHERE users.email = $1', [ email ]
    );
}

