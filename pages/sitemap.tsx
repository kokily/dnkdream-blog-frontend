import type { NextPage } from 'next';
import PageTemplate from '../components/common/PageTemplate';
import Sitemap from '../components/sitemap/Sitemap';

const SitemapPage: NextPage = () => {
  return (
    <PageTemplate>
      <Sitemap />
    </PageTemplate>
  );
};

export default SitemapPage;
