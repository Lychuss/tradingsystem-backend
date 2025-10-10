import express from 'express';
import { getAllPost } from '../repository/itemsRepository.js';
import { authenticated } from '../middlewares/authentication.js';
import { getProduct } from '../services/logics.js';

const itemsRouter = express.Router();

itemsRouter.get('/yes4trade/products',authenticated , async (req, res) => {
    const data = await getAllPost();
    const books  = data.rows;
    return res.status(200).json(books);
});

itemsRouter.get('/yes4trade/products/:productsId', authenticated, async (req, res) => {
    const { productsId } = req.params;

    try {
    const product = await getProduct(productsId);

    console.log(product);

    if(product === null){
        return res.status(404).json({ message: 'Cannot get the product! Try Again!'});
    }

    console.log(product);

    return res.status(200).json(product);

} catch(err) {
        return res.status(500).json({ message: 'Error in the server!'});
    } 
});

export default itemsRouter;
