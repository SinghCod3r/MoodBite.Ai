/**
 * sitemap.xml API endpoint
 * Generates dynamic sitemap for search engines with comprehensive coverage
 */

function getBaseUrl(req) {
  const host = req?.headers?.['x-forwarded-host'] || req?.headers?.host;
  if (host) {
    const proto = req?.headers?.['x-forwarded-proto'] || (host.includes('localhost') ? 'http' : 'https');
    return `${proto}://${host}`.replace(/\/$/, '');
  }
  return (process.env.NEXT_PUBLIC_SITE_URL || 'https://moodbite.ai').replace(/\/$/, '');
}

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe).replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

function formatUrl(baseUrl, path) {
  const cleanPath = path === '/' ? '/' : (path.endsWith('/') ? path : `${path}/`);
  return escapeXml(`${baseUrl}${cleanPath}`);
}

const staticPages = [
  { path: '/', changefreq: 'daily', priority: 1.0, lastmod: new Date().toISOString().split('T')[0] },
  { path: '/about/', changefreq: 'weekly', priority: 0.9, lastmod: new Date().toISOString().split('T')[0] },
];

const moodPages = [
  { mood: 'joy' },
  { mood: 'excitement' },
  { mood: 'calm' },
  { mood: 'stress' },
  { mood: 'sadness' },
  { mood: 'anger' },
  { mood: 'fear' },
  { mood: 'boredom' },
  { mood: 'loneliness' },
  { mood: 'neutral' },
];

const featurePages = [
  { path: '/features/voice-input/', changefreq: 'monthly', priority: 0.7 },
  { path: '/features/offline-mode/', changefreq: 'monthly', priority: 0.7 },
  { path: '/features/privacy/', changefreq: 'monthly', priority: 0.7 },
  { path: '/features/dietary-filters/', changefreq: 'monthly', priority: 0.7 },
  { path: '/features/mood-trajectory/', changefreq: 'monthly', priority: 0.7 },
];

function generateSitemap(baseUrl) {
  const today = new Date().toISOString().split('T')[0];
  
  let urls = '';
  
  // Static pages
  staticPages.forEach(page => {
    urls += `  <url>\n`;
    urls += `    <loc>${formatUrl(baseUrl, page.path)}</loc>\n`;
    urls += `    <lastmod>${escapeXml(page.lastmod)}</lastmod>\n`;
    urls += `    <changefreq>${escapeXml(page.changefreq)}</changefreq>\n`;
    urls += `    <priority>${page.priority}</priority>\n`;
    urls += `  </url>\n`;
  });
  
  // Mood-specific pages (Standard XML sitemap format for search engines)
  moodPages.forEach(({ mood }) => {
    urls += `  <url>\n`;
    urls += `    <loc>${formatUrl(baseUrl, `/mood/${mood}/`)}</loc>\n`;
    urls += `    <lastmod>${today}</lastmod>\n`;
    urls += `    <changefreq>weekly</changefreq>\n`;
    urls += `    <priority>0.7</priority>\n`;
    urls += `  </url>\n`;
  });
  
  // Feature pages
  featurePages.forEach(page => {
    urls += `  <url>\n`;
    urls += `    <loc>${formatUrl(baseUrl, page.path)}</loc>\n`;
    urls += `    <lastmod>${today}</lastmod>\n`;
    urls += `    <changefreq>${escapeXml(page.changefreq)}</changefreq>\n`;
    urls += `    <priority>${page.priority}</priority>\n`;
    urls += `  </url>\n`;
  });
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}</urlset>`;
  
  return sitemap;
}

export default function handler(req, res) {
  const baseUrl = getBaseUrl(req);
  const sitemap = generateSitemap(baseUrl);
  
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
  res.send(sitemap);
}
