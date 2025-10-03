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
        case '5': return {grade: '1', boolean: true, id: studentId }; break;
        case '4': return {grade: '2', boolean: true, id: studentId }; break;
        case '3': return {grade: '3', boolean: true, id: studentId }; break;
        case '2': return {grade: '4', boolean: true, id: studentId }; break;
    }
}

export const hashPass = async (password) => {
    const bcryptPass = await bcrypt.genSalt(10);
    return bcrypt.hash(password, bcryptPass);
}

export const encryption = async (hashPassword, origPassword) => {
    return bcrypt.compare(origPassword, hashPassword);
}