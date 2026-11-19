import { guardRequest } from '../lib/apiGuard.js';
import { countStats } from '../lib/processors.js';

const PLATFORM_LIMITS = {
  x: 280,
  instagram: 2200,
  tiktok: 4000,
  threads: 500,
  bluesky: 300,
  linkedin: 3000,
  facebook: 63206,
  youtube: 5000,
  pinterest: 800,
};

export default function handler(req, res) {
  if (!guardRequest(req, res)) return;

  const { text, platform } = req.body || {};
  if (typeof text !== 'string') {
    return res.status(400).json({ error: 'Field "text" is required and must be a string.' });
  }

  const stats = countStats(text);
  const response = { ...stats };

  if (platform) {
    const key = String(platform).toLowerCase();
    const limit = PLATFORM_LIMITS[key];
    if (!limit) {
      return res.status(400).json({ error: `Unsupported platform. Choose from: ${Object.keys(PLATFORM_LIMITS).join(', ')}` });
    }
    response.platformCheck = {
      platform: key,
      limit,
      used: stats.chars,
      remaining: Math.max(0, limit - stats.chars),
      overBy: Math.max(0, stats.chars - limit),
      withinLimit: stats.chars <= limit,
    };
  }

  return res.status(200).json(response);
}