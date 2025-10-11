import express from 'express';
import { authenticated } from '../middlewares/authentication.js';
import nodemailer from 'nodemailer';
import { configDotenv } from 'dotenv';
configDotenv();

const emailRouter = express.Router();

emailRouter.post('/yes4trade/products/send-email', authenticated, async (req, res) => {
    const { to, from, message} = req.body;

      try {
        const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,                   
        secure: true,                
        auth: {
            user: process.env.SMTP_USER, 
            pass: process.env.SMTP_PASSWORD,      
        },
    });

    const mailOptions = {
      from: `"YES4TRADE" raphaelsanjuan6@gmail.com`,
      to: to,
      subject: "YES4TRADE",
      text: message,
      replyTo: from, 
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

export default emailRouter;