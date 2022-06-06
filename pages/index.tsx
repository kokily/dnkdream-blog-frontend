import type { GetServerSideProps, NextPage } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import PageTemplate from '../components/common/PageTemplate';
import AllPosts from '../components/posts/AllPosts';
import { listPostsAPI } from '../libs/api/posts';

const IndexPage: NextPage = () => {
  return (
    <PageTemplate>
      <AllPosts />
    </PageTemplate>
  );
};

export default IndexPage;
