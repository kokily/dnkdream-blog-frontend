import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import PageTemplate from '../components/common/PageTemplate';
import AllPosts from '../components/posts/AllPosts';
import { listPostsAPI } from '../libs/api/posts';
import useAllPosts from '../libs/hooks/posts/useAllPosts';

const IndexPage: NextPage = () => {
  const { posts, onReadPost, onTagPost } = useAllPosts();
  const { data, isLoading, error } = useQuery('ssrPosts', () =>
    listPostsAPI({})
  );
  const tags = data?.map((post) => {
    return post.tags.join();
  });
  const description = data?.map((post) => {
    return post.title;
  });

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>error</div>;

  return (
    <>
      <Head>
        <link rel="canonical" href="https://dnkdream.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="D&K Dreams Blog" />
        <meta property="og:url" content="https://dnkdream.com" />
        <meta property="og:description" content="비개발자의 개발 블로그" />
        <meta
          property="og:image"
          content="https://image.dnkdream.com/logo512.png"
        />
        <meta name="keywords" content={tags?.toString()} />
        <meta name="description" content={description?.toString()} />
        <title>어서오세요 - D&K Dreams Blog</title>
      </Head>
      <PageTemplate next={posts.length > 1 ? posts[1] : undefined} right>
        <AllPosts posts={posts} onReadPost={onReadPost} onTagPost={onTagPost} />
      </PageTemplate>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('ssrPosts', () => listPostsAPI({}), {
    staleTime: 1000,
  });

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default IndexPage;
