import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import PageTemplate from '../../components/common/PageTemplate';
import CategoryPosts from '../../components/posts/CategoryPosts';
import { listPostsAPI } from '../../libs/api/posts';
import useCategoryPosts from '../../libs/hooks/posts/useCategoryPosts';

const CategoryPage: NextPage = () => {
  const router = useRouter();
  const { category: id }: { category?: string } = router.query;
  const { posts, onReadPost, onTagPost, category, setTarget } =
    useCategoryPosts();
  const { data, isLoading, error } = useQuery('ssrCategoryPosts', () =>
    listPostsAPI({ category: id })
  );
  const tags = data?.map((post) => {
    return post.tags.join();
  });
  const description = data?.map((post) => {
    return post.title;
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>error</div>;

  return (
    <>
      <Head>
        <link rel="canonical" href="https://dnkdream.com/category" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="D&K Dreams Blog" />
        <meta
          property="og:url"
          content={`https://dnkdream.com/category/${id}`}
        />
        <meta property="og:description" content={description?.toString()} />
        <meta
          property="og:image"
          content="https://image.dnkdream.com/logo512.png"
        />
        <meta name="keywords" content={tags?.toString()} />
        <meta name="description" content={description?.toString()} />
        <title>{category} 카테고리 - D&K Dreams Blog</title>
      </Head>
      <PageTemplate right={true}>
        <CategoryPosts
          posts={posts}
          onReadPost={onReadPost}
          onTagPost={onTagPost}
          category={category}
          setTarget={setTarget}
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
