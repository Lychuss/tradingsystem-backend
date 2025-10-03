import jwt from "jsonwebtoken";
import { checkPassword } from "../services/logics.js";
import { checkIfSlsu } from "../utils/help.js";

export const createToken = (student_id, email) => {
    const payLoad = {studentId: student_id, email: email};
    const token = jwt.sign(payLoad, process.env.SECRET_KEY, {expiresIn: '1h'});
    return token;
}

export const getEmail = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        return decoded.email;
    } catch (err) {
        return null;
    }
}

export const authenticated = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    const token = bearerHeader && bearerHeader.split(' ')[1];

    if(!token) return res.status(401).json({message: 'You must have a token!'});

    jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
        if(err) return res.status(401).json({message: 'Invalid or expired token'});
        req.user = decode;
        next();
    });
}

export const registration = async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    if (!checkIfSlsu(username)) {
        return res.status(400).json({ message: 'Invalid email, must be an SLSU email!' });
    }

    try {
        const isValid = await checkPassword(username, password);

        if (!isValid) {
        return res.status(401).json({ message: 'Invalid account!' });
        }

        next();
    } catch (err) {
        return res.status(500).json({ message: 'Server error during authentication.' });
    }
};

