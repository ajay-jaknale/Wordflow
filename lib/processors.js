import TurndownService from 'turndown';

export function countStats(value = '') {
  const words = value.trim() ? value.trim().split(/\s+/u).length : 0;
  const sentences = (value.match(/[.!?]+(?=\s|$)/g) || []).length;
  const paragraphs = value.trim() ? value.split(/\n\s*\n/).filter((p) => p.trim()).length : 0;
  return {
    words,
    chars: value.length,
    noSpaces: value.replace(/\s/g, '').length,
    sentences,
    paragraphs,
    readingTime: {
      slowMinutes: words === 0 ? 0 : Math.ceil(words / 150),
      averageMinutes: words === 0 ? 0 : Math.ceil(words / 200),
      fastMinutes: words === 0 ? 0 : Math.ceil(words / 250),
    },
  };
}

export function cleanText(text = '', opts = {}) {
  let result = text;
  if (opts.trimLines) result = result.split('\n').map((l) => l.trim()).join('\n');
  if (opts.removeEmpty) result = result.split('\n').filter((l) => l.trim()).join('\n');
  if (opts.collapseSpaces) result = result.replace(/[ \t]{2,}/g, ' ');
  if (opts.collapseBlank) result = result.replace(/\n{3,}/g, '\n\n');
  if (opts.smartQuotes) result = result.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
  if (opts.removeTrailing) result = result.split('\n').map((l) => l.replace(/[ \t]+$/, '')).join('\n');
  if (opts.lowercase) result = result.toLowerCase();
  if (opts.uppercase) result = result.toUpperCase();
  return result;
}

export function repairLineBreaks(text = '') {
  return text
    .replace(/-\s*\n\s*/g, '')
    .replace(/([^\n])\n([^\n])/g, '$1 $2')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n');
}

export function removeDuplicateLines(text = '', { caseSensitive = false } = {}) {
  const lines = text.split(/\r?\n/);
  const seen = new Set();
  const unique = [];
  let removedCount = 0;

  for (const line of lines) {
    const key = caseSensitive ? line : line.toLocaleLowerCase();
    if (seen.has(key)) {
      removedCount++;
      continue;
    }
    seen.add(key);
    unique.push(line);
  }

  return { text: unique.join('\n'), removedCount, totalLines: lines.length, uniqueLines: unique.length };
}

export function toCase(text = '', mode = 'title') {
  const words = text.toLowerCase();
  if (mode === 'lower') return text.toLowerCase();
  if (mode === 'upper') return text.toUpperCase();
  if (mode === 'title') return words.replace(/\b([a-z])/g, (s) => s.toUpperCase());
  if (mode === 'sentence') return words.replace(/(^\s*[a-z]|[.!?]\s+[a-z])/g, (s) => s.toUpperCase());
  if (mode === 'camel') return words.replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()).replace(/^[A-Z]/, (c) => c.toLowerCase());
  if (mode === 'pascal') return words.replace(/(^|[^a-zA-Z0-9]+)([a-zA-Z0-9])/g, (_, __, c) => c.toUpperCase());
  if (mode === 'snake') return words.trim().replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_|_$/g, '');
  if (mode === 'kebab') return words.trim().replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '');
  return text;
}

export function diffText(original = '', revised = '') {
  const a = original.split('\n');
  const b = revised.split('\n');
  const max = Math.max(a.length, b.length);
  const rows = [];

  for (let i = 0; i < max; i++) {
    const left = a[i];
    const right = b[i];
    let status = 'same';
    if (left === undefined) status = 'added';
    else if (right === undefined) status = 'removed';
    else if (left !== right) status = 'changed';
    rows.push({ line: i + 1, status, original: left ?? null, revised: right ?? null });
  }

  return rows;
}

export function convertHtmlToMarkdown(html = '', opts = {}) {
  if (!html.trim()) return '';
  const service = new TurndownService({
    headingStyle: opts.headingStyle || 'atx',
    bulletListMarker: opts.bulletListMarker || '-',
    codeBlockStyle: opts.codeBlockStyle || 'fenced',
    fence: '```',
    emDelimiter: '*',
    strongDelimiter: '**',
  });
  if (opts.stripScriptsAndStyles !== false) {
    service.remove(['script', 'style', 'noscript', 'iframe']);
  }
  return service.turndown(html).trim();
}