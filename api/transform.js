import { guardRequest } from '../../lib/apiGuard.js';
import { toCase } from '../../lib/processors.js';

const ALLOWED_MODES = ['sentence', 'title', 'upper', 'lower', 'camel', 'pascal', 'snake', 'kebab'];

export default function handler(req, res) {
  if (!guardRequest(req, res)) return;

  const { text, mode = 'title' } = req.body || {};
  if (typeof text !== 'string') {
    return res.status(400).json({ error: 'Field "text" is required and must be a string.' });
  }
  if (!ALLOWED_MODES.includes(mode)) {
    return res.status(400).json({ error: `Invalid mode. Allowed modes: ${ALLOWED_MODES.join(', ')}` });
  }

  return res.status(200).json({ text: toCase(text, mode), mode });
}