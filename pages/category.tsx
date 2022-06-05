import type { NextPage } from 'next';
import PageTemplate from '../components/common/PageTemplate';
import CategoryPosts from '../components/posts/CategoryPosts';

const CategoryPage: NextPage = () => {
  return (
    <PageTemplate>
      <CategoryPosts />
    </PageTemplate>
  );
};

export default CategoryPage;
