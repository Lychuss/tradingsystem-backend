import express from 'express';
import { getAllPost } from '../repository/itemsRepository.js';
import { authenticated } from '../middlewares/authentication.js';
import { getProduct, getAllSell, getAllTrade, getAllBook } from '../services/logics.js';

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

    if(product === null){
        return res.status(404).json({ message: 'Cannot get the product! Try Again!'});
    }

    return res.status(200).json(product);

} catch(err) {
        return res.status(500).json({ message: 'Error in the server!'});
    } 
});

itemsRouter.get('/yes4trade/sells/products', authenticated, async (req, res) => {
    try { 
        const data = await getAllSell();
        
        if(data === null){
            return res.status(401).json({message: 'Error not able to show all the sells product!'});
        }

        return res.status(200).json({ data, message: 'Successfully get all the needed products!'});

    } catch(err){
        return res.status(500).json({ message: 'Error in the server!'});
    }
});

itemsRouter.get('/yes4trade/trades/products', authenticated, async (req, res) => {
    try { 
        const data = await getAllTrade();

        if(data === null){
            return res.status(401).json({message: 'Error not able to show all the sells product!'});
        }

        return res.status(200).json({ data, message: 'Successfully get all the needed products!'});

    } catch(err){
        return res.status(500).json({ message: 'Error in the server!'});
    }
});

itemsRouter.get('/yes4trade/books/products', authenticated, async (req, res) => {
    try { 
        const data = await getAllBook();

        if(data === null){
            return res.status(401).json({message: 'Error not able to show all the sells product!'});
        }

        return res.status(200).json({ data, message: 'Successfully get all the needed products!'});

    } catch(err){
        return res.status(500).json({ message: 'Error in the server!'});
    }
});

export default itemsRouter;
