import bcrypt from 'bcrypt';

export const checkIfSlsu = (username) => {
    const seperate = username.split('@')[1];
    return seperate === 'slsu.edu.ph';
}

export const checkStudentId = (studentId) => {
    if(studentId.length !== 9) {
        return {
            grade: null,
            boolean: false
        };
    }
    const grade = studentId.split('')[1];
    
    switch(grade){
        case '5': return {grade: '1', boolean: true, id: studentId };
        case '4': return {grade: '2', boolean: true, id: studentId };
        case '3': return {grade: '3', boolean: true, id: studentId };
        case '2': return {grade: '4', boolean: true, id: studentId };
        default: return { grade: null, isValid: false, id: studentId};
    }
}

export const hashPass = async (password) => {
    return bcrypt.hash(password, 10);
}

export const encryption = async (hashPassword, origPassword) => {
    return bcrypt.compare(origPassword, hashPassword);
}