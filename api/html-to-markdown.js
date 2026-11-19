import { guardRequest } from '../../lib/apiGuard.js';
import { convertHtmlToMarkdown } from '../../lib/processors.js';

export default function handler(req, res) {
  if (!guardRequest(req, res)) return;

  const { html, options } = req.body || {};
  if (typeof html !== 'string' || !html.trim()) {
    return res.status(400).json({ error: 'Field "html" is required and must be a non-empty string.' });
  }

  try {
    const markdown = convertHtmlToMarkdown(html, options || {});
    return res.status(200).json({ markdown });
  } catch (err) {
    return res.status(500).json({ error: 'HTML to Markdown conversion failed.', details: err.message });
  }
}