import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { dehydrate, QueryClient } from 'react-query';
import PageTemplate from '../../components/common/PageTemplate';
import CategoryPosts from '../../components/posts/CategoryPosts';
import { listPostsAPI } from '../../libs/api/posts';
import useCategoryPosts from '../../libs/hooks/posts/useCategoryPosts';

const CategoryPage: NextPage = () => {
  const { posts, onReadPost, onTagPost, category } = useCategoryPosts();

  return (
    <>
      <Head>
        <title>{category} 카테고리 - D&K Dreams Blog</title>
      </Head>
      <PageTemplate right={true}>
        <CategoryPosts
          posts={posts}
          onReadPost={onReadPost}
          onTagPost={onTagPost}
          category={category}
        />
      </PageTemplate>
    </>
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
