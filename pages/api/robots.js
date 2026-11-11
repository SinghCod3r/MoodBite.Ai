/**
 * robots.txt API endpoint
 * Serves robots.txt for search engine crawlers
 */

export default function handler(req, res) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://moodbite.ai';
  
  const robotsTxt = `# MoodBite.AI - robots.txt
# Generated automatically
# Last updated: ${new Date().toISOString().split('T')[0]}

# Allow all crawlers full access to the main content
User-agent: *
Allow: /
Allow: /about
Allow: /mood/

# Disallow internal/private paths
Disallow: /api/
Disallow: /_next/
Disallow: /static/
Disallow: /*.json$
Disallow: /*.xml$
Disallow: /*.webmanifest$
Disallow: /sw.js
Disallow: /manifest.json

# Specific crawler directives
User-agent: Googlebot
Allow: /
Disallow: /api/
Disallow: /_next/

User-agent: Bingbot
Allow: /
Disallow: /api/
Disallow: /_next/

User-agent: Yandex
Allow: /
Disallow: /api/
Disallow: /_next/
Crawl-delay: 10

User-agent: DuckDuckBot
Allow: /
Disallow: /api/
Disallow: /_next/

User-agent: Baiduspider
Allow: /
Disallow: /api/
Disallow: /_next/

User-agent: facebookexternalhit
Allow: /
Disallow: /api/
Disallow: /_next/

User-agent: Twitterbot
Allow: /
Disallow: /api/
Disallow: /_next/

User-agent: LinkedInBot
Allow: /
Disallow: /api/
Disallow: /_next/

User-agent: Slackbot
Allow: /
Disallow: /api/
Disallow: /_next/

User-agent: Discordbot
Allow: /
Disallow: /api/
Disallow: /_next/

User-agent: TelegramBot
Allow: /
Disallow: /api/
Disallow: /_next/

User-agent: WhatsApp
Allow: /
Disallow: /api/
Disallow: /_next/

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Host directive for Yandex
Host: ${baseUrl.replace('https://', '')}

# Crawl-delay for respectful crawling
Crawl-delay: 5

# Security: prevent indexing of sensitive files
Disallow: /.env*
Disallow: /.git/
Disallow: /node_modules/
Disallow: /package*.json
Disallow: /README.md
Disallow: /LICENSE
`;

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
  res.send(robotsTxt);
}