import express from 'express';
import { getAllPost } from '/tradingsystem-backend/src/repository/itemsRepository.js';
import { authenticated } from '../middlewares/authentication.js';

const itemsRouter = express.Router();

itemsRouter .get('/yes4trade/getbooks',authenticated , async (req, res) => {
    const data = await getAllPost();
    const books  = data.rows;
    console.log(books);
    return res.status(200).json(books);
});

export default itemsRouter;
