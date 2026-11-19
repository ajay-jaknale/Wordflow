import { guardRequest } from '../lib/apiGuard.js';
import { diffText } from '../lib/processors.js';

export default function handler(req, res) {
  if (!guardRequest(req, res)) return;

  const { original, revised } = req.body || {};
  if (typeof original !== 'string' || typeof revised !== 'string') {
    return res.status(400).json({ error: 'Both "original" and "revised" fields must be strings.' });
  }

  const lines = diffText(original, revised);
  const summary = {
    added: lines.filter((l) => l.status === 'added').length,
    removed: lines.filter((l) => l.status === 'removed').length,
    changed: lines.filter((l) => l.status === 'changed').length,
    unchanged: lines.filter((l) => l.status === 'same').length,
  };

  return res.status(200).json({ summary, lines });
}