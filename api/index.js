import { sendContactEmail, validateContactBody } from '../lib/email.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

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
}
