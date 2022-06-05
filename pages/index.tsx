import type { GetServerSideProps, NextPage } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import PageTemplate from '../components/common/PageTemplate';
import AllPosts from '../components/posts/AllPosts';
import { listPostsAPI } from '../libs/api/posts';

const IndexPage: NextPage = ({ dehydratedState }: any) => {
  return (
    <PageTemplate>
      <AllPosts />
    </PageTemplate>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery('posts', () => listPostsAPI, {
    staleTime: 1000,
  });

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default IndexPage;
