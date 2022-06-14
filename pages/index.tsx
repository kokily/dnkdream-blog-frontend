import type { GetServerSideProps, NextPage } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import PageTemplate from '../components/common/PageTemplate';
import AllPosts from '../components/posts/AllPosts';
import { listPostsAPI } from '../libs/api/posts';
import useAllPosts from '../libs/hooks/posts/useAllPosts';

const IndexPage: NextPage = () => {
  const { posts, onReadPost, onTagPost } = useAllPosts();

  return (
    <PageTemplate next={posts.length > 1 ? posts[1] : undefined} right>
      <AllPosts posts={posts} onReadPost={onReadPost} onTagPost={onTagPost} />
    </PageTemplate>
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
