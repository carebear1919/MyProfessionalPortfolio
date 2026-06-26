import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { sendContactEmail, validateContactBody } from './lib/email.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3002' }));
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  try {
    const errors = validateContactBody(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const { name, email, subject, message } = req.body;
    const result = await sendContactEmail({
      name: name.trim(),
      email: email.trim(),
      subject: (subject || '').trim(),
      message: message.trim(),
    });

    res.json({ success: true, ...result });
  } catch (err) {
    console.error('[CONTACT ERROR]', err);
    res.status(500).json({ success: false, error: 'Failed to send message' });
  }
});

app.listen(PORT, () => {
  console.log(`[SERVER] Contact API running on http://localhost:${PORT}`);
});
