import {getMethodId, getProgramId, getTypeId} from '../repository/selectRepository.js';
import { checkEmail, getUserId } from '../repository/userRepository.js';
import { encryption } from '../utils/help.js'
import { createToken } from '../middlewares/authentication.js';

export async function createPostProduct(methods, program, type){
    const data1 = await getMethodId(methods);
    const data2 = await getProgramId(program);
    const data3 = await getTypeId(type);

    const method_id = data1.rows[0].method_id;
    const program_id = data2.rows[0].program_id;
    const type_id = data3.rows[0].type_id;

    return {method_id, program_id, type_id};
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
