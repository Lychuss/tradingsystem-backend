import express from 'express';
import multer from 'multer';
import cloudinary from '../utils/cloudinary.js';  
import { postProductTrade } from '../repository/uploadRepository.js';
import { createPostProduct } from '../services/logics.js';
import { authenticated, getEmail } from '../middlewares/authentication.js';

const uploadTradeRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

uploadTradeRouter.post('/yes4trade/upload-trade', authenticated, upload.single('image'), async (req, res) => {
    const { title, methods, email, location, program, type, requirement} = req.body;

    const username = await getEmail(req.headers['authorization'].split(' ')[1]);

    if(!req.file){
        return res.status(400).json({ message: 'Error req file is undefined or empty'});
    }

    const {method_id, program_id, type_id, student_id} = await createPostProduct(methods, program, type, username);

       const stream = cloudinary.uploader.upload_stream({ folder: 'yes4trade' }, 
       async (error, result) => {
        
          if (error) {
             console.error(error);
             return res.status(500).json({ message: "Image upload failed", error });
          }

          try {
            await postProductTrade(title, requirement, result.secure_url, method_id, student_id, program_id, type_id, email, location);
            return res.status(200).json({ message: 'Image uploaded successfully', url: result.secure_url });
          } catch(err){
            console.error(err);
            return res.status(500).json({ message: "Database error: could not save product" });
          }
           
       });
        stream.end(req.file.buffer);

});

export default uploadTradeRouter;