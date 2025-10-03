import express from 'express';
import { checkIfSlsu, checkStudentId, hashPass } from '../utils/help.js';
import { checkEmailAvail } from '../services/logics.js';
import { addAccount } from '../repository/userRepository.js';

const signupRouter = express.Router();

signupRouter.post('/yes4trade/auth/signup', async (req, res) => {
  try {
    const { username, studentId, firstname, lastname, password, program } = req.body;

    if (!checkIfSlsu(username)) {
      return res.status(400).json({ message: 'Email must be a valid SLSU email.' });
    }

    const studentCheck = checkStudentId(studentId);
    if (!studentCheck.boolean) {
      return res.status(400).json({ message: 'Invalid student ID.' });
    }

    const emailAvailable = await checkEmailAvail(username);
    if (!emailAvailable) {
      return res.status(409).json({ message: 'You already have an account!' });
    }

    const hashedPassword = await hashPass(password);
    const data = await addAccount(
      studentCheck.id,
      firstname,
      lastname,
      studentCheck.grade,
      program,
      username,
      hashedPassword
    );

    if (data.rowCount === 1) {
      return res.status(200).json({ message: 'You have signed up successfully!' });
    }

    return res.status(500).json({ message: 'Failed to create account. Please try again.' });
    
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default signupRouter;
