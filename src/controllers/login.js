import express from "express";
import { registration } from "../middlewares/authentication.js";
import { generateToken } from "../services/logics.js";

const loginRouter = express.Router();

loginRouter.get('/yes4trade/auth/login', (req, res) => {
   return res.send('Hello what sup!');
})

loginRouter.post('/yes4trade/auth/login',registration , async (req, res) => {
    const { username } = req.body;
    try {
        const token = await generateToken(username);

        if(token){
            return res.status(200).json({ token: token });
        }
            return res.status(400).json({ message: 'Error account not valid!'});

    } catch(err){
        console.error(err);
        return res.status(401).json({ message: 'Error at creating your token!'});
    }
});

export default loginRouter;