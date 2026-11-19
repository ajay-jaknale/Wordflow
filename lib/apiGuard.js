export function guardRequest(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-RapidAPI-Key, X-RapidAPI-Host, X-RapidAPI-Proxy-Secret');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return false;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed. Use POST.' });
    return false;
  }

  // Enforced once RAPIDAPI_PROXY_SECRET is set in Vercel Environment Variables
  const proxySecret = process.env.RAPIDAPI_PROXY_SECRET;
  if (proxySecret && req.headers['x-rapidapi-proxy-secret'] !== proxySecret) {
    res.status(401).json({ error: 'Unauthorized request.' });
    return false;
  }

  return true;
}