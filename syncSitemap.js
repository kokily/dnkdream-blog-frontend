const { default: axios } = require('axios');
const fs = require('fs');
const prettier = require('prettier');

const SitemapGeneratedDate = new Date().toISOString();
const BACKEND_DOMAIN = 'https://api.dnkdream.com/api';
const HOME_DOMAIN = 'https://dnkdream.com';
const routes = ['/', '/about'];

const formatting = (target) =>
  prettier.format(target, {
    parser: 'html',
  });

function makeSiteMapItem(url) {
  return `
  <url>
    <loc>${url}</loc>
    <lastmod>${SitemapGeneratedDate}</lastmod>
  </url>
  `;
}

async function makePostSitemap() {
  try {
    const pages = routes.map((page) => HOME_DOMAIN + page);
    const pageSitemap = pages.map((page) => makeSiteMapItem(page)).join('');
    let postsSitemap = '';
    let counta = 0;

    const posts = await axios.get(`${BACKEND_DOMAIN}/posts`);

    if (!posts.data) {
      console.log('Posts 가 존재하지 않습니다');
    }

    postsSitemap = posts.data
      .map((post) => {
        counta += 1;
        return makeSiteMapItem(`${HOME_DOMAIN}/post/${post.id}`);
      })
      .join('');

    console.log(`${counta}개의 포스트 사이트 맵 생성`);

    const generateIndexSitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http:www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      ${pageSitemap}
    </urlset>
  `;

    const generatePostSitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http:www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      ${postsSitemap}
    </urlset>
  `;

    const formattedIndexSitemap = formatting(generateIndexSitemap);
    const formattedPostSitemap = formatting(generatePostSitemap);

    fs.writeFileSync('./public/sitemap.xml', formattedIndexSitemap, 'utf8');
    fs.writeFileSync('./public/post-sitemap.xml', formattedPostSitemap, 'utf8');
  } catch (err) {
    console.log(err);
  }
}

makePostSitemap();
