const fs = require('fs');
const prettier = require('prettier');

const SitemapGeneratedDate = new Date().toISOString();
const HOME_DOMAIN = 'https://dnkdream.com';

const formatting = (target) =>
  prettier.format(target, {
    parser: 'html',
  });

const routes = ['/', '/about', '/admin', '/category', '/tag', '/post'];

const pages = routes.map((page) => HOME_DOMAIN + page);

const pageSitemap = pages
  .map(
    (page) => `
  <url>
    <loc>${page}</loc>
    <lastmod>${SitemapGeneratedDate}</lastmod>
  </url>
`
  )
  .join('');

const generateSitemap = `
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http:www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    ${pageSitemap}
  </urlset>
`;

const formattedSitemap = formatting(generateSitemap);

fs.writeFileSync('./public/sitemap.xml', formattedSitemap, 'utf8');
