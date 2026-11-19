import { guardRequest } from '../lib/apiGuard.js';
import { cleanText, repairLineBreaks, removeDuplicateLines } from '../lib/processors.js';

export default function handler(req, res) {
  if (!guardRequest(req, res)) return;

  const { text, options = {}, fixLineBreaks = false, deduplicate = false, caseSensitive = false } = req.body || {};
  if (typeof text !== 'string') {
    return res.status(400).json({ error: 'Field "text" is required and must be a string.' });
  }

  let output = text;
  if (fixLineBreaks) output = repairLineBreaks(output);
  if (Object.keys(options).length > 0) output = cleanText(output, options);

  if (deduplicate) {
    const deduped = removeDuplicateLines(output, { caseSensitive });
    return res.status(200).json({
      text: deduped.text,
      removedDuplicates: deduped.removedCount,
      uniqueLines: deduped.uniqueLines,
    });
  }

  return res.status(200).json({ text: output });
}