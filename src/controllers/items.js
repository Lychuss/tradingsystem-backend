import express from 'express';
import { getAllPost } from '../repository/itemsRepository.js';
import { authenticated } from '../middlewares/authentication.js';

const itemsRouter = express.Router();

itemsRouter .get('/yes4trade/getbooks',authenticated , async (req, res) => {
    const data = await getAllPost();
    const books  = data.rows;
    return res.status(200).json(books);
});

export default itemsRouter;
