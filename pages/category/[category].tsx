import type { GetServerSideProps, NextPage } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import PageTemplate from '../../components/common/PageTemplate';
import CategoryPosts from '../../components/posts/CategoryPosts';
import { listPostsAPI } from '../../libs/api/posts';
import useCategoryPosts from '../../libs/hooks/posts/useCategoryPosts';

const CategoryPage: NextPage = () => {
  const { posts, onReadPost, onTagPost, category } = useCategoryPosts();

  return (
    <PageTemplate>
      <CategoryPosts
        posts={posts}
        onReadPost={onReadPost}
        onTagPost={onTagPost}
        category={category}
      />
    </PageTemplate>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { category }: { category?: string } = context.query;
  const queryClient = new QueryClient();

  if (category) {
    await queryClient.prefetchQuery(
      'ssrCategoryPosts',
      () => listPostsAPI({ category }),
      {
        staleTime: 1000,
      }
    );
  }

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default CategoryPage;
