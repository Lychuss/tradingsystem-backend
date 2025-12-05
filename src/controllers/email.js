import express from 'express';
import { authenticated } from '../middlewares/authentication.js';
import fetch from 'node-fetch';
import { configDotenv } from 'dotenv';
configDotenv();

const emailRouter = express.Router();

emailRouter.post('/yes4trade/products/send-email', authenticated, async (req, res) => {
  const { to, from, message } = req.body;

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY
      },
      body: JSON.stringify({
        sender: { name: "YES4TRADE", email: process.env.SMTP_USER },
        to: [{ email: to }],
        subject: "YES4TRADE",
        textContent: message,
        replyTo: { email: from }
      })
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(err);
    }

    res.json({ success: true, message: "Email sent successfully via API!" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

export default emailRouter;
