import express from 'express';
import uploadTradeRouter from "./controllers/upload-trade.js";
import uploadSellRouter from "./controllers/upload-sale.js";
import itemsRouter from "./controllers/items.js";
import loginRouter from './controllers/login.js';
import signupRouter from './controllers/signup.js';
import multer from 'multer';
import cors from 'cors';

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://tradingsystem-frontend.vercel.app" 
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

app.use("/", uploadTradeRouter);
app.use("/", uploadSellRouter);
app.use("/", itemsRouter);
app.use("/", loginRouter);
app.use("/", signupRouter);

app.listen(5000, () => {
    console.log('Server listening to port 5000');
});