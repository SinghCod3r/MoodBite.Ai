/**
 * sitemap.xml API endpoint
 * Generates dynamic sitemap for search engines with comprehensive coverage
 */

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://moodbite.ai';

const staticPages = [
  { path: '/', changefreq: 'daily', priority: 1.0, lastmod: new Date().toISOString().split('T')[0] },
  { path: '/about', changefreq: 'weekly', priority: 0.9, lastmod: new Date().toISOString().split('T')[0] },
];

const moodPages = [
  { mood: 'joy', label: 'Joy & Celebration' },
  { mood: 'excitement', label: 'Excitement & High Energy' },
  { mood: 'calm', label: 'Calm & Grounding' },
  { mood: 'stress', label: 'Stress Relief' },
  { mood: 'sadness', label: 'Comfort & Serotonin' },
  { mood: 'anger', label: 'Sensory Venting' },
  { mood: 'fear', label: 'Soothing Warmth' },
  { mood: 'boredom', label: 'Sensory Awakening' },
  { mood: 'loneliness', label: 'Nourishing Care' },
  { mood: 'neutral', label: 'Balanced Daily Fuel' },
];

const featurePages = [
  { path: '/features/voice-input', changefreq: 'monthly', priority: 0.7 },
  { path: '/features/offline-mode', changefreq: 'monthly', priority: 0.7 },
  { path: '/features/privacy', changefreq: 'monthly', priority: 0.7 },
  { path: '/features/dietary-filters', changefreq: 'monthly', priority: 0.7 },
  { path: '/features/mood-trajectory', changefreq: 'monthly', priority: 0.7 },
];

function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];
  
  let urls = '';
  
  // Static pages
  staticPages.forEach(page => {
    urls += `  <url>\n`;
    urls += `    <loc>${BASE_URL}${page.path}</loc>\n`;
    urls += `    <lastmod>${page.lastmod}</lastmod>\n`;
    urls += `    <changefreq>${page.changefreq}</changefreq>\n`;
    urls += `    <priority>${page.priority}</priority>\n`;
    urls += `  </url>\n`;
  });
  
  // Mood-specific pages
  moodPages.forEach(({ mood, label }) => {
    urls += `  <url>\n`;
    urls += `    <loc>${BASE_URL}/mood/${mood}</loc>\n`;
    urls += `    <lastmod>${today}</lastmod>\n`;
    urls += `    <changefreq>weekly</changefreq>\n`;
    urls += `    <priority>0.7</priority>\n`;
    urls += `    <news:news>\n`;
    urls += `      <news:publication>\n`;
    urls += `        <news:name>MoodBite.AI</news:name>\n`;
    urls += `        <news:language>en</news:language>\n`;
    urls += `      </news:publication>\n`;
    urls += `      <news:publication_date>${today}</news:publication_date>\n`;
    urls += `      <news:title>Food recommendations for ${label}</news:title>\n`;
    urls += `    </news:news>\n`;
    urls += `  </url>\n`;
  });
  
  // Feature pages
  featurePages.forEach(page => {
    urls += `  <url>\n`;
    urls += `    <loc>${BASE_URL}${page.path}</loc>\n`;
    urls += `    <lastmod>${today}</lastmod>\n`;
    urls += `    <changefreq>${page.changefreq}</changefreq>\n`;
    urls += `    <priority>${page.priority}</priority>\n`;
    urls += `  </url>\n`;
  });
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}</urlset>`;
  
  return sitemap;
}

export default function handler(req, res) {
  const sitemap = generateSitemap();
  
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
  res.send(sitemap);
}