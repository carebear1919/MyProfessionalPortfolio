import 'dotenv/config';
import { sendContactEmail, validateContactBody } from '../lib/email.js';

// Best-effort per-instance rate limit (serverless instances are short-lived, so this only slows bursts)
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map();

function tooManyRequests(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (!times.some((t) => now - t < WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

export default async function handler(req, res) {
  // The site calls this endpoint from the same origin, so no CORS headers unless one is configured
  if (process.env.CORS_ORIGIN) {
    res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
  if (tooManyRequests(ip)) {
    return res.status(429).json({ success: false, error: 'Too many messages. Please wait a few minutes or email me directly.' });
  }

  try {
    const body = req.body;

    // Honeypot: real visitors never fill the hidden "website" field. Pretend success so bots move on.
    if (body && typeof body.website === 'string' && body.website.trim() !== '') {
      return res.json({ success: true, sent: true });
    }

    const errors = validateContactBody(body);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const result = await sendContactEmail({
      name: body.name.trim(),
      email: body.email.trim(),
      subject: (body.subject || '').trim(),
      message: body.message.trim(),
    });

    res.json({ success: true, ...result });
  } catch (err) {
    // Log details server-side only; never send SMTP or config messages to the browser
    console.error('[CONTACT ERROR]', err.message, err.stack);
    res.status(500).json({ success: false, error: 'Failed to send message' });
  }
}
