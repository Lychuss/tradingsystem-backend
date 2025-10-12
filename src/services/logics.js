import {getMethodId, getProgramId, getTypeId, getStudentId} from '../repository/selectRepository.js';
import { checkEmail, getUserId } from '../repository/userRepository.js';
import { encryption } from '../utils/help.js'
import { createToken } from '../middlewares/authentication.js';
import { getProducts, getAllSells } from '../repository/itemsRepository.js';

export async function createPostProduct(methods, program, type, email){
    const data1 = await getMethodId(methods);
    const data2 = await getProgramId(program);
    const data3 = await getTypeId(type);
    const data4 = await getStudentId(email);

    const data = [data1, data2, data3, data4];

    if(data.some(d => !d || d.rowCount === 0)) throw new Error('Error at getting all the value for creating a post product!');

    const method_id = data1.rows[0].method_id;
    const program_id = data2.rows[0].program_id;
    const type_id = data3.rows[0].type_id;
    const student_id = data4.rows[0].student_id;

    console.log(type_id);

    return {method_id, program_id, type_id, student_id};
}

export async function checkEmailAvail(username) {
    const data = await checkEmail(username);

    console.log(data);

    if(data.rowCount !== 0){
        return false;
    }
    
    return true;
}

export async function checkPassword(email, origPassword){
    const data = await checkEmail(email);

    if (!data || data.rowCount === 0) return false;
    const rows = data.rows[0];

    const hashPassword = rows.passwords;

    const encrpyted = await encryption(hashPassword, origPassword);

    if(!encrpyted){
        return false;
    }

    return true;
}

export async function generateToken(email){

    const data = await getUserId(email);

    if (!data || data.rowCount === 0) return false;
    const rows = data.rows[0];

    const studentId = rows.student_id;

    return createToken(studentId, email);
}

export async function getProduct(id){
    const data = await getProducts(id);

    console.log(id);

    if(!data || data.rowCount === 0) return null;

    const product = data.rows[0];

    return product;
}

export async function getStudentsId(email){
    const data = await getStudentId(email);

    if(!data || data.rowCount === 0){
        return null;
    }

    const student_id = data.rows[0].student_id;

    return student_id;
}

export async function getAllSell(){
    const data = await getAllSells();

    if(!data || data.rowCount === 0){
        return null;
    }

    console.log(data);

    return data;
}